import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
	container: {
		fontSize: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		width: 20,
	},
});

export default class ListPaginationControl extends React.Component {
	state = {
		currentPage: this.props.currentPage,
		totalPages: this.props.totalPages,
	};

  handlePaginationPress = (page) => {
    this.props.goToPage(page);
  };

	render() {
		return (
			<View style={styles.container}>
				<Button
					style={styles.button}
					title="<<"
					onPress={() => this.handlePaginationPress(1)}
					disabled={this.props.currentPage <= 1}
				/>
				<Button
					style={styles.button}
					title="<"
					onPress={() => this.handlePaginationPress(this.props.currentPage - 1)}
					disabled={this.props.currentPage <= 1}
				/>
				<Button
					style={styles.button}
					title=">"
					onPress={() => this.handlePaginationPress(this.props.currentPage + 1)}
					disabled={this.props.currentPage + 1 >= this.props.totalPages}
				/>
				<Button
					style={styles.button}
					title=">>"
					onPress={() => this.handlePaginationPress(this.props.totalPages)}
					disabled={this.props.currentPage + 1 >= this.props.totalPages}
				/>
			</View>
		);
	}
}
