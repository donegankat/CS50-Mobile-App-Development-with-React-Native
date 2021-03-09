import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";

export default class MovieDetailsScreen extends React.Component {
    constructor(props) {
        super(props);        

        console.log(props.route.params);

        this.state = {
            Title: props.route.params.Title,
            Year: props.route.params.Year,
            Poster: props.route.params.Poster
        };
    }

    componentDidMount() {
        // This update to the navigation options MUST be done in componentDidMount (or possibly componentDidUpdate)
        // rather than the constructor. Otherwise when we have nested navigation like we do in this app, this causes
        // a warning/error because it can't update a component from inside another component.
        // https://github.com/react-navigation/react-navigation/issues/8621
        this.props.navigation.setOptions({
            headerTitle: `${this.props.route.params.Title} (${this.props.route.params.Year})`
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.posterFullScreen}
                    source={{uri: this.state.Poster}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: "#fff",
        paddingHorizontal: 10,
		paddingVertical: 10,
	},
    posterFullScreen: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
});