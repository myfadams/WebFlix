// https://www.youtube.com/watch?v=gaDl_i80PYU

import React, { useEffect, useRef, useState } from "react";
import styles from "./trailer.module.css";
import { Rating } from "@mui/material";
import ReviewBox from "./ReviewBox";
function TrailerReview({ trailer, setShowReveiw,newReview,dataR }) {
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
			<div className={styles.vidsect}>
				<video
					src="/temp/question.mp4"
					className={styles.trailVid}
                    controls={false}
					onClick={() => {
						setS(true);
						play();
					}}
					poster="/temp/movie.png"
					ref={vidRef}
					onEnded={() => {
						setShouldPlay(true);
					}}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseLeave={() => {
						setHover(false);
					}}
                    playsInline
				></video>
				{s && hover && (
					<button
						onClick={play}
						onMouseOver={() => {
							setHover(true);
						}}
					>
						<img src={shouldPlay ? "/Play2.png" : "/pause.png"} alt="" />
					</button>
				)}
				{/* <p>{currentTime} seconds</p> */}
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
						<ReviewBox review={review} key={id}/>
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
