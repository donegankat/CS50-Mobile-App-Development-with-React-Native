import React from "react";
import { View, Button, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MovieDetailHeader from "../components/MovieDetailHeader";
import LabelledText from "../components/LabelledText";
import LabelledTextWithIcon from "../components/LabelledTextWithIcon";
import {fetchFullMovieDetails} from '../utils/movieApi'

export default class MovieDetailsScreen extends React.Component {
    //static contextType = ContactsContext;

    constructor(props) {
        super(props);        

        console.log(props.route.params);

        this.state = {
            movie: null
        };
    }

    componentDidMount() {
        this.getMovieDetailsFromApi(this.props.route.params.imdbID);

        // This update to the navigation options MUST be done in componentDidMount (or possibly componentDidUpdate)
        // rather than the constructor. Otherwise when we have nested navigation like we do in this app, this causes
        // a warning/error because it can't update a component from inside another component.
        // https://github.com/react-navigation/react-navigation/issues/8621
        this.props.navigation.setOptions({
            headerTitle: `${this.props.route.params.Title} (${this.props.route.params.Year})`
        });
    }

    getMovieDetailsFromApi = async (imdbId) => {
		const results = await fetchFullMovieDetails(imdbId);
		this.setState({
            movie: results
		});
	}

    render() {
        var directorLabel = "Director";
        var writerLabel = "Writer";
        var metaScoreIcon = "";
        var metaScoreColor = "";
        var imdbScoreIcon = "";
        var imdbScoreColor = "";

        if (this.state.movie) {
            directorLabel = this.state.movie.Director.includes(",") ? "Directors" : "Director";
            writerLabel = this.state.movie.Writer.includes(",") ? "Writers" : "Writer";

            var metaScoreInt = parseInt(this.state.movie.Metascore);
            var imdbScoreInt = parseInt(this.state.movie.imdbRating);

            if (metaScoreInt >= 70) {
                metaScoreIcon = "thumb-up";
                metaScoreColor = "green";
            } else if (metaScoreInt >= 30) {
                metaScoreIcon = "thumbs-up-down";
                metaScoreColor = "goldenrod";
            } else if (this.state.movie.Metascore !== "N/A") {
                metaScoreIcon = "thumb-down";
                metaScoreColor = "crimson";
            }

            if (imdbScoreInt >= 7) {
                imdbScoreIcon = "thumb-up";
                imdbScoreColor = "green";
            } else if (imdbScoreInt >= 3) {
                imdbScoreIcon = "thumbs-up-down";
                imdbScoreColor = "goldenrod";
            } else if (this.state.movie.imdbRating !== "N/A") {
                imdbScoreIcon = "thumb-down";
                imdbScoreColor = "crimson";
            }
        }

        return (
            <View style={styles.container}>
                {this.state.movie && (
                    <>
                        <MovieDetailHeader                            
                            Title={this.state.movie.Title}
                            Year={this.state.movie.Year}
                            Rated={this.state.movie.Rated}
                            Runtime={this.state.movie.Runtime}
                        />
                        <View style={styles.topContainer}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("MoviePoster", {Title: this.state.movie.Title, Year: this.state.movie.Year, Poster: this.state.movie.Poster})}}>
                                <Image
                                    style={styles.poster}
                                    source={{uri: this.state.movie.Poster}}
                                />
                            </TouchableOpacity>
                            <View style={styles.basicInfoContainer}>
                                <Text style={styles.genre}>{this.state.movie.Genre}</Text>
                                <LabelledText label={directorLabel} text={this.state.movie.Director} />
                                <LabelledText label={writerLabel} text={this.state.movie.Writer} />
                                <LabelledText label="Stars" text={this.state.movie.Actors} />
                            </View>
                        </View>

                        <View style={styles.summaryContainer}>
                            {/* <Text style={styles.genre}>{this.state.movie.Genre}</Text> */}
                            <Text>{this.state.movie.Plot}</Text>
                        </View>

                        <View style={styles.additionalInfoContainer}>
                            <LabelledText label="Production Co." text={this.state.movie.Production} />
                            <LabelledText label="Released" text={`${this.state.movie.Released} (${this.state.movie.Country})`} />
                            <LabelledText label="Language" text={this.state.movie.Language} />
                        </View>

                        <View style={styles.receptionContainer}>
                            <Text style={styles.sectionHeader}>Critical Reception</Text>
                            <LabelledText label="Box Office" text={this.state.movie.BoxOffice} />
                            <LabelledText label="Awards" text={this.state.movie.Awards} />
                            <LabelledTextWithIcon
                                label="Metascore"
                                text={`${this.state.movie.Metascore} out of 100`}
                                iconName={metaScoreIcon}
                                iconColor={metaScoreColor}
                            />
                            <LabelledTextWithIcon
                                label="IMDB Rating"
                                text={`${this.state.movie.imdbRating} out of 10 (from ${this.state.movie.imdbVotes} votes)`}
                                iconName={imdbScoreIcon}
                                iconColor={imdbScoreColor}
                            />
                        </View>
                    </>
                )}
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
    topContainer: {
        flexDirection: "row",
        // flex: 1,
        marginBottom: 20
    },
    poster: {
        width: 85,
        height: 130,
        marginRight: 10,
        alignSelf: "center",
    },
    genre: {
        marginBottom: 10,
        fontStyle: "italic"
    },
    basicInfoContainer: {
        flex: 1,
        flexDirection: "column"
    },
    summaryContainer: {
        marginBottom: 20
    },
    sectionHeader: {
        fontSize: 16,
        marginTop: 30,
        marginBottom: 5,
        paddingBottom: 5,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    }
});