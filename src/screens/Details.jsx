import React, { useEffect } from "react";
import { useLocation } from "react-router";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./details.module.css"
import Popular from "../components/home/Popular";
import Overview from "../components/details/Overview";
function Details() {
	const location = useLocation();
	const userData = location?.state.userData;
	console.log(userData);
	useEffect(()=>{
		window.scroll(0,0)
	},[])
	return (
		<div >
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
					<button>
						Overview <span></span>
					</button>
					<button>
						Trailers & More <span></span>
					</button>
					<button>
						Episodes<span></span>
					</button>
					<button>
						More Like This<span></span>
					</button>
				</div>
				<Overview />
			</div>
		</div>
	);
}

export default Details;
