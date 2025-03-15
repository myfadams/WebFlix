// https://www.youtube.com/watch?v=gaDl_i80PYU

import React, { useEffect, useRef, useState } from "react";
import styles from "./trailer.module.css";
import { Rating } from "@mui/material";
import ReviewBox from "./ReviewBox";
import { convertToEmbedURL } from "../../commonJs/common";
function TrailerReview({ trailer, setShowReveiw,newReview,dataR }) {
	console.log(trailer)
	const [shouldPlay, setShouldPlay] = useState(false);
	const [hover, setHover] = useState(true);
	const [s, setS] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const vidRef = useRef(null);
    const [reviews, setReviews] = useState(dataR)
   useEffect(()=>{
    setReviews(dataR)
   },[dataR])
	const play = () => {
		setShouldPlay(!shouldPlay);
		if (shouldPlay) vidRef.current.play();
		else vidRef.current.pause();
	};
	const sliderRef = useRef(null);
	const scroll = (direction) => {
		if (sliderRef.current) {
			const scrollAmount = 100;
			sliderRef.current.scrollLeft +=
				direction === "left" ? -scrollAmount : scrollAmount;
		}
	};
	return (
		<div className={styles.mainTandR}>
			<div className={styles.tVid}>
				<div className={styles.vidsect}>
					<iframe
						className={styles.trailVid}
						src={
							trailer ? convertToEmbedURL(trailer) : "/temp/404 Not Found.mp4"
						}
						frameborder="0"
					></iframe>
				</div>
			</div>

			<div className={styles.review}>
				<div className={styles.revTit}>
					<h4>Reviews</h4>
					<button
						onClick={() => {
							setShowReveiw(true);
						}}
					>
						<img src="/Plus.png" alt="" srcset="" />
						Add Your Review
					</button>
				</div>
				<div className={styles.revDiv} ref={sliderRef}>
					{reviews.map((review, id) => (
						<ReviewBox review={review} key={id} />
					))}
				</div>
				<div className={styles.revButtons}>
					<button
						onClick={() => {
							scroll("left");
						}}
					>
						<img src="/moveFwd.png" alt="" />
					</button>
					<button
						onClick={() => {
							scroll("right");
						}}
					>
						<img src="/moveBck.png" alt="" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default TrailerReview;
