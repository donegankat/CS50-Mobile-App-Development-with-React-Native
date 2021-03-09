import { omdbPageSize } from './movieHelpers.js'
const apiKey = "75d6aebe"
const baseDataUrl = `http://www.omdbapi.com/?apikey=${apiKey}`
const basePosterUrl = `http://img.omdbapi.com/?apikey=${apiKey}`

export const fetchMoviesByTitleSearch = async (titleSearchString, pageNum) => {
    const searchUrl = `${baseDataUrl}&type=movie&s=${titleSearchString}&page=${pageNum}`
    
    const response = await fetch(searchUrl)
    const results = await response.json();
    
    console.log(results);

    let searchResults = {};

    if (results.Response === "True") {
        searchResults = {
            searchSucceeded: true,
            searchResults: results.Search,
            currentSearchStartIndex: (omdbPageSize * (pageNum - 1)) + 1,
            totalResults: results.totalResults,
            totalPageNums: Math.ceil(results.totalResults / omdbPageSize)
        };
    } else {
        searchResults = {
            searchSucceeded: false,
            searchResults: [],
            currentSearchStartIndex: (omdbPageSize * (pageNum - 1)) + 1,
            totalResults: 0,
            totalPageNums: 0
        };
    }

    console.log(searchResults);
    return searchResults;
    // if (numRetrievedResults < results.totalResults) {
    //     let nextPageNum = 2;

    //     while (numRetrievedResults < results.totalResults) {
    //         const pagedSearchUrl = `${searchUrl}&page=${nextPageNum}`;
    //         const pagedResponse = await fetch(pagedSearchUrl);
    //         const pagedResults = await pagedResponse.json();

    //         nextPageNum++;
    //         numRetrievedResults += pagedResults.Search.length;
    //         allRetrievedResults.push(...pagedResults.Search);
    //     }
    // }

    // console.log(allRetrievedResults);
    // return allRetrievedResults;
}

export const fetchFullMovieDetails = async (imdbId) => {
    const searchUrl = `${baseDataUrl}&type=movie&plot=full&i=${imdbId}`
    
    const response = await fetch(searchUrl)
    const results = await response.json();

    console.log(results);
    return results;
}