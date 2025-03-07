import React from 'react'
import { useLocation } from 'react-router';
import HomeNavBar from '../components/navBar/HomeNavBar';
import Popular from '../components/home/Popular';
import styles from "./home.module.css"
import VideoDisplay from '../components/home/VideoDisplay';
function Home() {
  const location = useLocation();
  const userData=location?.state.user
  // console.log(userData)
  return (
		<div className={styles.mainBodyHome}>
			<img
				src="./temp-bg.png"
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
			<div style={{
					width: "100%",
					objectFit: "cover",
					position: "absolute",
					zIndex: "-1",
					backgroundColor:"rgba(0,0,0,0.5)",
					height: "39.5rem",
				}}
			>

			</div>
			<HomeNavBar userDetails={userData} page={"home"} />
			{/* <h1 style={{fontSize:"2rem", margin:"1rem"}}>Welcome {userData?.name}</h1> */}
			<Popular />
			<div style={{ position: "relative" }}>
				<div className={styles.title}>Movies</div>
				<div className={styles.mov}>
					<VideoDisplay heading={"Our Genre"} single={false} />
					<VideoDisplay single={true} heading={"Trending Movies"} />
					<VideoDisplay
						heading={"Popular Top 10 In Genres"}
						top10={true}
						single={false}
					/>
					<VideoDisplay
						single={true}
						heading={"New Releases"}
						show={true}
						newRelease={true}
					/>
				</div>
			</div>

			<div style={{ position: "relative" }}>
				<div className={styles.title}>Shows</div>
				<div className={styles.mov}>
					<VideoDisplay heading={"Our Genre"} single={false} />
					<VideoDisplay single={true} heading={"Trending Shows"} show={true} />
					<VideoDisplay
						heading={"Popular Top 10 In Genres"}
						top10={true}
						single={false}
					/>

					<VideoDisplay
						single={true}
						heading={"New Releases"}
						show={true}
						newRelease={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home
