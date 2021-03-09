import React from "react";
import { FlatList, Text, ScrollView, View, ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import MovieRow from "./MovieRow";

const styles = StyleSheet.create({
	footer: {
	  padding: 10,
	  justifyContent: 'center',
	  alignItems: 'center',
	  flexDirection: 'row',
	},
});

const MovieSearchResultFlatList = (props) => {
    const renderItem = ({ item }) => <MovieRow {...item} onSelectMovie={props.onSelectMovie} />;

	const renderFooter = () => {
		return (
		  //Footer View with Loader
		  <View style={styles.footer}>
			{props.isLoading ? (
			  <ActivityIndicator style={{ margin: 15 }} />
			) : null}
		  </View>
		);
	  };

	const ItemSeparatorView = () => {
		return (
		  // Flat List Item Separator
		  <View
			style={{
			  height: 0.5,
			  width: '100%',
			  backgroundColor: '#C8C8C8',
			}}
		  />
		);
	  };

	return (
		<View style={{flex: 1}}>
			<FlatList
				style={{height: "100vh"}}
				contentContainerStyle={{flex:1}}
				renderItem={renderItem}
				data={props.movies}
				keyExtractor={(movie, index) => `movie_${movie.imdbID}_${index}`}
				//onEndReached={props.onEndListReached}
				onEndReachedThreshold={0.5}
				ItemSeparatorComponent={ItemSeparatorView}
				ListFooterComponent={renderFooter}
				initialNumToRender={10}
				onEndReached = {() => {
					console.log("END", !props.isLoading);
					if (!props.isLoading) {
						props.onEndListReached();
					}
				}}
			/>
		</View>
	);
};

MovieSearchResultFlatList.propTypes = {
	movies: PropTypes.array,
};

export default MovieSearchResultFlatList;