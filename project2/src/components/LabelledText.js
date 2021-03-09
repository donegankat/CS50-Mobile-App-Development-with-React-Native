import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  label: {
    fontWeight: "bold"
  },
  text: {
    fontWeight: "normal"
  }
})

const LabelledText = props => (
  <View style={styles.row}>
    <Text style={styles.label}>
      {props.label}: <Text style={styles.text}>{props.text}</Text>
    </Text>
  </View>
)

export default LabelledText