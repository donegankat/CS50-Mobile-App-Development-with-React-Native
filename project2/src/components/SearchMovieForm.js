import React from "react";
import { KeyboardAvoidingView, Button, TextInput, StyleSheet, Platform, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import MoviesContext from "../context/MoviesContext";

export default class SearchMovieForm extends React.Component {
    static contextType = MoviesContext;

    state = {
        movieTitle: "",
        isFormValid: false
    }

    componentDidUpdate(prevProps, prevState) {
		// This check is required to avoid an infinite loop. Without it, componentDidUpdate will trigger validateForm
		// which will trigger componentDidUpdate again in an infinite loop.
		if (this.state.movieTitle !== prevState.movieTitle) {
			this.validateForm();
		}
	}

    getHandler = (key) => (val) => {
		this.setState({ [key]: val });
	};

    handleMovieTitleChange = this.getHandler("movieTitle"); // This will evaluate to: `val => {this.setState({name: val})}`
    
    handleSearch = () => {
		if (this.state.isFormValid) {
			this.props.onSubmit(this.state);
		}
    };
    
    /**
	 * Callback function called any time the forms are updated.
	 */
	validateForm = () => {
		if (this.state.movieTitle) {
			return this.setState({ isFormValid: true });
		} else {
			return this.setState({ isFormValid: false });
		}
	};

	render() {
		return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TextInput
                    style={styles.input}
                    value={this.state.movieTitle}
                    onChangeText={this.handleMovieTitleChange}
					onSubmitEditing={this.handleSearch}
                    placeholder="Movie Title"
                />
                
				{!this.props.isLoading && (
					<Button
						title="Search"
						onPress={this.handleSearch}
						disabled={!this.state.isFormValid}
                	/>
				)}

				{this.props.isLoading && (
					<ActivityIndicator />
				)}
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		backgroundColor: "#fff",
		paddingTop: Constants.statusBarHeight,
		//justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "black",
		minWidth: 100,
		marginVertical: 10,
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 3,
	},
});