import { ref, set, get, child, update, push} from "firebase/database";
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

export const incrementViews = async (name,attribute, id="") => {
	console.log(name)

	let moviesRef;
	if (id!=="") moviesRef = ref(db, `movies/${name}/${id}`);
	else moviesRef = ref(db, `shows/${name}`);
	try {
		const snapshot = await get(moviesRef);
		if (snapshot.exists()) {
			const filmData = snapshot.val();
			const currentValue = filmData[attribute] || 0; 

			
			await update(moviesRef, {
				[attribute]: currentValue + 1,
			});

			console.log(`Successfully updated ${attribute}`);
		} else {
			console.log(`not found`);
		}
	} catch (error) {
		console.error("Error updating attribute:", error);
	}
};

export const addUserToDB = async (uid, userData) => {
	if (!uid || !userData) {
		console.error("Invalid user data");
		return;
	}

	try {
		const userRef = ref(database, `users/${uid}`); // Reference to the user node

		// Check if user exists
		const snapshot = await get(userRef);

		if (!snapshot.exists()) {
			// User does not exist, add them with an empty profiles array
			await set(userRef, {
				...userData,
			});
			console.log("User added successfully with an empty profiles array!");
		} else {
			console.log("User already exists in the database.");
		}
	} catch (error) {
		console.error("Error adding user to Firebase RTDB:", error);
	}
};

export const retrieveProfiles = async (uid) => {
	try {
		const userRef = ref(db, `users/${uid}/profiles`);
		const snapshot = await get(userRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			// Ensure the data is always returned as an array
			const profilesArray = Array.isArray(data)
				? data // If it's already an array, return it
				: Object.values(data); // Convert object to array

			console.log(profilesArray, "Profiles retrieved");
			return profilesArray;
		} else {
			console.log("No profiles found!");
			return [];
		}
	} catch (error) {
		console.error("Error retrieving profiles:", error);
		return [];
	}
};

export const addProfile = async (uid, profile) => {
	try {
		const profilesRef = ref(db, `users/${uid}/profiles`);

		// Check if profiles exist
		const snapshot = await get(profilesRef);
		console.log(snapshot.exists(), "herere ");

		// Generate a reliable ID (fallback for `crypto.randomUUID()`)
		const id =
			typeof crypto !== "undefined" && crypto.randomUUID
				? crypto.randomUUID()
				: Date.now().toString(36) + Math.random().toString(36).substring(2);

		console.log(id)
		profile.id = id; // Ensure profile has an ID before adding
		if (!snapshot.exists()) {
			// If profiles path doesn’t exist, create an array
			await set(profilesRef, [profile]);
			console.log("Created profiles array and added the first profile.");
		} else {
			// If profiles exist, add a new profile using push() to avoid overwriting
			const newProfileRef = push(profilesRef);
			await set(newProfileRef, profile);
			console.log("Profile added successfully!");
		}

		return true;
	} catch (error) {
		console.error("Error adding profile:", error);
		return false;
	}
};

export const addMovieToUsedList = async (profileID, movieName) => {
	console.log(movieName,"movieDetails")
	try {
		const addedListRef = ref(db, `personalList/${profileID}/addedList`); // Reference to usedList

		// Retrieve current used list
		const snapshot = await get(addedListRef);
		let addedList = snapshot.exists() ? snapshot.val() : [];

		// Ensure it's an array (in case of push storage)
		if (!Array.isArray(addedList)) {
			addedList = Object.values(addedList);
		}

		// Add new movie to the list
		if (!addedList.includes(movieName)) {
			addedList.push(movieName);
			await set(addedListRef, addedList);
			console.log(`Movie "${movieName}" added to  list.`);
		} else {
			console.log(`Movie "${movieName}" is already in the  list.`);
		}

		return true;
	} catch (error) {
		console.error("Error adding movie to used list:", error);
		return false;
	}
}

export const retrieveUserList = async (profileID) => {
	try {
		const personalRef = ref(db, `personalList/${profileID}/addedList`);
		const snapshot = await get(personalRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			
			const personalArray = Array.isArray(data)
				? data 
				: Object.values(data); 

			console.log(personalArray, "USer List  retrieved");
			return personalArray;
		} else {
			console.log("No List found!");
			return [];
		}
	} catch (error) {
		console.error("Error retrieving List:", error);
		return [];
	}
};


export const retrieveReviews = async (filmName) => {
	try {
		const reviewsRef = ref(db, `reviews/${filmName}/reviews`);
		const snapshot = await get(reviewsRef);

		if (snapshot.exists()) {
			const data = snapshot.val();

			const reviewArray = Array.isArray(data) ? data : Object.values(data);

			console.log(reviewArray, "USer List  retrieved");
			return reviewArray;
		} else {
			console.log("No List found!");
			return [];
		}
	} catch (error) {
		console.error("Error retrieving List:", error);
		return [];
	}
};

export const addReviews = async (filmName,review) => {
	console.log(review, "movieDetails");
	try {
		const reviewsRef = ref(db, `reviews/${filmName}/reviews`);
		const snapshot = await get(reviewsRef);
		let reviewList = snapshot.exists() ? snapshot.val() : [];
		const id =
			typeof crypto !== "undefined" && crypto.randomUUID
				? crypto.randomUUID()
				: Date.now().toString(36) + Math.random().toString(36).substring(2);
		// Ensure it's an array (in case of push storage)
		if (!Array.isArray(reviewList)) {
			reviewList = Object.values(reviewList);
		}
		review={...review,id}
		reviewList.push(review);
		await set(reviewsRef, reviewList);

		console.log("done")
	} catch (error) {
		console.error("Error adding review movie to used list:", error);
	}
};


export const addLike = async (filmName, userId, reviewId) => {
	if (!filmName || !userId || !reviewId){
		 return;

	}
	const likesRef = ref(db, `reviews/${filmName}/reviews/${reviewId}/likes`);

	try {
		const snapshot = await get(likesRef);
		let likesData = snapshot.exists() ? snapshot.val() : [];

		// Ensure likesData is an array
		if (!Array.isArray(likesData)) {
			likesData = [];
		}

		if (likesData.includes(userId)) {
			// If user already liked, remove their ID
			likesData = likesData.filter((id) => id !== userId);
		} else {
			// If user hasn't liked, add their ID
			likesData.push(userId);
		}

		await set(likesRef, likesData);
	} catch (error) {
		console.error("Error toggling like:", error);
	}
};

export default addFilm