import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./details.module.css"
import Popular from "../components/home/Popular";
import Overview from "../components/details/Overview";
import TrailerReview from "../components/details/TrailerReview";
function Details() {
	const location = useLocation();
	const userData = location?.state.userData;
	console.log(userData);
	useEffect(()=>{
		window.scroll(0,0)
	},[])
	const [current,setCurrent]=useState("overview")
	return (
		<div>
			<div className={styles.mainDetails}>
				<img
					src="/temp-bg.png"
					alt="movie cover picture"
					style={{
						width: "100%",
						objectFit: "cover",
						position: "absolute",
						zIndex: "-1000",
						// height: "100%",
						// opacity: "0.4",
						height: "100%",
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
				<Popular type={"details"} />
			</div>

			<div className={styles.mainDesc}>
				<div className={styles.descNav}>
					<button
						className={current == "overview" && styles.isActive}
						onClick={() => {
							setCurrent("overview");
						}}
					>
						Overview <span></span>
					</button>
					<button
						className={current == "trailer" && styles.isActive}
						onClick={() => {
							setCurrent("trailer");
						}}
					>
						Trailers & More <span></span>
					</button>
					<button
						className={current == "episode" && styles.isActive}
						onClick={() => {
							setCurrent("episode");
						}}
					>
						Episodes<span></span>
					</button>
					<button
						className={current == "more" && styles.isActive}
						onClick={() => {
							setCurrent("more");
						}}
					>
						More Like This<span></span>
					</button>
				</div>
				{current === "overview" && <Overview />}
				{current === "trailer"&&<TrailerReview/>}
			</div>
		</div>
	);
}

export default Details;
