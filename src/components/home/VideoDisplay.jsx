import React, { useEffect, useRef, useState } from "react";
import styles from "./regular.module.css";
import Genre from "./Genre";
import Single from "./Single";
import {
	movieGenres,
	movies,
	newReleases,
	shows,
	shuffleArray,
} from "../../commonJs/common";
import { getMovies, getShows } from "../../firebase/database";
import { useAuth } from "../../context/Context";
function VideoDisplay({
	heading,
	top10,
	single,
	tvShow,
	newRelease,
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [moviesData, setMoviesData] = useState();
	const [showsData, setShowsData] = useState();
	const { user, cachedMovies, setCachedMovies, setCachedShows, cachedShows } =
		useAuth();
	useEffect(() => {
		setIsLoading(true);
		if(cachedMovies||cachedShows){
			if(cachedMovies)
				setMoviesData(shuffleArray(cachedMovies));
			if(cachedShows)
				setShowsData(shuffleArray(cachedShows));
			return;
		}
		getMovies("movies").then((movies) => {
			// console.log(movies);
			setMoviesData(shuffleArray(movies));
			setCachedMovies(movies)
		});
		getShows()
			.then((shows) => {
				// console.log(shows);
				setShowsData(shuffleArray(shows));
				setCachedShows(shows)
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const sliderRef = useRef(null);

	const scroll = (direction) => {
		if (sliderRef.current) {
			const scrollAmount = 100;
			sliderRef.current.scrollLeft +=
				direction === "left" ? -scrollAmount : scrollAmount;
		}
	};
	return (
		<div className={styles.vidArea}>
			<h4>{heading}</h4>
			<div style={{ position: "relative" }} className={styles.hove}>
				<div className={styles.movieFlex} ref={sliderRef}>
					{!single && (
						<>
							{movieGenres.map(({ name }, id) => (
								<Genre
									genreName={name}
									key={id}
									top10={top10}
									
									movies={moviesData}
									tvShows={showsData}
									show={tvShow}
								/>
							))}
						</>
					)}

					{single && !tvShow && (
						<>
							{moviesData?.slice(0, 10)?.map((movie, id) => (
								<Single
									imgUrl={movie?.posterLink}
									releaseDate={movie?.releaseDate}
									watchTime={movie?.runtime}
									views={movie?.views || 0}
									show={tvShow}
									key={id}
									title={movie?.title}
									movieId={movie?.id}
									
									detObj={movie}
								/>
							))}
						</>
					)}
					{single && tvShow && !newRelease && (
						<>
							{showsData?.slice(0, 10)?.map((show, id) => (
								<Single
									imgUrl={show?.posterLink}
									releaseDate={show?.showReleaseDate}
									watchTime={show?.totalRuntime}
									views={show?.views}
									show={tvShow}
									seasons={show?.numberOfSeasons}
									key={id}
									title={show?.name}
									// movieId={movieId}
									
									detObj={show}
								/>
							))}
						</>
					)}

					{single && tvShow && newRelease && (
						<>
							{showsData?.slice(0, 10)?.map((show, id) => (
								<Single
									imgUrl={show?.posterLink}
									releaseDate={show?.showReleaseDate}
									watchTime={show?.totalRuntime}
									views={show?.views}
									show={tvShow}
									seasons={show?.numberOfSeasons}
									key={id}
									title={show?.name}
									
									detObj={show}
								/>
							))}
						</>
					)}
				</div>
				<button
					className={styles.fwd}
					onClick={() => {
						scroll("left");
					}}
				>
					{" "}
					<img src="./back.png" alt="" style={{ width: "13px" }} />
				</button>
				<button
					className={styles.bck}
					onClick={() => {
						scroll("right");
					}}
				>
					{" "}
					<img src="./foward.png" alt="" style={{ width: "13px" }} />
				</button>
			</div>
			{/* <img src="./temp/movie.png" alt=""/> */}
		</div>
	);
}

export default VideoDisplay;
