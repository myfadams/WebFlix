import React, { useState } from "react";
import styles from "./episodes.module.css";
import commonStyles from "../common/commonstyles.module.css";
import { formatRuntime, seasons } from "../../commonJs/common";
import { useNavigate } from "react-router";

const Episode = ({ season, episodes }) => {
    const [shouldShow, setShouldshow]=useState(false)
	const navigate = useNavigate();
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.seasons}
				onClick={() => {
					setShouldshow(!shouldShow);
				}}
			>
				<span>
					Season {season} Episodes: {episodes?.length}
				</span>
				<button
					className={commonStyles.roundBtns}
					onClick={() => {
						setShouldshow(!shouldShow);
					}}
				>
					<img src={shouldShow ? "/closeDown.png" : "/openUp.png"} alt="" />
				</button>
			</div>
			{shouldShow &&
				episodes.map((episode, id) => (
					<div className={styles.episode} key={id} onClick={()=>{
						navigate(`/movie/${episode?.title}`)
					}}>
						<div style={{display:"flex",justifyContent:"space-between"}}>
							<div className={styles.epThumb}>
								<span>{id + 1}</span>
								<span>
									<span className={styles.thPlay}>
										<img src="/epPlay.png" alt="" />
									</span>
									<img className={styles.thumb} src="/temp/movie.png" alt="" />
								</span>
							</div>
							<div className={styles.mob}>
								<img src="/outlineClock.png" alt="" />
								<span>{formatRuntime(52)}</span>
							</div>
						</div>
						<div>
							<div className={styles.epHead}>
								<div>{episode.title}</div>
								<div>
									<img src="/outlineClock.png" alt="" />
									<span>{formatRuntime(52)}</span>
								</div>
							</div>
							<div className={styles.epBody}>{episode.description}</div>
						</div>
					</div>
				))}
		</div>
	);
};
function Episodes() {
	return (
		<div className={styles.mainEpDiv}>
			<h4>Seasons and Episodes</h4>
			{seasons.map((season, id) => {
				return (
					<Episode episodes={season.episodes} season={season.season} key={id} />
				);
			})}
		</div>
	);
}

export default Episodes;
