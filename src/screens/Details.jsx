import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./details.module.css";
import Popular from "../components/home/Popular";
import Overview from "../components/details/Overview";
import TrailerReview from "../components/details/TrailerReview";
import PopUp from "../components/popup/PopUp";
import Episodes from "../components/details/Episodes";
function Details() {
	const location = useLocation();
	const userData = location?.state.userData;
	const film = location?.state?.filmObj;
	const seasons = location?.state?.seasons;
	const typeOfFilm = location?.state?.typeOfFilm;
	const [showReview, setShowReveiw] = useState(false);

	const [reviews, setReviews] = useState([
		{
			name: "Nhyira",
			from: "New York, USA",
			review:
				"An absolutely fantastic movie with stunning visuals and a gripping story! The cinematography was breathtaking, and the performances were top-notch. I was fully engaged from start to finish.",
			rating: 4.5,
			likes: 100,
		},
		{
			name: "Leonard",
			from: "London, UK",
			review:
				"Great performances, but the pacing felt a bit slow in some parts. While the first half kept me hooked, I felt that the middle dragged on a bit too long. However, the emotional depth of the characters made up for it.",
			rating: 3.8,
			likes: 17,
		},
		{
			name: "Carlos Rodriguez",
			from: "Madrid, Spain",
			review:
				"A masterpiece! The cinematography and soundtrack were top-notch. Every scene felt carefully crafted, and the background score perfectly complemented the mood of the film. Easily one of the best movies I’ve watched in recent years!",
			rating: 5.0,
			likes: 20000,
		},
		{
			name: "Emily Davis",
			from: "Toronto, Canada",
			review:
				"Enjoyable, but I felt the ending was a bit rushed. The build-up was fantastic, but the resolution felt too quick. I would have loved to see more character development towards the conclusion. Still, it's worth watching!",
			rating: 3.5,
			likes: 15300,
		},
		{
			name: "Kofi Mensah",
			from: "Accra, Ghana",
			review:
				"A solid movie with great action scenes and a compelling plot. The fight choreography was intense, and the special effects were well done. I also appreciated the strong character arcs that kept me invested throughout.",
			rating: 4.2,
			likes: 200000,
		},
	]);
	console.log(userData);
	useEffect(() => {
		window.scroll(0, 0);
		// return ()=>{
		// 	window.scroll(0, 0);
		// }
	}, []);
	const [current, setCurrent] = useState("overview");
	const [newReview, setNewRewiew] = useState(null);
	useEffect(() => {
		if (newReview) setReviews([newReview, ...reviews]);
		console.log(newReview);
	}, [newReview]);
	return (
		<div>
			<PopUp
				isOpen={showReview}
				setDet={setNewRewiew}
				onClose={() => {
					setShowReveiw(false);
					Details;
				}}
				type={"review"}
			/>
			<div className={styles.mainDetails}>
				<img
					src={film?.backdropLink || "/temp-bg.png"}
					alt="movie cover picture"
					style={{
						width: "100%",
						objectFit: "cover",
						position: "absolute",
						zIndex: "-1000",
						// height: "100%",
						// opacity: "0.4",
						height: "100%",
						objectPosition: "center",
					}}
				/>
				<div
					style={{
						width: "100%",
						objectFit: "cover",
						position: "absolute",
						zIndex: "-1",
						backgroundColor: "rgba(0,0,0,0.5)",
						height: "100%",
					}}
				></div>
				<HomeNavBar userDetails={userData} />
				<Popular type={"details"} filmObj={film} />
			</div>

			<div className={styles.mainDesc}>
				<div className={styles.descNav}>
					<button
						className={current == "overview" ? styles.isActive : ""}
						onClick={() => {
							setCurrent("overview");
						}}
					>
						Overview <span></span>
					</button>
					<button
						className={current == "trailer" ? styles.isActive : ""}
						onClick={() => {
							setCurrent("trailer");
						}}
					>
						Trailers & More <span></span>
					</button>
					{typeOfFilm !== "movie" && (
						<button
							className={current == "episode" ? styles.isActive : ""}
							onClick={() => {
								setCurrent("episode");
							}}
						>
							Episodes<span></span>
						</button>
					)}
					<button
						className={current == "more" ? styles.isActive : ""}
						onClick={() => {
							setCurrent("more");
						}}
					>
						More Like This<span></span>
					</button>
				</div>
				{current === "overview" && (
					<Overview
						descprition={film?.description}
						cast={film?.cast}
						director={film?.director}
						genres={film?.genres}
						releaseDate={film?.releaseDate}
						fType={typeOfFilm}
						fCrew={film?.crew?.slice(0, 4)}
						movieGenre={film?.genres}
						lang={[film?.language]}
						movieRating={film?.rating}
					/>
				)}
				{current === "trailer" && (
					<TrailerReview
						setShowReveiw={setShowReveiw}
						newReview={newReview}
						dataR={reviews}
						trailer={film?.trailer}
					/>
				)}
				{current === "episode" && <Episodes seasons={seasons} />}
			</div>
		</div>
	);
}

export default Details;
