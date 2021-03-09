import React from "react";
import { StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieSearchScreen from '../screens/MovieSearchScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import MoviePosterScreen from '../screens/MoviePosterScreen';

const Stack = createStackNavigator();

export default class MovieAppStackNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="MovieSearch">
                <Stack.Screen
                    name="MovieSearch"
                    component={MovieSearchScreen}
                    options={({ navigation, route }) => ({
                        title: "Movie Search",
                        // headerStyle: {
                        // 	backgroundColor: "#9E9E9E",
                        // },
                        // headerTintColor: "#fff",
                        // headerTitleStyle: {
                        // 	fontWeight: "bold",
                        // },
                        // headerRight: () => (
                        //     <Button title="Add" onPress={() => navigation.navigate("AddContact")} />
                        // )
                    })}
                />
                <Stack.Screen
                    name="MovieDetails"
                    component={MovieDetailsScreen}
                    options={{
                        title: "Details"
                    }}
                />
                <Stack.Screen
                    name="MoviePoster"
                    component={MoviePosterScreen}
                    options={{
                        title: "Poster"
                    }}
                />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
