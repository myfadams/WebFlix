import React, { useState } from "react";
import DropDown from "../components/input/DropDown";
import styles from "./upload.module.css"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// console.log(API_KEY)
function convertBytes(bytes) {
	const MB = 1024 * 1024;
	const GB = MB * 1000; 

	if (bytes >= GB) {
		return (bytes / GB).toFixed(2) + " GB";
	} else {
		return (bytes / MB).toFixed(2) + " MB";
	}
}
const Upload = () => {
    const genreOptions = [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Adventure",
        "Fantasy",
        "Mystery",
    ];
	const [movieData, setMovieData] = useState({
		title: "",
		description: "",
		releaseDate: "",
		runtime: "",
		genres: [],
		language: "",
		director: "",
		cast: [],
		rating: "",
		trailer: "",
		posterLink: "", // Local file upload
		backdropLink: "", // Local file upload
		movieLink:"", // Movie file upload
	});
    const [castInfo,setCastInfo]=useState();
	const [loading, setLoading] = useState(false);
    const [movieFiles,setMovieFiles]=useState({movieFile:null,poster:null,backdrop:null})

	// Fetch movie details from TMDb
	const fetchMovieDetails = async (title) => {
        console.log(title)
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
					? `https://image.tmdb.org/t/p/w1280/${detailsData.poster_path}`
					: "./No-poster.png",
			}));
		} catch (error) {
			console.error("Error fetching movie details:", error);
		}

		setLoading(false);
	};

	// Handle file uploads
	const handleFileChange = (e, field) => {
		setMovieFiles((prev) => ({
			...prev,
			[field]: e.target.files[0],
		}));
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Movie Data Submitted:", movieData);
		alert("Movie uploaded successfully!");
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					marginTop: "1rem",
					marginBottom: "1.2rem",
					justifyContent: "center",
					gap: "1rem",
				}}
			>
				<img src="./Wordmark.png" alt="" style={{ objectFit: "contain" }} />{" "}
				<h2>Upload a Movie</h2>
			</div>
			<form onSubmit={handleSubmit} className={styles.UploadForm}>
				<input
					type="text"
					value={movieData.title}
					onChange={(e) =>
						setMovieData({ ...movieData, title: e.target.value })
					}
					onBlur={() => fetchMovieDetails(movieData.title)}
					placeholder="Enter movie title"
					required
					className={styles.upInp}
				/>
				<div className={styles.fileField}>
					<img src="./uploadBG.png" alt="" />

					<input
						type="file"
						accept="video/*"
						onChange={(e) => handleFileChange(e, "movieFile")}
						required
					/>
					<h4>
						{movieFiles.movieFile ? movieFiles.movieFile.name : "Upload Movie"}
					</h4>
					<p>
						{!movieFiles.movieFile ? (
							<>
								Maximum 10GB,Preferred format is
								<br />
								MP4 (H.2644) or WEBM (VP8,VP9)
							</>
						) : (
							convertBytes(movieFiles.movieFile.size)
						)}
					</p>
					{!movieFiles.movieFile && (
						<div className={styles.upBtn}>
							<div>Drag and drop or</div>
							<button>select a file</button>
						</div>
					)}
					{movieFiles.movieFile && (
						<div className={styles.upBtn}>
							<button
								style={{
									position: "relative",
									zIndex: "4",
									borderRadius: "4px",
								}}
							>
								Upload Movie
							</button>
						</div>
					)}
				</div>

				<textarea
					value={movieData.description}
					onChange={(e) =>
						setMovieData({ ...movieData, description: e.target.value })
					}
					placeholder="Movie synopsis"
					required
				/>

				<input
					type="date"
					value={movieData.releaseDate}
					onChange={(e) =>
						setMovieData({ ...movieData, releaseDate: e.target.value })
					}
					required
					placeholder="Release Date"
					className={styles.upInp}
					// style={{width:"200px" }}
				/>

				<input
					type="number"
					value={movieData.runtime}
					onChange={(e) =>
						setMovieData({ ...movieData, runtime: e.target.value })
					}
					required
					placeholder="Runtime (minutes)"
					className={styles.upInp}
				/>

				{/* Genres */}
				<DropDown list={genreOptions}  setValue={setMovieData} values={movieData}/>
				<input
					type="text"
					value={movieData.language}
					onChange={(e) =>
						setMovieData({ ...movieData, language: e.target.value })
					}
					required
					className={styles.upInp}
					placeholder="Language"
				/>

				<input
					type="text"
					value={movieData.director}
					onChange={(e) =>
						setMovieData({ ...movieData, director: e.target.value })
					}
					className={styles.upInp}
					placeholder="Director"
				/>

				<input
					type="text"
					value={movieData.cast.map(({ name }) => name)}
					onChange={(e) =>
						setMovieData({ ...movieData, cast: e.target.value.split(", ") })
					}
					className={styles.upInp}
					placeholder="Top five cast"
				/>

				<input
					type="number"
					step="0.1"
					max={10}
					min={1}
					value={movieData.rating}
					onChange={(e) =>
						setMovieData({ ...movieData, rating: e.target.value })
					}
					className={styles.upInp}
					placeholder="IMDb Rating"
				/>

				<input
					type="url"
					value={movieData.trailer}
					onChange={(e) =>
						setMovieData({ ...movieData, trailer: e.target.value })
					}
					className={styles.upInp}
					placeholder="URL for movie trailer"
				/>

				<div className={styles.fileField}>
					<img src="./uploadImg.png" alt="" />

					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleFileChange(e, "poster")}
						required
					/>
					<h4>{movieFiles.poster ? movieFiles.poster.name : "Upload Movie"}</h4>
					<p>
						{!movieFiles.poster ? (
							<>
								Maximum 100MB,Preferred format is
								<br />
								PNG, JPG, GIF or SVG.
							</>
						) : (
							convertBytes(movieFiles.poster.size)
						)}
					</p>
					{!movieFiles.poster && (
						<div className={styles.upBtn}>
							<div>Drag and drop or</div>
							<button>select a file</button>
						</div>
					)}
					{movieFiles.poster && (
						<div className={styles.upBtn}>
							<button
								style={{
									position: "relative",
									zIndex: "4",
									borderRadius: "4px",
								}}
							>
								Upload Poster
							</button>
						</div>
					)}
				</div>

				<div className={styles.fileField}>
					<img src="./uploadImg.png" alt="" />

					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleFileChange(e, "backdrop")}
						required
					/>
					<h4>
						{movieFiles.backdrop ? movieFiles.backdrop.name : "Upload Backdrop"}
					</h4>
					<p>
						{!movieFiles.backdrop ? (
							<>
								Maximum 100MB,Preferred format is
								<br />
								PNG, JPG, GIF or SVG.
							</>
						) : (
							convertBytes(movieFiles.backdrop.size)
						)}
					</p>
					{!movieFiles.backdrop && (
						<div className={styles.upBtn}>
							<div>Drag and drop or</div>
							<button>select a file</button>
						</div>
					)}
					{movieFiles.backdrop && (
						<div className={styles.upBtn}>
							<button
								style={{
									position: "relative",
									zIndex: "4",
									borderRadius: "4px",
								}}
							>
								Upload Backdrop
							</button>
						</div>
					)}
				</div>

				{/* Movie File Upload */}

				{/* Submit Button */}
				<button type="submit">
					{loading ? "Fetching Details..." : "Add Movie"}
				</button>
			</form>
		</div>
	);
};

export default Upload;
