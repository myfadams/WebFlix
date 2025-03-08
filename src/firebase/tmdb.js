const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchMovieDetails = async (
	title,
	setLoading,
	setCastInfo,
	setMovieData
) => {
	console.log(title);
	if (!title) return;
	setLoading(true);

	try {
		const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
			title
		)}`;
		const searchResponse = await fetch(searchUrl);
		const searchData = await searchResponse.json();

		if (searchData.results.length === 0) {
			alert("Movie not found!");
			setLoading(false);
			return;
		}

		const movie = searchData.results[0];
		const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,videos`;
		const detailsResponse = await fetch(detailsUrl);
		const detailsData = await detailsResponse.json();
		console.log(detailsData);
		setCastInfo(detailsData.credits.cast.slice(0, 5).map((a) => a));
		setMovieData((prev) => ({
			...prev,
			title: detailsData.title,
			description: detailsData.overview,
			releaseDate: detailsData.release_date,
			runtime: detailsData.runtime,
			genres: detailsData.genres.map((g) => g.name),
			language: detailsData.original_language,
			director:
				detailsData.credits.crew.find((p) => p.job === "Director")?.name ||
				"Unknown",
			cast: detailsData.credits.cast.slice(0, 5).map((a) => a),
			crew: detailsData.credits.crew,
			rating: detailsData.vote_average,
			trailer: detailsData.videos.results.find((v) => v.type === "Trailer")
				? `https://www.youtube.com/watch?v=${
						detailsData.videos.results.find((v) => v.type === "Trailer").key
				  }`
				: "",
			posterLink: detailsData.poster_path
				? `https://image.tmdb.org/t/p/w500/${detailsData.poster_path}`
				: "./No-poster.png",
			backdropLink: detailsData.backdrop_path
				? `https://image.tmdb.org/t/p/w1280/${detailsData.backdrop_path}`
				: "./No-poster.png",
		}));
	} catch (error) {
		console.error("Error fetching movie details:", error);
	}

	setLoading(false);
};

export default fetchMovieDetails;
