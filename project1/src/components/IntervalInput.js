import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from "prop-types"

const IntervalInput = props => (
    <View style={styles.row}>
        <Text style={styles.label}>{props.timeIntervalType}:</Text>
        <TextInput value={props.val?.toString()} onChangeText={props.onChangeText} style={styles.input}></TextInput>
    </View>
)

IntervalInput.propTypes = {
    timerIntervalType: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    val: PropTypes.number
}

export default IntervalInput

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
        marginRight: 5
    },
    input: {
        width: 60,
        height: 35,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5
    }
});