import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
  },
  icon: {
    marginHorizontal: 3
  }
})

const LabelledTextWithIcon = props => (
  <View style={styles.row}>
    <Text style={styles.label}>
      {props.label}: 
      <MaterialIcons
        style={styles.icon}
        name={props.iconName}
        size="22"
        color={props.iconColor}
      />
      <Text style={styles.text}>{props.text}</Text>
    </Text>
  </View>
)

export default LabelledTextWithIcon