import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import MoviesContext from './src/context/MoviesContext'

import MovieAppStackNavigator from './src/navigation/MovieAppStackNavigator'
import { fetchMoviesByTitleSearch } from "./src/utils/movieApi";
import { render } from "react-dom";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <MovieAppStackNavigator></MovieAppStackNavigator>
      </NavigationContainer>

    );
  }
}
      {/* <MoviesContext.Provider value={{ movies: this.state.movies }}>
      </MoviesContext.Provider> */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
});
