import React from "react";
import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import MovieSearchResultSectionList from "../components/MovieSearchResultSectionList";
import MovieSearchResultFlatList from "../components/MovieSearchResultFlatList";
import MoviesContext from "../context/MoviesContext";
import SearchMovieForm from "../components/SearchMovieForm"
import {fetchMoviesByTitleSearch} from '../utils/movieApi'
import { omdbPageSize } from "../utils/movieHelpers";
import ListPaginationControl from "../components/ListPaginationControl";

const searchState = {
	HasNotSearched: 0,
	ShowingResults: 1,
	NoResultsFound: 2
}

export default class MovieSearchScreen extends React.Component {
    static contextType = MoviesContext;

	state = {
		searchState: searchState.HasNotSearched,
		searchTerm: "",
        movies: [],
		currentPage: 0,
		nextPage: 1,
		currentSearchStartIndex: 1,
		totalPages: 0,	
		totalSearchResults: 0,
		isLoading: false,
		isLoadingMoreRecords: false
	};

    handleSearch = (searchCriteria) => {
		// Reset the state.
		this.setState({
			searchState: searchState.HasNotSearched,
			searchTerm: searchCriteria.movieTitle,
			movies: [],
			currentPage: 1,
			nextPage: 2,
			currentSearchStartIndex: 1,
			totalPages: 0,
			totalSearchResults: 0,
			isLoading: true,
			isLoadingMoreRecords: false
		});

        this.getMoviesFromApi(searchCriteria.movieTitle, 1);
    }

	loadPage = (page) => {
		console.log("LOADPAGE", page);

		//if (this.state.searchState === searchState.ShowingResults && this.state.nextPage <= this.state.totalPages) {
			// this.setState((prevState) => ({
			// 	currentPage: prevState.nextPage,
			// 	nextPage: prevState.nextPage++
			// }));

			this.getMoviesFromApi(this.state.searchTerm, page);
		//}
	}

	loadNextPage = () => {
		console.log("LOADNEXT", this.state.nextPage, this.state.totalPages);

		if (!this.state.isLoading && this.state.searchState === searchState.ShowingResults && this.state.nextPage <= this.state.totalPages) {
			this.setState({isLoadingMoreRecords: true});
			this.getMoviesFromApi(this.state.searchTerm, this.state.nextPage);
		}
	}

    getMoviesFromApi = async (movieTitle, page) => {
		const results = await fetchMoviesByTitleSearch(movieTitle, page);

		this.setState((prevState) => ({
			searchState: results.totalResults > 0 ? searchState.ShowingResults : searchState.NoResultsFound,
			searchTerm: movieTitle,
			//movies: results.searchResults,//prevState.movies.concat(...results.searchResults),
			movies: results.searchSucceeded ? prevState.movies.concat(...results.searchResults) : prevState.movies,
			//currentPage: page,
			currentPage: page,
			//nextPage: page++,
			nextPage: page + 1,
			//currentSearchStartIndex: results.currentSearchStartIndex,//prevState.currentSearchStartIndex + results.currentSearchStartIndex,
			currentSearchStartIndex: prevState.currentSearchStartIndex + results.currentSearchStartIndex,
			totalPages: results.totalPageNums,
			totalSearchResults: results.totalResults,
			isLoading: false,
			isLoadingMoreRecords: false
		}));

		console.log("TOTAL", this.state.movies);
	}

	render() {		
		var numResultsShown = omdbPageSize;
		var currentSearchEndIndex = this.state.currentSearchStartIndex + numResultsShown - 1

		if (this.state.movies) {
			numResultsShown = omdbPageSize <= this.state.movies.length ? omdbPageSize : this.state.movies.length;
		}

		return (
			<View style={styles.container}>
                <SearchMovieForm onSubmit={this.handleSearch} isLoading={this.state.isLoading}></SearchMovieForm>
                {this.state.searchState === searchState.ShowingResults && (
					<>
						{/* Shorthand React fragment allows for multiple child elements. */}
						{/* <Text style={styles.resultText}>Showing results {this.state.currentSearchStartIndex}-{currentSearchEndIndex} of {this.state.totalSearchResults}.</Text> */}
						<Text style={styles.resultText}>Showing results 1-{this.state.movies.length} of {this.state.totalSearchResults}.</Text>
						<MovieSearchResultFlatList
							movies={this.state.movies}
							onSelectMovie={(movie) => {
								this.props.navigation.navigate("MovieDetails", {Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID})
							}}
							onEndListReached={this.loadNextPage}
							isLoading={this.state.isLoadingMoreRecords}
						/>
						{/* <ListPaginationControl
							currentPage={this.state.currentPage}
							totalPages={this.state.totalPages}
							goToPage={this.loadPage}
						/> */}
					</>
                )}
				{this.state.searchState === searchState.NoResultsFound && (
					<Text style={styles.resultText}>No results found.</Text>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// There's purposely no flex: 1 here because then you get double scrollbars
		maxHeight: "100vh",
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 10
	},
	resultText: {
		alignSelf: "center",
		fontStyle: "italic",
		fontSize: 12,
		marginVertical: 10
	}
});
