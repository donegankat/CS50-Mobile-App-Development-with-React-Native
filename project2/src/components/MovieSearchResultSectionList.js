import React from "react";
import { SectionList, Text, View } from "react-native";
import PropTypes from "prop-types";
import MovieRow from "./MovieRow";
import { compareTitles } from "../utils/movieHelpers";


const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

const MovieSearchResultSectionList = (props) => {

    const renderItem = ({ item }) => <MovieRow {...item} onSelectMovie={props.onSelectMovie} />;

	const moviesByLetter = props.movies.reduce((obj, movies) => {
		const firstLetter = movies.Title[0].toUpperCase();
		return {
			...obj,
			[firstLetter]: [...(obj[firstLetter] || []), movies],
		};
	}, {});

	const sections = Object.keys(moviesByLetter)
		.sort()
		.map((letter) => ({
			data: moviesByLetter[letter].sort(compareTitles),
			title: letter,
		}));

	return (
		<SectionList
			sections={sections}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
		/>
	);
};

MovieSearchResultSectionList.propTypes = {
	movies: PropTypes.array,
};

export default MovieSearchResultSectionList;
