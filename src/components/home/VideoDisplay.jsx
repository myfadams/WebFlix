import React, { useRef } from 'react'
import styles from "./regular.module.css"
import Genre from './Genre';
import Single from './Single';
import { movieGenres, movies, newReleases, shows } from '../../commonJs/common';
function VideoDisplay({ heading, top10,single,tvShow,newRelease, userData }) {
	
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
								<Genre genreName={name} key={id} top10={top10} userData={userData}/>
							))}
						</>
					)}

					{single && !tvShow && (
						<>
							{movies.map(
								(
									{ imageUrl, views, runtime, title, releaseDate, id: movieId },
									id
								) => (
									<Single
										imgUrl={imageUrl}
										releaseDate={releaseDate}
										watchTime={runtime}
										views={views}
										show={tvShow}
										key={id}
										title={title}
										movieId={movieId}
										userData={userData}
									/>
								)
							)}
						</>
					)}
					{single && tvShow && !newRelease && (
						<>
							{shows.map(
								(
									{
										imageUrl,
										views,
										totalWatchTime,
										title,
										releaseDate,
										seasons,
										id: movieId,
									},
									id
								) => (
									<Single
										imgUrl={imageUrl}
										releaseDate={releaseDate}
										watchTime={totalWatchTime}
										views={views}
										show={tvShow}
										seasons={seasons}
										key={id}
										title={title}
										movieId={movieId}
										userData={userData}
									/>
								)
							)}
						</>
					)}

					{single && tvShow && newRelease && (
						<>
							{newReleases.map(
								(
									{
										imageUrl,
										views,
										totalWatchTime,
										title,
										releaseDate,
										seasons,
										id: movieId,
									},
									id
								) => (
									<Single
										imgUrl={imageUrl}
										releaseDate={releaseDate}
										watchTime={totalWatchTime}
										views={views}
										show={tvShow}
										seasons={seasons}
										key={id}
										newRe={newRelease}
										title={title}
										movieId={movieId}
										userData={userData}
									/>
								)
							)}
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

export default VideoDisplay
