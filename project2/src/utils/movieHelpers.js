// Compare two movies for alphabetizing
export const compareTitles = (movie1, movie2) => {
	const name1 = movie1.Title.toUpperCase();
	const name2 = movie2.Title.toUpperCase();

	if (name1 > name2) return 1;
	if (name2 > name1) return -1;
	return 0;
};

// The OMDB API always returns results in page sizes of 10 results and gives no
// way to change the page size in order to allow for a more elegant page calculation.
export const omdbPageSize = 10;
