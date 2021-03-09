import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  infoContainer: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})

const MovieDetailHeader = props => (
  <View style={styles.header}>
    <Text style={styles.title}>{props.Title}</Text>
    <View style={styles.infoContainer}>
      <Text>{props.Year}</Text>
      <Text>{props.Rated}</Text>
      <Text>{props.Runtime}</Text>
    </View>
  </View>
)

export default MovieDetailHeader