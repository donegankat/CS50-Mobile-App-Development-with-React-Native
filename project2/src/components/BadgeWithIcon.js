import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  text: {
    fontSize: 12,
    marginRight: 30
  },
  icon: {
    marginHorizontal: 3
  }
})

const BadgeWithIcon = props => (
  props.text ?
    <View style={styles.row}>
      <MaterialIcons
        style={styles.icon}
        name={props.iconName}
        size="22"
        color={props.iconColor}
      />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  :
    <View></View>
)

export default BadgeWithIcon