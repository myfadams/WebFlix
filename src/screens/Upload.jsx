import React, { useState } from "react";
import DropDown from "../components/input/DropDown";
import styles from "./upload.module.css";
import fetchMovieDetails from "../firebase/tmdb";
import uploadFiles from "../firebase/upload";
import LoadingSpinner from "../components/LoadingSpinner";

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
		movieLink: "", // Movie file upload
	});
	const [castInfo, setCastInfo] = useState();
	const [loading, setLoading] = useState(false);
	const [movieFiles, setMovieFiles] = useState({
		movieFile: null,
		poster: null,
		backdrop: null,
	});
	const [movDetails, setMovDetails] = useState({
		disable: false,
		progress: null,
	});
	const [posDetails, setPosDetails] = useState({
		disable: false,
		progress: null,
	});
	const [backDetails, setBackDetails] = useState({
		disable: false,
		progress: null,
	});

	const uploadToDb = (file, type) => {
		if (!file) {
			alert("no file selected");
			return;
		}

		if (type === "movies") {
			setMovDetails({ ...movDetails, disable: true });
			uploadFiles(file, type, setMovDetails).then((fileUrl) => {
				console.log(fileUrl);
				setMovieData((prev) => {
					return { ...prev, movieLink: fileUrl };
				});
			});
			// setMovDetails({ ...movDetails, disable: false });
		}
		if (type === "poster") {
			setPosDetails({ ...posDetails, disable: true });
			uploadFiles(file, type, setPosDetails).then((fileUrl) => {
				console.log(fileUrl);
				setMovieData((prev) => {
					return { ...prev, posterLink: fileUrl };
				});
			});
			// setPosDetails({ ...posDetails, disable: false });
		}
		if (type === "backdrops") {
			setBackDetails({ ...backDetails, disable: true });
			uploadFiles(file, type, setBackDetails).then((fileUrl) => {
				console.log(fileUrl);
				setMovieData((prev) => {
					return { ...prev, backdropLink: fileUrl };
				});
			});
			// setBackDetails({ ...backDetails, disable: false });
		}
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
		<div className={styles.mainFor}>
			<div
				style={{
					display: "flex",
					marginTop: "1rem",
					marginBottom: "1.2rem",
					justifyContent: "center",
					gap: "1rem",
				}}
			>
				<img src="./Wordmark.svg" alt="" className="siteLogo" />{" "}
				<h2>Upload a Movie</h2>
			</div>
			<form onSubmit={handleSubmit} className={styles.UploadForm}>
				<div
					style={{
						width: "40%",
						display: "flex",
						alignItems: "center",
						position: "relative",
					}}
					className={styles.mD}
				>
					{loading && <LoadingSpinner />}
					<input
						type="text"
						value={movieData.title}
						onChange={(e) =>
							setMovieData({ ...movieData, title: e.target.value })
						}
						onBlur={() =>
							fetchMovieDetails(
								movieData.title,
								setLoading,
								setCastInfo,
								setMovieData
							)
						}
						placeholder="Enter movie title"
						required
						style={{ width: "100%" }}
						className={styles.upInp}
					/>
				</div>
				{!loading && movieData.title.trim() != "" && (
					<>
						<div className={styles.fileField}>
							<>
								<img src="./uploadBG.png" alt="" />

								<input
									type="file"
									accept="video/*"
									onChange={(e) => handleFileChange(e, "movieFile")}
									required
								/>
								<h4>
									{movieFiles.movieFile
										? movieFiles.movieFile.name
										: "Upload Movie"}
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
										<button type="button">select a file</button>
									</div>
								)}
								{movieFiles.movieFile && (
									<div className={styles.upBtn}>
										<button
											type="button"
											style={{
												position: "relative",
												zIndex: "4",
												borderRadius: "4px",
											}}
											onClick={() => {
												uploadToDb(movieFiles.movieFile, "movies");
											}}
											disabled={movDetails.disable}
										>
											{movDetails.progress
												? `${movDetails.progress}%`
												: "Upload Movie"}
										</button>
									</div>
								)}
							</>
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
							pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"
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
						<DropDown
							list={genreOptions}
							setValue={setMovieData}
							values={movieData}
						/>
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
							{movieData.posterLink ? (
								<img src={movieData.posterLink} alt="" />
							) : (
								<>
									<img src="./uploadImg.png" alt="" />

									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleFileChange(e, "poster")}
										required
									/>
									<h4>
										{movieFiles.poster
											? movieFiles.poster.name
											: "Upload poster"}
									</h4>
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
											<button type="button">select a file</button>
										</div>
									)}
									{movieFiles.poster && (
										<div className={styles.upBtn}>
											<button
												type="button"
												style={{
													position: "relative",
													zIndex: "4",
													borderRadius: "4px",
												}}
												onClick={() => {
													uploadToDb(movieFiles.poster, "poster");
												}}
												disabled={posDetails.disable}
											>
												{posDetails.progress
													? `${posDetails.progress}%`
													: "Upload Poster"}
											</button>
										</div>
									)}
								</>
							)}
						</div>

						<div className={styles.fileField}>
							{movieData.backdropLink ? (
								<img src={movieData.backdropLink} style={{ width: "100%" }} />
							) : (
								<>
									<img src="./uploadImg.png" alt="" />

									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleFileChange(e, "backdrop")}
										required
									/>
									<h4>
										{movieFiles.backdrop
											? movieFiles.backdrop.name
											: "Upload Backdrop"}
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
											<button type="button">select a file</button>
										</div>
									)}
									{movieFiles.backdrop && (
										<div className={styles.upBtn}>
											<button
												type="button"
												style={{
													position: "relative",
													zIndex: "4",
													borderRadius: "4px",
												}}
												disabled={backDetails.disable}
												onClick={() => {
													uploadToDb(movieFiles.backdrop, "backdrops");
												}}
											>
												{backDetails.progress
													? `${backDetails.progress}%`
													: "Upload Backdrop"}
											</button>
										</div>
									)}
								</>
							)}
						</div>

						{/* Movie File Upload */}

						{/* Submit Button */}
						<button type="submit">
							{loading ? "Fetching Details..." : "Add Movie"}
						</button>
					</>
				)}
			</form>
		</div>
	);
};

export default Upload;
