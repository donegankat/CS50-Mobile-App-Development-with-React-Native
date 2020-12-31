import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import PropTypes from "prop-types"

propTypes = {
    isTimerRunning: PropTypes.bool.isRequired,
    startOrPauseTimer: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired,
    switchTimerMode: PropTypes.func.isRequired
}

export default props => (
    <View style={styles.controlButtonGroup}>
        <Button onPress={props.startOrPauseTimer} title={props.isTimerRunning ? "Pause" : "Start"}></Button>
        <Button onPress={props.resetTimer} title="Reset"></Button>
        <Button onPress={props.switchTimerMode} title="Switch Mode"></Button>
    </View>
)

const styles = StyleSheet.create({
    controlButtonGroup: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignSelf: "stretch",
      marginTop: 15
    }
});