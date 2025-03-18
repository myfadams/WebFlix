import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./details.module.css";
import Popular from "../components/home/Popular";
import Overview from "../components/details/Overview";
import TrailerReview from "../components/details/TrailerReview";
import PopUp from "../components/popup/PopUp";
import Episodes from "../components/details/Episodes";
import { useAuth } from "../context/Context";
function Details() {
	const location = useLocation();
	const film = location?.state?.filmObj;
	const seasons = location?.state?.seasons;
	const typeOfFilm = location?.state?.typeOfFilm;
	const [showReview, setShowReveiw] = useState(false);
	const { user} = useAuth();
	const navigate=useNavigate()

	
	useEffect(() => {
		window.scroll(0, 0);
		if(!user){
			navigate("/login",{replace:true})
		}
	}, []);
	const [current, setCurrent] = useState("overview");
	const [newReview, setNewRewiew] = useState(null);
	
	return (
		<div>
			<PopUp
				isOpen={showReview}
				setDet={setNewRewiew}
				onClose={() => {
					setShowReveiw(false);
					// Details;
				}}
				type={"review"}
				filmName={film?.name || film?.title}
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
				<HomeNavBar />
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
						film={film?.name || film?.title}
					/>
				)}
				{current === "trailer" && (
					<TrailerReview
						setShowReveiw={setShowReveiw}
						newReview={newReview}
						trailer={film?.trailer}
						film={film?.name || film?.title}
					/>
				)}
				{current === "episode" && <Episodes seasons={seasons} />}
			</div>
		</div>
	);
}

export default Details;
