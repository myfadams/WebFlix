import React from 'react'
import styles from "../common/commonstyles.module.css";
function Genre({genreName,top10}) {
     const videos = [
			{ link: "./temp/movie.png" },
			{ link: "./temp/movie.png" },
			{ link: "./temp/movie.png" },
			{ link: "./temp/movie.png" },]
  return (
		<div
			style={{
				backgroundColor: "#1F0725",
				// border:"1px solid var(--primary-btn)",
				borderRadius: "5px",
				padding: "0.7rem",
			}}
			className={styles.movieCard}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "5px",
					// opacity: "0.7",
				}}
			>
				<img
					src="./temp/Image.png"
					alt=""
					style={{
						width: "5rem",
						height: "5rem",
						objectFit: "cover",
						borderRadius: "5px",
					}}
				/>
				<img
					src="./temp/Image1.png"
					alt=""
					style={{
						width: "5rem",
						height: "5rem",
						objectFit: "cover",
						borderRadius: "5px",
					}}
				/>
				<img
					src="./temp/Image2.png"
					alt=""
					style={{
						width: "5rem",
						height: "5rem",
						objectFit: "cover",
						borderRadius: "5px",
					}}
				/>
				<img
					src="./temp/Image3.png"
					alt=""
					style={{
						width: "5rem",
						height: "5rem",
						objectFit: "cover",
						borderRadius: "5px",
					}}
				/>
			</div>
			{top10&&<div
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
			</div>}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<p style={{ fontSize: "1rem" , margin:"10px 0"}}>{genreName}</p>
				<div style={{ backgroundColor: "transparent" }}>
					<img
						src="./rightArr.png"
						alt=""
						style={{ width: "1rem", height: "1rem" }}
					/>
				</div>
			</div>
		</div>
	);
}

export default Genre
