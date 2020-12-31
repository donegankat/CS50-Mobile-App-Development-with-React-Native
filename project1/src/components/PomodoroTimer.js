import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import vibrate from '../utils/vibrate';
import TimerControl from './TimerControl';
import IntervalInput from './IntervalInput';
import { appDefaultWorkTime, appDefaultBreakTime } from '../constants/appDefaultTimes';
import { timerType, timerIntervalType } from '../constants/types';

export default class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: this.calculateMilliseconds(appDefaultWorkTime),
            isWorkMode: true,
            isStarted: true,
            workTimerDefaults: appDefaultWorkTime,
            breakTimerDefaults: appDefaultBreakTime
        }
    }

    /**
     * Given an object that has `minutes` and `seconds` properties, this converts those minutes
     * and seconds into a total number of milliseconds.
     * Used to transform the app and user-provided timer defaults into a millisecond countdown.
     * @param {*} minutesAndSeconds 
     */
    calculateMilliseconds(minutesAndSeconds) {
        // Adding zeroes accounts for any nulls.
        var minutes = minutesAndSeconds.minutes + 0;
        let seconds = minutesAndSeconds.seconds + 0;

        return ((minutes * 60) + seconds) * 1000;
    }

    /**
     * Begins the timer countdown once the component is mounted.
     */
    componentDidMount() {
        this.interval = setInterval(this.countdown, 1000);
    }

    /**
     * Runs every 1 second and decrements the countdown timer by 1 second for as long as the timer
     * isn't paused.
     */
    countdown = () => {
        if (this.state.isStarted) {
            this.setState(prevState => ({
                time: prevState.time - 1000,
                isWorkMode: prevState.isWorkMode,
                isStarted: prevState.isStarted,
                workTimerDefaults: prevState.workTimerDefaults,
                breakTimerDefaults: prevState.breakTimerDefaults
            }));
        }
    }

    /**
     * Renders the component.
     */
    render() {
        // Format the minutes and seconds remaining in the millisecond timer. When there's only a single
        // minute or second digit, this will prepend an extra "0" (e.g. "01:09").
        var minutes = ("00" + Math.floor(this.state.time / 60000)).slice(-2);
        var seconds = ("00" + ((this.state.time % 60000) / 1000).toFixed(0)).slice(-2);

        return (
            <View style={styles.appContainer}>
                <Text style={styles.timerTitle}>{this.state.isWorkMode ? timerType.Work : timerType.Break} Timer</Text>
                <Text style={styles.timer}>{minutes}:{seconds}</Text>
                <TimerControl
                    isTimerRunning={this.state.isStarted}
                    startOrPauseTimer={() => this.startOrPauseTimer()}
                    resetTimer={() => this.resetTimer()}
                    switchTimerMode={() => this.switchMode()}
                />
                <View style={styles.inputGroupContainer}>
                    <Text style={styles.inputGroupHeader}>Change Defaults</Text>
                    <Text style={styles.inputGroupSubHeader}>{timerType.Work} Timer</Text>
                    <View style={styles.inputGroup}>
                        <IntervalInput
                            timeIntervalType={timerIntervalType.Minutes}
                            val={this.state.workTimerDefaults.minutes}
                            onChangeText={text => this.handleDefaultTimerChange(text, timerType.Work, timerIntervalType.Minutes)}
                        />
                        <IntervalInput
                            timeIntervalType={timerIntervalType.Seconds}
                            val={this.state.workTimerDefaults.seconds}
                            onChangeText={text => this.handleDefaultTimerChange(text, timerType.Work, timerIntervalType.Seconds)}
                        />
                    </View>

                    <Text style={styles.inputGroupSubHeader}>{timerType.Break} Timer</Text>
                    <View style={styles.inputGroup}>
                        <IntervalInput
                            timeIntervalType={timerIntervalType.Minutes}
                            val={this.state.breakTimerDefaults.minutes}
                            onChangeText={text => this.handleDefaultTimerChange(text, timerType.Break, timerIntervalType.Minutes)}
                        />
                        <IntervalInput
                            timeIntervalType={timerIntervalType.Seconds}
                            val={this.state.breakTimerDefaults.seconds}
                            onChangeText={text => this.handleDefaultTimerChange(text, timerType.Break, timerIntervalType.Seconds)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    /**
     * Checks the state of the component after it performed an update to see whether the timer
     * has reached 0. If so, this vibrates the device and switches the timer to the other mode.
     */
    componentDidUpdate() {
        // Checking for `< 0` rather than `<= 0` allows the timer to be AT 0 and allows the user
        // to fully change both the minutes and seconds on the current timer mode without causing
        // a mode switch due to the minutes and seconds boxes being temporarily blank.
        if (this.state.time < 0) {
            vibrate();

            this.switchMode();
        }
    }

    /**
     * Resets the timer back to the app or user-provided defaults for the current mode and pauses
     * the timer.
     */
    resetTimer = () => {
        this.setState(prevState => ({
            time: prevState.isWorkMode ? this.calculateMilliseconds(prevState.workTimerDefaults) : this.calculateMilliseconds(prevState.breakTimerDefaults),
            isWorkMode: prevState.isWorkMode,
            isStarted: false,
            workTimerDefaults: prevState.workTimerDefaults,
            breakTimerDefaults: prevState.breakTimerDefaults
        }));
    }

    /**
     * Starts the timer if it's paused or pauses the timer if it's started.
     */
    startOrPauseTimer() {
        this.setState(prevState => ({
            time: prevState.time,
            isWorkMode: prevState.isWorkMode,
            isStarted: !prevState.isStarted, // Keep everything else the same except for this.
            workTimerDefaults: prevState.workTimerDefaults,
            breakTimerDefaults: prevState.breakTimerDefaults
        }));
    }

    /**
     * Switches the timer from work mode to break mode or vice versa.
     */
    switchMode() {
        this.setState(prevState => ({
            time: prevState.isWorkMode ? this.calculateMilliseconds(prevState.breakTimerDefaults) : this.calculateMilliseconds(prevState.workTimerDefaults),
            isWorkMode: !prevState.isWorkMode,
            isStarted: prevState.isStarted,
            workTimerDefaults: prevState.workTimerDefaults,
            breakTimerDefaults: prevState.breakTimerDefaults
        }));
    }

    /**
     * Handles updating the state whenever the user provides a new value for one of the timer defaults (i.e.
     * whenever the user changes the minutes or seconds that a given timer mode should run for).
     * @param {*} newTextVal 
     * @param {*} type 
     * @param {*} intervalType 
     */
    handleDefaultTimerChange(newTextVal, type, intervalType) {
        let newIntVal = newTextVal ? parseInt(newTextVal) : null;

        let newWorkTimerDefaults = this.state.workTimerDefaults;
        let newBreakTimerDefaults = this.state.breakTimerDefaults;
        let newTime = this.state.time;
        let canTimerContinue;

        if (type === timerType.Work) {
            if (intervalType === timerIntervalType.Minutes) {
                newWorkTimerDefaults.minutes = newIntVal;
            } else {
                newWorkTimerDefaults.seconds = newIntVal;
            }

            // Only continue the timer if it was already running and the changes the user made to
            // the defaults don't effect the current timer mode.
            canTimerContinue = this.state.isStarted && !this.state.isWorkMode;

            // Only change the curent timer's time if the changes the user made to the defaults
            // directly impact the current timer mode.
            if (this.state.isWorkMode) newTime = this.calculateMilliseconds(newWorkTimerDefaults);
        } else {
            if (intervalType === timerIntervalType.Minutes) {
                newBreakTimerDefaults.minutes = newIntVal;
            } else {
                newBreakTimerDefaults.seconds = newIntVal;
            }

            // Only continue the timer if it was already running and the changes the user made to
            // the defaults don't effect the current timer mode.
            canTimerContinue = this.state.isStarted && this.state.isWorkMode;

            // Only change the curent timer's time if the changes the user made to the defaults
            // directly impact the current timer mode.
            if (!this.state.isWorkMode) newTime = this.calculateMilliseconds(newBreakTimerDefaults);
        }

        this.setState(prevState => ({
            time: newTime,
            isWorkMode: prevState.isWorkMode,
            isStarted: canTimerContinue,
            workTimerDefaults: newWorkTimerDefaults,
            breakTimerDefaults: newBreakTimerDefaults
        }));
    }

    /**
     * Cleans up the timer.
     */
    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    timerTitle: {
        fontSize: 48
    },
    timer: {
        fontSize: 36
    },
    inputGroupContainer: {
        marginTop: 20,
        padding: 10,
        paddingBottom: 15,
        borderWidth: 6,
        borderStyle: "solid",
        borderColor: "grey"
    },
    inputGroup: {
        flexDirection: "row"
    },
    inputGroupHeader: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    inputGroupSubHeader: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 20
    }
  });