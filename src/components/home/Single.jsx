import React, { useState } from "react";
import styles from "../common/commonstyles.module.css";
import { useNavigate } from "react-router-dom";
import formatViews, { formatDate, formatRuntime } from "../../commonJs/common";
function Single({
	views,
	watchTime,
	releaseDate,
	top10,
	imgUrl,
	show,
	seasons,
	newRe,
	title,
	movieId,
	userData, detObj
}) {
	const navigate = useNavigate();
	const [disable,setDisable]=useState(false)
	console.log(detObj)
	return (
		<button
			style={{
				backgroundColor: "#1F0725",
				borderRadius: "5px",
				padding: "0.7rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				color:"white"
			}}
			className={styles.movieCard}
			onClick={() => {
				setDisable(true)
				if(!show){
					navigate(`/details/${title || detObj?.title || detObj?.name}`, {
						state: {
							isShow: show,
							seasons,
							userData,
							filmObj: detObj,
							typeOfFilm: "movie",
						},
					});
				}else{
					navigate(`/details/${title || detObj?.title || detObj?.name}`, {
						state: {
							isShow: show,
							seasons: detObj?.seasons.filter((season) => season !== null),
							userData,
							filmObj: detObj,
							typeOfFilm: "shows",
						},
					});
				}
				setDisable(false)
			}}
			disabled={disable}
			
		>
			<div style={{}}>
				<img
					src={imgUrl}
					alt=""
					style={{
						width: "9rem",
						height: "12rem",
						objectFit: "cover",
						borderRadius: "5px",
					}}
				/>
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
			{!newRe && (
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						margin: "0.3rem 0 0.2rem ",
						width: "100%",
					}}
				>
					<div
						style={{
							backgroundColor: "#000",
							padding: "7px",
							borderRadius: "50px",
							display: "flex",
							alignItems: "center",
							gap: "4px",
						}}
					>
						<>
							<img
								src="/time.png"
								alt=""
								style={{ width: "0.6rem", height: "0.6rem" }}
							/>
							<p style={{ fontSize: "0.6rem" }}>{formatRuntime(watchTime)}</p>
						</>
					</div>
					<div
						style={{
							backgroundColor: "#000",
							padding: "7px",
							borderRadius: "50px",
							display: "flex",
							alignItems: "center",
							gap: "4px",
						}}
					>
						{!show && (
							<>
								<img
									src="/Union.png"
									alt=""
									style={{ width: "0.6rem", height: "0.6rem" }}
								/>
								<p style={{ fontSize: "0.6rem" }}>{formatViews(views)}</p>
							</>
						)}

						{show && (
							<>
								<img
									src="/showIcon.png"
									alt=""
									style={{ width: "0.6rem", height: "0.6rem" }}
								/>
								<p style={{ fontSize: "0.6rem" }}>Seasons: {seasons}</p>
							</>
						)}
					</div>
				</div>
			)}
			{newRe && (
				<div
					style={{
						fontSize: "0.6rem",
						backgroundColor: "#000",
						padding: "5px",
						borderRadius: "50px",
						textAlign: "center",
					}}
				>
					release at {formatDate(releaseDate)}{" "}
				</div>
			)}
		</button>
	);
}

export default Single;
