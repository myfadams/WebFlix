import React, { useEffect, useState } from "react";
import DropDown from "../components/input/DropDown";
import styles from "./upload.module.css";
import fetchMovieDetails, { fetchShowDetails } from "../firebase/tmdb";
import uploadFiles from "../firebase/upload";
import LoadingSpinner from "../components/LoadingSpinner";
import addFilm from "../firebase/database";

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
	useEffect(() => {
		window.scroll(0, 0);
	}, []);
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
		crew: [],
		rating: "",
		trailer: "",
		posterLink: "", // Local file upload
		backdropLink: "", // Local file upload
		movieLink: "", // Movie file upload
	});
	const [seriesData, setSeriesData] = useState({
		name: "",
		genres: [],
		language: "",
		director: "",
		cast: [],
		crew: [],
		showReleaseDate: "",
		rating: "",
		numberOfSeasons:"",
		trailer: "",
		posterLink: "",
		backdropLink: "",
		totalRuntime: "",
		seasonDetails: {
			seasonNumber: "",
			episodeDetails: {
				episodeNo: "",
				title: "",
				overview: "",
				runtime: "",
				airDate: "",
				stillPath: "",
				episodeLink: "",
			},
		},
	});
	const [castInfo, setCastInfo] = useState();
	const [loading, setLoading] = useState(false);
	const [addingMovie, setAddingMovie]=useState(false)
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
				
				if (selected === "movies")
					setMovieData((prev) => {
						return { ...prev, movieLink: fileUrl };
					});
				else
					setSeriesData((prev) => {
						return { ...prev, seasonDetails:{...prev.seasonDetails,episodeDetails:{...prev.seasonDetails.episodeDetails,episodeLink:fileUrl}} };
					});
			});
			// setMovDetails({ ...movDetails, disable: false });
		}
		if (type === "poster") {
			setPosDetails({ ...posDetails, disable: true });
			uploadFiles(file, type, setPosDetails).then((fileUrl) => {
				console.log(fileUrl);
				
				if (selected === "movies")
					setMovieData((prev) => {
						return { ...prev, posterLink: fileUrl };
					});
				else
					setSeriesData((prev) => {
						return { ...prev, posterLink: fileUrl };
					});
			});
			// setPosDetails({ ...posDetails, disable: false });
		}
		if (type === "backdrops") {
			setBackDetails({ ...backDetails, disable: true });
			uploadFiles(file, type, setBackDetails).then((fileUrl) => {
				console.log(fileUrl);
				if(selected==="movies")
					setMovieData((prev) => {
						return { ...prev, backdropLink: fileUrl };
					});
				else
					setSeriesData((prev) => {
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
	const [selected, setSelected] = useState("movies");
	const handleChange = (event) => {
		setSelected(event.target.value);
		// onSelect(event.target.value);
	};
	// console.log(seriesData)
	return (
		<div className={styles.mainFor}>
			{addingMovie&&<div className={styles.over}>
				<LoadingSpinner/>
				<h4>Adding movie</h4>
			</div>}
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
			<div className={styles.UploadForm}>
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
						value={selected === "movies" ? movieData.title : seriesData.name}
						onChange={(e) => {
							if (selected === "movies") {
								setMovieData({ ...movieData, title: e.target.value });
							} else {
								setSeriesData({ ...seriesData, name: e.target.value });
							}
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter" && selected === "movies")
								fetchMovieDetails(
									movieData.title,
									setLoading,
									setCastInfo,
									setMovieData
								);
						}}
						placeholder={
							selected == "movies" ? "Enter movie title" : "Enter show title"
						}
						required
						style={{ width: "100%" }}
						className={styles.upInp}
					/>
				</div>
				<div className={styles.radio}>
					<label>
						<input
							type="radio"
							name="mediaType"
							value="movies"
							checked={selected === "movies"}
							onChange={handleChange}
						/>
						<span>Movies</span>
					</label>
					<label>
						<input
							type="radio"
							name="mediaType"
							value="tvshows"
							checked={selected === "tvshows"}
							onChange={handleChange}
						/>
						<span>TV Shows</span>
					</label>
				</div>
				{selected === "tvshows" && (
					<>
						<input
							type="number"
							value={seriesData.seasonDetails.seasonNumber}
							onChange={(e) =>
								setSeriesData({
									...seriesData,
									seasonDetails: {
										...seriesData.seasonDetails,
										seasonNumber: e.target.value,
									},
								})
							}
							required
							placeholder="Season number"
							className={styles.upInp}
							min={1}
						/>
						<input
							type="number"
							value={seriesData.seasonDetails.episodeDetails.episodeNo}
							onChange={(e) =>
								setSeriesData({
									...seriesData,
									seasonDetails: {
										...seriesData.seasonDetails,
										episodeDetails: {
											...seriesData.seasonDetails.episodeDetails,
											episodeNo: e.target.value,
										},
									},
								})
							}
							required
							placeholder="Episode number"
							className={styles.upInp}
							min={1}
							onKeyDown={(event) => {
								if (event.key === "Enter" && selected !== "movies")
									fetchShowDetails(
										seriesData.name,
										seriesData.seasonDetails.seasonNumber,
										seriesData.seasonDetails.episodeDetails.episodeNo,
										setCastInfo,
										setSeriesData,
										setLoading
									);
							}}
						/>

						<input
							type="text"
							value={seriesData.seasonDetails.episodeDetails.title}
							onChange={(e) =>
								setSeriesData({
									...seriesData,
									seasonDetails: {
										...seriesData.seasonDetails,
										episodeDetails: {
											...seriesData.seasonDetails.episodeDetails,
											title: e.target.value,
										},
									},
								})
							}
							required
							placeholder="Episode Title"
							className={styles.upInp}
							min={1}
						/>
					</>
				)}
				{((!loading && movieData.title.trim() != "") ||
					(!loading && seriesData.name != "")) && (
					<>
						<div className={styles.fileField}>
							<>
								<img src="./uploadBG.png" alt="" />

								<input
									type="file"
									accept="video/*"
									onChange={(e) => handleFileChange(e, "movieFile")}
									required
									disabled={movDetails.disable}
								/>
								<h4>
									{movieFiles.movieFile
										? movieFiles.movieFile.name
										: selected == "movies"
										? "Upload Movie"
										: "Upload Episode"}
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
												: selected == "movies"
												? "Upload Movie"
												: "Upload Episode"}
										</button>
									</div>
								)}
							</>
						</div>

						<textarea
							value={
								selected === "movies"
									? movieData.description
									: seriesData.seasonDetails.episodeDetails.overview
							}
							onChange={(e) => {
								if (selected === "movies")
									setMovieData({ ...movieData, description: e.target.value });
								else
									setSeriesData({
										...seriesData,
										seasonDetails: {
											...seriesData.seasonDetails,
											episodeDetails: {
												...seriesData.seasonDetails.episodeDetails,
												overview: e.target.value,
											},
										},
									});
							}}
							placeholder={
								selected == "movies" ? "Movie synopsis" : "Episode overview"
							}
							required
						/>

						<input
							type="date"
							value={
								selected === "movies"
									? movieData.releaseDate
									: seriesData.seasonDetails.episodeDetails.airDate
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({
											...movieData,
											releaseDate: e.target.value,
										});
									else
										setSeriesData({
											...seriesData,
											seasonDetails: {
												...seriesData.seasonDetails,
												episodeDetails: {
													...seriesData.seasonDetails.episodeDetails,
													airDate: e.target.value,
												},
											},
										});
								}
								// setMovieData({ ...movieData, releaseDate: e.target.value })
							}
							required
							placeholder="Release Date"
							pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"
							className={styles.upInp}
							// style={{width:"200px" }}
						/>

						<input
							type="number"
							value={
								selected === "movies"
									? movieData.runtime
									: seriesData.seasonDetails.episodeDetails.runtime
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({ ...movieData, runtime: e.target.value });
									else
										setSeriesData({
											...seriesData,
											seasonDetails: {
												...seriesData.seasonDetails,
												episodeDetails: {
													...seriesData.seasonDetails.episodeDetails,
													runtime: e.target.value,
												},
											},
										});
								}
								// setMovieData({ ...movieData, runtime: e.target.value })
							}
							required
							placeholder="Runtime (minutes)"
							className={styles.upInp}
						/>

						{/* Genres */}
						<DropDown
							list={genreOptions}
							setValue={selected === "movies" ? setMovieData : seriesData}
							values={selected === "movies" ? movieData : seriesData}
							type={selected}
						/>
						<input
							type="text"
							value={
								selected === "movies" ? movieData.language : seriesData.language
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({ ...movieData, language: e.target.value });
									else
										setSeriesData({
											...seriesData,
											language: e.target.value,
										});
								}
								// setMovieData({ ...movieData, language: e.target.value })
							}
							required
							className={styles.upInp}
							placeholder="Language"
						/>

						<input
							type="text"
							value={
								selected === "movies"
									? movieData.director
									: seriesData.director?.name || ""
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({ ...movieData, director: e.target.value });
									else
										setSeriesData({
											...seriesData,
											director: e.target.value,
										});
								}
								// setMovieData({ ...movieData, director: e.target.value })
							}
							className={styles.upInp}
							placeholder="Director"
						/>

						<input
							type="text"
							value={
								selected === "movies"
									? movieData.cast.map(({ name }) => name)
									: seriesData.cast.map(({ name }) => name)
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({
											...movieData,
											cast: e.target.value.split(", "),
										});
									else
										setSeriesData({
											...seriesData,
											cast: e.target.value.split(", "),
										});
								}
								// setMovieData({
								// 	...movieData,
								// 	cast: e.target.value.split(", "),
								// })
							}
							className={styles.upInp}
							placeholder="Top five cast"
						/>

						<input
							type="number"
							step="0.1"
							max={10}
							min={1}
							value={
								selected === "movies" ? movieData.rating : seriesData.rating
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({ ...movieData, rating: e.target.value });
									else
										setSeriesData({
											...seriesData,
											rating: e.target.value,
										});
								}
								// setMovieData({ ...movieData, rating: e.target.value })
							}
							className={styles.upInp}
							placeholder="IMDb Rating"
						/>

						<input
							type="url"
							value={
								selected === "movies" ? movieData.trailer : seriesData.trailer
							}
							onChange={
								(e) => {
									if (selected === "movies")
										setMovieData({ ...movieData, trailer: e.target.value });
									else
										setSeriesData({
											...seriesData,
											trailer: e.target.value,
										});
								}
								// setMovieData({ ...movieData, trailer: e.target.value })
							}
							className={styles.upInp}
							placeholder="URL for movie trailer"
						/>

						<div className={styles.fileField}>
							{movieData.posterLink ||
							seriesData.seasonDetails.episodeDetails.stillPath ? (
								<img
									src={
										selected === "movies"
											? movieData.posterLink
											: seriesData.seasonDetails.episodeDetails.stillPath
									}
									alt=""
								/>
							) : (
								<>
									<img src="./uploadImg.png" alt="" />

									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleFileChange(e, "poster")}
										required
										disabled={posDetails.disable}
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
							{movieData.backdropLink || seriesData.backdropLink ? (
								<img
									src={
										selected === "movies"
											? movieData.backdropLink
											: seriesData.backdropLink
									}
									style={{ width: "55%" }}
								/>
							) : (
								<>
									<img src="./uploadImg.png" alt="" />

									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleFileChange(e, "backdrop")}
										required
										disabled={backDetails.disable}
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
						<button
							type="button"
							onClick={() => {
								setAddingMovie(true);
								if (selected === "movies") {
									addFilm(selected, movieData).then(() => {
										
										setMovDetails({
											disable: false,
											progress: null,
										});
										setPosDetails({
											disable: false,
											progress: null,
										});
										setBackDetails({
											disable: false,
											progress: null,
										});
										setMovieFiles({
											movieFile: null,
											poster: null,
											backdrop: null,
										});
										setMovieData({
											title: "",
											description: "",
											releaseDate: "",
											runtime: "",
											genres: [],
											language: "",
											director: "",
											cast: [],
											crew: [],
											rating: "",
											trailer: "",
											posterLink: "", // Local file upload
											backdropLink: "", // Local file upload
											movieLink: "", // Movie file upload
										});
									}).finally(()=>{
										setAddingMovie(false);
									});
								} else {
									addFilm(selected, seriesData)
										.then(() => {
											setMovDetails({
												disable: false,
												progress: null,
											});
											setPosDetails({
												disable: false,
												progress: null,
											});
											setBackDetails({
												disable: false,
												progress: null,
											});
											setMovieFiles({
												movieFile: null,
												poster: null,
												backdrop: null,
											});
											setSeriesData({
												name: "",
												genres: [],
												language: "",
												director: "",
												cast: [],
												crew: [],
												showReleaseDate: "",
												rating: "",
												numberOfSeasons: "",
												trailer: "",
												posterLink: "",
												backdropLink: "",
												totalRuntime: "",
												seasonDetails: {
													seasonNumber: "",
													episodeDetails: {
														episodeNo: "",
														title: "",
														overview: "",
														runtime: "",
														airDate: "",
														stillPath: "",
														episodeLink: "",
													},
												},
											});
										})
										.finally(() => {
											setAddingMovie(false);
										});
								}
								// alert("Added to database")
							}}
							disabled={addingMovie}
							className={styles.addBtn}
						>
							{loading ? "Fetching Details..." : "Add Movie"}
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Upload;
