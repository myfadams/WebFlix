import React, { useRef } from 'react'
import styles from "./regular.module.css"
import Genre from './Genre';
import Single from './Single';
function VideoDisplay({ heading, top10,single,show,newRelease }) {
	const movieGenres = [
		{ id: 1, name: "Action" },
		{ id: 2, name: "Adventure" },
		{ id: 3, name: "Comedy" },
		{ id: 4, name: "Crime" },
		{ id: 5, name: "Drama" },
		{ id: 6, name: "Fantasy" },
		{ id: 7, name: "Historical" },
		{ id: 8, name: "Horror" },
		{ id: 9, name: "Mystery" },
		{ id: 10, name: "Romance" },
		{ id: 11, name: "Sci-Fi" },
		{ id: 12, name: "Thriller" },
		{ id: 13, name: "Western" },
		{ id: 14, name: "Animation" },
		{ id: 15, name: "Documentary" },
	];
	const movies = [
  { id: 1, title: "The Dark Knight", genre: "Action", runtime: 152, views: 2500000, releaseDate: "2008-07-18", imageUrl: "./temp/Image.png" },
  { id: 2, title: "Inception", genre: "Sci-Fi", runtime: 148, views: 3200000, releaseDate: "2010-07-16", imageUrl: "./temp/Image1.png" },
  { id: 3, title: "The Godfather", genre: "Crime", runtime: 175, views: 1800000, releaseDate: "1972-03-24", imageUrl: "./temp/Image2.png" },
  { id: 4, title: "Titanic", genre: "Romance", runtime: 195, views: 4000000, releaseDate: "1997-12-19", imageUrl: "./temp/Image.png" },
  { id: 5, title: "Interstellar", genre: "Sci-Fi", runtime: 169, views: 2900000, releaseDate: "2014-11-07", imageUrl: "./temp/Image1.png" },
  { id: 6, title: "Joker", genre: "Drama", runtime: 122, views: 2200000, releaseDate: "2019-10-04", imageUrl: "./temp/Image2.png" },
  { id: 7, title: "Gladiator", genre: "Historical", runtime: 155, views: 1500000, releaseDate: "2000-05-05", imageUrl: "./temp/Image.png" },
  { id: 8, title: "Avengers: Endgame", genre: "Action", runtime: 181, views: 5000000, releaseDate: "2019-04-26", imageUrl: "./temp/Image1.png" },
  { id: 9, title: "The Conjuring", genre: "Horror", runtime: 112, views: 1700000, releaseDate: "2013-07-19", imageUrl: "./temp/Image2.png" },
  { id: 10, title: "Frozen", genre: "Animation", runtime: 102, views: 3100000, releaseDate: "2013-11-27", imageUrl: "./temp/Image.png" }
];
const shows = [
	{
		id: 1,
		title: "Breaking Bad",
		genre: "Crime",
		seasons: 5,
		views: 4500000,
		totalWatchTime: 3150,
		releaseDate: "2008-01-20",
		imageUrl: "./temp/show1.png",
	}, // 5 seasons * 13 episodes * 45 min
	{
		id: 2,
		title: "Stranger Things",
		genre: "Sci-Fi",
		seasons: 4,
		views: 5200000,
		totalWatchTime: 1800,
		releaseDate: "2016-07-15",
		imageUrl: "./temp/show2.png",
	}, // 4 * 9 * 50 min
	{
		id: 3,
		title: "Game of Thrones",
		genre: "Fantasy",
		seasons: 8,
		views: 6800000,
		totalWatchTime: 4300,
		releaseDate: "2011-04-17",
		imageUrl: "./temp/show3.png",
	}, // 8 * 10 * 54 min
	{
		id: 4,
		title: "The Office",
		genre: "Comedy",
		seasons: 9,
		views: 3900000,
		totalWatchTime: 4500,
		releaseDate: "2005-03-24",
		imageUrl: "./temp/Image.png",
	}, // 9 * 22 * 23 min
	{
		id: 5,
		title: "Money Heist",
		genre: "Crime",
		seasons: 5,
		views: 3100000,
		totalWatchTime: 2400,
		releaseDate: "2017-05-02",
		imageUrl: "./temp/show4.png",
	}, // 5 * 10 * 48 min
	{
		id: 6,
		title: "The Mandalorian",
		genre: "Sci-Fi",
		seasons: 3,
		views: 2700000,
		totalWatchTime: 1200,
		releaseDate: "2019-11-12",
		imageUrl: "./temp/show1.png",
	}, // 3 * 8 * 50 min
	{
		id: 7,
		title: "Friends",
		genre: "Comedy",
		seasons: 10,
		views: 5900000,
		totalWatchTime: 5000,
		releaseDate: "1994-09-22",
		imageUrl: "./temp/show2.png",
	}, // 10 * 24 * 22 min
	{
		id: 8,
		title: "Peaky Blinders",
		genre: "Crime",
		seasons: 6,
		views: 3300000,
		totalWatchTime: 2160,
		releaseDate: "2013-09-12",
		imageUrl: "./temp/Image1.png",
	}, // 6 * 6 * 60 min
	{
		id: 9,
		title: "The Witcher",
		genre: "Fantasy",
		seasons: 3,
		views: 2800000,
		totalWatchTime: 1350,
		releaseDate: "2019-12-20",
		imageUrl: "./temp/show3.png",
	}, // 3 * 8 * 56 min
	{
		id: 10,
		title: "Sherlock",
		genre: "Mystery",
		seasons: 4,
		views: 3500000,
		totalWatchTime: 1440,
		releaseDate: "2010-07-25",
		imageUrl: "./temp/show4.png",
	}, // 4 * 3 * 120 min
];

const newReleases = [
	{
		id: 1,
		title: "The Dark Knight",
		type: "Movie",
		genre: "Action",
		runtime: 152,
		views: 2500000,
		releaseDate: "2008-07-18",
		imageUrl: "./temp/Image1.png",
	},
	{
		id: 2,
		title: "Breaking Bad",
		type: "Show",
		genre: "Crime",
		seasons: 5,
		views: 4500000,
		totalWatchTime: 3150,
		releaseDate: "2008-01-20",
		imageUrl: "./temp/show2.png",
	},
	{
		id: 3,
		title: "Interstellar",
		type: "Movie",
		genre: "Sci-Fi",
		runtime: 169,
		views: 2900000,
		releaseDate: "2014-11-07",
		imageUrl: "./temp/Image2.png",
	},
	{
		id: 4,
		title: "Stranger Things",
		type: "Show",
		genre: "Sci-Fi",
		seasons: 4,
		views: 5200000,
		totalWatchTime: 1800,
		releaseDate: "2016-07-15",
		imageUrl: "./temp/show4.png",
	},
	{
		id: 5,
		title: "Money Heist",
		type: "Show",
		genre: "Crime",
		seasons: 5,
		views: 3100000,
		totalWatchTime: 2400,
		releaseDate: "2017-05-02",
		imageUrl: "./temp/show1.png",
	},
	{
		id: 6,
		title: "Titanic",
		type: "Movie",
		genre: "Romance",
		runtime: 195,
		views: 4000000,
		releaseDate: "1997-12-19",
		imageUrl: "./temp/Image1.png",
	},
	{
		id: 7,
		title: "Game of Thrones",
		type: "Show",
		genre: "Fantasy",
		seasons: 8,
		views: 6800000,
		totalWatchTime: 4300,
		releaseDate: "2011-04-17",
		imageUrl: "./temp/show3.png",
	},
	{
		id: 8,
		title: "Joker",
		type: "Movie",
		genre: "Drama",
		runtime: 122,
		views: 2200000,
		releaseDate: "2019-10-04",
		imageUrl: "./temp/Image.png",
	},
	{
		id: 9,
		title: "Sherlock",
		type: "Show",
		genre: "Mystery",
		seasons: 4,
		views: 3500000,
		totalWatchTime: 1440,
		releaseDate: "2010-07-25",
		imageUrl: "./temp/show2.png",
	},
	{
		id: 10,
		title: "The Witcher",
		type: "Show",
		genre: "Fantasy",
		seasons: 3,
		views: 2800000,
		totalWatchTime: 1350,
		releaseDate: "2019-12-20",
		imageUrl: "./temp/show4.png",
	},
];



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
								<Genre genreName={name} key={id} top10={top10} />
							))}
						</>
					)}

					{single && !show && (
						<>
							{movies.map(
								({ imageUrl, views, runtime, title, releaseDate }, id) => (
									<Single
										imgUrl={imageUrl}
										releaseDate={releaseDate}
										watchTime={runtime}
										views={views}
										show={show}
										key={id}
									/>
								)
							)}
						</>
					)}
					{single && show && !newRelease && (
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
									},
									id
								) => (
									<Single
										imgUrl={imageUrl}
										releaseDate={releaseDate}
										watchTime={totalWatchTime}
										views={views}
										show={show}
										seasons={seasons}
										key={id}
									/>
								)
							)}
						</>
					)}

					{single && show && newRelease && (
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
									},
									id
								) => (
									<Single
										imgUrl={imageUrl}
										releaseDate={releaseDate}
										watchTime={totalWatchTime}
										views={views}
										show={show}
										seasons={seasons}
										key={id}
										newRe={newRelease}
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
