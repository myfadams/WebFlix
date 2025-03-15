import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import HomeNavBar from "../components/navBar/HomeNavBar";
import Popular from "../components/home/Popular";
import styles from "./home.module.css";
import VideoDisplay from "../components/home/VideoDisplay";
import { getMovies } from "../firebase/database";
import LoadingScreen from "../components/LoadingScreen";
import { shows } from "../commonJs/common";
function Home() {
	const location = useLocation();
	const userData = location?.state.user;
	const [movies, setMovies] = useState();
	const [suggestedMovie, setSuggestedMovie] = useState();
	const [isLoading, setIsLoading] = useState(false);
	// console.log(userData)
	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
	useEffect(() => {
		setIsLoading(true);
		function fetchData() {
			getMovies("movies")
				.then((movies) => {
					// console.log(movies);
					setSuggestedMovie(movies[Math.floor(movies.length / 2)]);
					setMovies(movies);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
		if (!movies) fetchData();
	}, []);
	if (isLoading && !movies) return <LoadingScreen title={"Loading..."} />;
	return (
		<div className={styles.mainBodyHome}>
			<img
				src={suggestedMovie?.backdropLink || "./temp-bg.png"}
				alt="movie cover picture"
				style={{
					width: "100%",
					objectFit: "cover",
					position: "absolute",
					zIndex: "-1000",
					// height: "100%",
					// opacity: "0.4",
					height: "39.5rem",
				}}
			/>
			<div
				style={{
					width: "100%",
					objectFit: "cover",
					position: "absolute",
					zIndex: "-1",
					backgroundColor: "rgba(0,0,0,0.5)",
					height: "39.5rem",
				}}
			></div>
			<HomeNavBar userDetails={userData} page={"home"} />
			{/* <h1 style={{fontSize:"2rem", margin:"1rem"}}>Welcome {userData?.name}</h1> */}
			<Popular user={userData} filmObj={suggestedMovie} />
			<div style={{ position: "relative" }}>
				<div className={styles.title}>Movies</div>
				<div className={styles.mov}>
					<VideoDisplay
						heading={"Our Genre"}
						single={false}
						userData={userData}
						filmArray={movies}
					/>
					<VideoDisplay
						single={true}
						heading={"Trending Movies"}
						userData={userData}
						filmArray={movies}
					/>
					<VideoDisplay
						heading={"Popular Top 10 In Genres"}
						top10={true}
						single={false}
						userData={userData}
						filmArray={movies}
						// show={true}
					/>
					<VideoDisplay
						single={true}
						heading={"New Releases"}
						show={true}
						newRelease={true}
						userData={userData}
						filmArray={movies}
					/>
				</div>
			</div>

			<div style={{ position: "relative" }}>
				<div className={styles.title}>Shows</div>
				<div className={styles.mov}>
					<VideoDisplay heading={"Our Genre"} single={false} tvShow={"show"} />
					<VideoDisplay
						single={true}
						heading={"Trending Shows"}
						tvShow={"show"}
					/>
					<VideoDisplay
						heading={"Popular Top 10 In Genres"}
						top10={true}
						single={false}
						tvShow={"show"}
					/>

					<VideoDisplay
						single={true}
						heading={"New Releases"}
						tvShow={"show"}
						newRelease={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
