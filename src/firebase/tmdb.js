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


export async function fetchShowDetails(
	showName,
	seasonNumber,
	episodeNumber,
	setCastInfo,
	setEpisodeDetails,
	setLoading
) {
	setLoading(true)
	try {
		// Step 1: Search for the show by name
		const searchRes = await fetch(
			`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
				showName
			)}`
		);
		const searchData = await searchRes.json();
		if (!searchData.results.length) throw new Error("Show not found");

		const show = searchData.results[0]; // First result (most relevant)
		const showId = show.id;

		// Step 2: Fetch full show details
		const showRes = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`
		);
		const showDetails = await showRes.json();
		
		// Step 3: Fetch credits (cast & crew)
		const creditsRes = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${API_KEY}`
		);
		const creditsData = await creditsRes.json();
		console.log(
			`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${API_KEY}`
		);
		// Extract cast details
		const cast = creditsData.cast
			? creditsData.cast
					.slice(0, 10)
					.map(({ name, character, profile_path }) => ({
						name,
						character,
						image: profile_path
							? `https://image.tmdb.org/t/p/w500${profile_path}`
							: "https://via.placeholder.com/100", // Default placeholder if no image
					}))
			: null;
			setCastInfo(cast)
		// Extract crew details
		
		const crew = creditsData.crew
			? creditsData.crew.slice(0,5): [];
		
		const director = creditsData.crew
			.filter(
				(person) => person.job === "Director" || person.job === "Producer"
			)
			.map(({ name, job, profile_path }) => ({
				name,
				job,
				image: profile_path
					? `https://image.tmdb.org/t/p/w500${profile_path}`
					: "https://via.placeholder.com/100", // Default placeholder if no image
			}));
			console.log(showDetails.guest_stars);
		const videosRes = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${API_KEY}`
		);
		const videosData = await videosRes.json();
		const trailer =
			videosData.results.find((video) => video.type === "Trailer")?.key || "";
		const trailerLink = trailer
			? `https://www.youtube.com/watch?v=${trailer}`
			: "";
		
		// Calculate total runtime (estimated)
		const avgRuntime = showDetails.episode_run_time?.[0] || 40; // Average episode runtime
		const totalEpisodes = showDetails.number_of_episodes;
		const totalRuntime = avgRuntime * totalEpisodes; // Estimated total runtime

		// Step 4: Fetch specific season & episode details (if provided)
		let episodeDetails = {};
		if (seasonNumber && episodeNumber) {
			const episodeRes = await fetch(
				`https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}`
			);
			episodeDetails = await episodeRes.json();

		}
		
		// Step 5: Format and return the collected data
		
		console.log(cast);
		const res = {
			name: showDetails.name,
			genres: showDetails.genres.map((g) => g.name),
			description: showDetails.overview,
			language: showDetails.original_language,
			director: director[0] || showDetails.created_by[0] ,
			numberOfSeasons: showDetails.number_of_seasons,

			showReleaseDate: showDetails.first_air_date,
			cast: cast.length>0 ? cast:episodeDetails.guest_stars.slice(0, 5),
			crew,
			rating: showDetails.vote_average,
			trailer: trailerLink || "",
			posterLink: showDetails.poster_path
				? `https://image.tmdb.org/t/p/w500${showDetails.poster_path}`
				: "",
			backdropLink: showDetails.backdrop_path
				? `https://image.tmdb.org/t/p/original${showDetails.backdrop_path}`
				: "",
			totalRuntime,
			seasonDetails: {
				seasonNumber,
				episodeDetails: episodeNumber
					? {
							episodeNo: episodeNumber,
							seasonNumber,
							title: episodeDetails.name,
							overview: episodeDetails.overview,
							runtime: episodeDetails.runtime,
							airDate: episodeDetails.air_date,
							stillPath: episodeDetails.still_path
								? `https://image.tmdb.org/t/p/w500${episodeDetails.still_path}`
								: "",
					  }
					: {},
			},
		};
		setEpisodeDetails(res)
		// console.log(res)
		setLoading(false)
	} catch (error) {
		console.error("Error fetching show details:", error);
	}
}




export default fetchMovieDetails;