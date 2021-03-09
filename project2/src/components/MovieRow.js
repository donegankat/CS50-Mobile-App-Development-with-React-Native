import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  row: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
    flex: 1
  },
  poster: {
    width: 32,
    height: 48,
    marginRight: 10
  },
  rowWrapper: {
    flexDirection: "row"
  },
  rowTextWrapper: {
    flexDirection: "column"
  }
})

const MovieRow = props => (
  <TouchableOpacity style={styles.row} onPress={() => props.onSelectMovie(props)}>
    <View style={styles.rowWrapper}>
      <Image
        style={styles.poster}
        source={{uri: props.Poster}}
      />
      <View style={styles.rowTextWrapper}>
        <Text>{props.Title}</Text>
        <Text>{props.Year}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default MovieRow