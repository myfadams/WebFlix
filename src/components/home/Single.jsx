import React from "react";
import styles from "../common/commonstyles.module.css";
function Single({
	views,
	watchTime,
	releaseDate,
	top10,
	imgUrl,
	show,
	seasons,
	newRe,
}) {
	function formatViews(views) {
		if (views >= 1_000_000) {
			return (views / 1_000_000).toFixed(1) + "M";
		} else if (views >= 1_000) {
			return (views / 1_000).toFixed(1) + "K";
		} else {
			return views.toString();
		}
	}
	function formatRuntime(minutes) {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;

		if (hours > 0 && mins > 0) {
			return `${hours}h ${mins}m`;
		} else if (hours > 0) {
			return `${hours}h`;
		} else {
			return `${mins}m`;
		}
	}
	function formatDate(dateString) {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const date = new Date(dateString);
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	}
	return (
		<div
			style={{
				backgroundColor: "#1F0725",
				borderRadius: "5px",
				padding: "0.7rem",
			}}
			className={styles.movieCard}
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
								src="./time.png"
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
									src="./Union.png"
									alt=""
									style={{ width: "0.6rem", height: "0.6rem" }}
								/>
								<p style={{ fontSize: "0.6rem" }}>{formatViews(views)}</p>
							</>
						)}

						{show && (
							<>
								<img
									src="./showIcon.png"
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
		</div>
	);
}

export default Single;
