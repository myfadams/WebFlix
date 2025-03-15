import { ref, set, get, child, update } from "firebase/database";
import { database } from "./config";

const dbRef = ref(database);
const db = database;
async function addFilm(type, filmObject) {
	

	try {
		// Check if the film exists in the database
		const filmPath =
			type === "movies"
				? `movies/${filmObject.name}`
				: `shows/${filmObject.name}`;
		const snapshot = await get(child(dbRef, filmPath));

		if (snapshot.exists()) {
			console.log("Film already exists in the database.");
		} else {
			const randomId = crypto.randomUUID()
			console.log(randomId)
			if (type === "movies") {
				await set(ref(db, `movies/${filmObject.title}/${randomId}`), filmObject);
			} else {
				const showDetails = {
					name: filmObject.name,
					genres: filmObject.genres,
					description: filmObject.description,
					language: filmObject.language,
					director: filmObject.director,
					numberOfSeasons: filmObject.numberOfSeasons,
					showReleaseDate: filmObject.showReleaseDate,
					cast: filmObject.cast,
					crew: filmObject.crew,
					rating: filmObject.rating,
					trailer: filmObject.trailer,
					posterLink: filmObject.posterLink,
					backdropLink: filmObject.backdropLink,
					totalRuntime: filmObject.totalRuntime,
					seasons: [],
				};

				await set(ref(db, `shows/${showDetails.name}`), showDetails);
				console.log("Show added successfully!");
			}
		}

		// Handle episode details (adding to the correct season)
		if (type !== "movies" && filmObject.seasonDetails.episodeDetails) {
			const { seasonNumber, episodeNo, ...episodeData } =
				filmObject.seasonDetails.episodeDetails;
			const showRef = ref(db, `shows/${filmObject.name}`);

			const showSnapshot = await get(showRef);
			if (showSnapshot.exists()) {
				const showData = showSnapshot.val();
				const seasons = showData.seasons || {};

				// If the season doesn't exist, create it
				if (!seasons[seasonNumber-1]) {
					seasons[seasonNumber-1] = { episodes: [] };
				}

				// Check if the episode already exists
				const existingEpisode = seasons[seasonNumber-1].episodes.find(
					(ep) => ep.episodeNumber === episodeNo
				);

				if (!existingEpisode) {
					seasons[seasonNumber-1].episodes.push({
						seasonNumber,
						episodeNumber: episodeNo,
						...episodeData,
					});

					// Update Firebase
					await update(showRef, { seasons });
					console.log(`Episode ${episodeNo} added to Season ${seasonNumber}`);
				} else {
					console.log(
						`Episode ${episodeNo} already exists in Season ${seasonNumber}`
					);
				}
			} else {
				console.error("Show not found, cannot add episode.");
			}
		}
	} catch (error) {
		console.error("Error checking or adding film:", error);
	}
}



export const getMovies = async (type) => {
	try {
		let moviesRef;
		if(type==="movies")
			moviesRef = ref(db, "movies"); 
		else
			moviesRef = ref(db, "shows"); 
		const snapshot = await get(moviesRef);

		if (snapshot.exists()) {
			const moviesData = snapshot.val(); // Get raw data

			// Extract movies correctly based on the given structure
			const movies = Object.values(moviesData).map((movieEntry) => {
				const [id, movie] = Object.entries(movieEntry)[0]; // Extract key-value pair
				return { id, ...movie }; // Include the id inside the movie object
			});

			// console.log(movies);
			return movies;
		} else {
			console.log("No movies found.");
			return [];
		}
	} catch (error) {
		console.error("Error fetching movies:", error);
		return [];
	}
};

export const getShows = async () => {
	try {
		const moviesRef = ref(db, "shows");
		const snapshot = await get(moviesRef);

		if (snapshot.exists()) {
			const showsData = snapshot.val(); // Get raw data
			const shows = Object.values(showsData).map((showEntry) => {
				// If `seasons` exists and is an array, remove null values
				if (Array.isArray(showEntry.seasons)) {
					showEntry.seasons = showEntry.seasons.filter(
						(season) => season !== null
					);
				}

				console.log(showEntry);
				return {...showEntry };
			});

			return shows;
		} else {
			console.log("No movies found.");
			return [];
		}
	} catch (error) {
		console.error("Error fetching movies:", error);
		return [];
	}
};

export default addFilm