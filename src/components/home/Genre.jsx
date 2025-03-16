import React, { useState } from 'react'
import styles from "../common/commonstyles.module.css";
import { useNavigate } from 'react-router-dom';
import { get4Covers, shuffleArray } from '../../commonJs/common';
function Genre({genreName,top10,userData,movies,tvShows ,show}) {
     const coversM = shuffleArray(get4Covers(movies, genreName));
	 const coversS = shuffleArray(get4Covers(tvShows,genreName))
	//  console.log(covers)

	const navigate=useNavigate()
	
	const [disable,setDisable]=useState(false);
  return (
		<button
			style={{
				backgroundColor: "#1F0725",
				// border:"1px solid var(--primary-btn)",
				borderRadius: "5px",
				padding: "0.7rem",
				color: "white",
			}}
			className={styles.movieCard}
			onClick={() => {
				setDisable(true);
				navigate(`/browse/${top10 ? "Top10 " + genreName : genreName}`, {
					state: {
						browseDetails: { top10, genreName, userData },
						filmObj: show ? tvShows : movies,
						show,
						typeSect: "genre",
					},
				});
				setDisable(false);
			}}
			disabled={disable}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "5px",
					// opacity: "0.7",
				}}
			>
				{!show
					? coversM?.map((img) => {
							return (
								<img
									src={img?.posterLink}
									alt=""
									style={{
										width: "5rem",
										height: "5rem",
										objectFit: "cover",
										borderRadius: "5px",
									}}
								/>
							);
					  })
					: coversS?.map((img) => {
							return (
								<img
									src={img?.posterLink}
									alt=""
									style={{
										width: "5rem",
										height: "5rem",
										objectFit: "cover",
										borderRadius: "5px",
									}}
								/>
							);
					  })}
			</div>
			{top10 && (
				<div
					style={{
						fontSize: "0.6rem",
						backgroundColor: "var(--primary-btn)",
						width: "30%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "2px",
						borderRadius: "2px",
						marginTop: "10px",
					}}
				>
					Top 10 In
				</div>
			)}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<p style={{ fontSize: "1rem", margin: "10px 0" }}>{genreName}</p>
				<div style={{ backgroundColor: "transparent" }}>
					<img
						src="./rightArr.png"
						alt=""
						style={{ width: "1rem", height: "1rem" }}
					/>
				</div>
			</div>
		</button>
	);
}

export default Genre
