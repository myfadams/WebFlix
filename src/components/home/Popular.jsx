import React, { useState } from "react";
import styles from "./popular.module.css";
import { useNavigate } from "react-router";
function Popular({ title, details, type, user, filmObj }) {
	const [btnHover, setBtnHover] = useState(false);
	const [btnLHover, setBtnLHover] = useState(false);
	const [btnPHover, setBtnPHover] = useState(false);
	const [disable, setDisable] = useState(false);
	const navigate = useNavigate();

	let firstEpUrl;
	let nameEp ;
	if (filmObj?.seasons && Array.isArray(filmObj.seasons)) {
		const firstSeason = filmObj.seasons.find(
			(season) => season && season.episodes?.length > 0
		);

		if (firstSeason) {
			firstEpUrl = firstSeason.episodes[0]?.episodeLink;
			nameEp = firstSeason.episodes[0]?.title;
		}
	}

	return (
		<div className={styles.mainH}>
			<div className={`${styles.bodyDiv} ${type ? styles.bodyDType:""}`}>
				<div className={styles.btnMains}>
					<h1>{filmObj?.title ||filmObj?.name|| "House of Ninjas"}</h1>
					{!type && (
						<p>
							{filmObj?.description ||
								"Years after retiring from their formidable ninja lives, a dysfunctional family must return to shadowy missions to counteract a string of looming threats."}
						</p>
					)}
					<div className={`${styles.buttonsH} ${type ? styles.detH:""}`}>
						{!type && (
							<>
								<button
									onClick={() => {
										setDisable(true);
										navigate(
											`/movie/${
												filmObj?.title || filmObj?.name || "movieWatch"
											}`,
											{
												state: {
													filmUrl:
														filmObj?.movieLink,
													title:
														filmObj?.title,
												},
											}
										);
									}}
								>
									<img src="/Play2.png" alt="" /> Play
								</button>
								<button
									onMouseEnter={() => {
										setBtnHover(true);
									}}
									onMouseLeave={() => {
										setBtnHover(false);
									}}
									onClick={() => {
										navigate(`/details/${filmObj?.title||"HomeMovie"}`, {
											state: { userData: user, filmObj, typeOfFilm:"movie" },
										});
									}}
								>
									<img src={btnHover ? "/Info.png" : "/Info2.png"} alt="" />
									More info
								</button>
							</>
						)}
						{type && (
							<>
								<button
									onClick={() => {
										setDisable(true);
										// console.log(filmObj?.seasons[0]?.episodes[0]?.episodeLink);
										navigate(
											`/movie/${
												filmObj?.title || filmObj.name || "movieWatch"
											}`,
											{
												state: {
													filmUrl:
														firstEpUrl ||
														filmObj?.movieLink,
													title:
														filmObj?.title ||
														nameEp,
												},
											}
										);
									}}
								>
									<img src="/Play2.png" alt="" /> Play
								</button>
								<button
									onMouseEnter={() => {
										setBtnPHover(true);
									}}
									onMouseLeave={() => {
										setBtnPHover(false);
									}}
									className={styles.detBtn}
								>
									<img src={btnPHover ? "/Plus1.png" : "/Plus.png"} alt="" />
								</button>
								<button
									onMouseEnter={() => {
										setBtnLHover(true);
									}}
									onMouseLeave={() => {
										setBtnLHover(false);
									}}
									className={styles.detBtn}
								>
									<img src={btnLHover ? "/like2.png" : "/like.png"} alt="" />
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popular;
