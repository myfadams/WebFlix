import React from 'react'
import styles from "./overview.module.css"

import { Rating } from '@mui/material';
function Overview({Descprition,releaseDate,cast,genres,directior}) {
    const movieLanguages = [
			"English",
			"Spanish",
			"French",
			"Mandarin",
			"Hindi",
		];
  return (
		<div className={styles.mainOver}>
			<div className={styles.overDesc}>
				<h4>Description</h4>
				<p>
					Years after retiring from their formidable ninja lives, a
					dysfunctional family must return to shadowy missions to counteract a
					string of looming threats.
				</p>

				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/calender.png" alt="" />
						Release Year 2024
					</div>
				</div>
				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/lang.png" alt="" />
						Available Languages
					</div>
				</div>
				<div className={styles.lang}>
					{movieLanguages.map((language, id) => (
						<div>{language}</div>
					))}
				</div>

				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/Star.png" alt="" />
						Ratings
					</div>
				</div>
				<div className={styles.rating}>
					<div>
						<h4>IMDB</h4>
						<Rating
							name="rating"
							// defaultValue={2.5}
							value={4}
							precision={0.5}
							readOnly
							style={{ color: "var(--primary-btn)" }}
							size="small"
						/>
					</div>
					<div>
						<h4>MovieHaven</h4>
						<Rating
							name="rating"
							// defaultValue={2.5}
							value={4.5}
							precision={0.5}
							readOnly
							style={{ color: "var(--primary-btn)" }}
							size="small"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Overview
