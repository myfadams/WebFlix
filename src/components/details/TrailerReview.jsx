// https://www.youtube.com/watch?v=gaDl_i80PYU

import React, { useEffect, useRef, useState } from "react";
import styles from "./trailer.module.css";
import { Rating } from "@mui/material";
function TrailerReview({ trailer }) {
	const [shouldPlay, setShouldPlay] = useState(false);
	const [hover, setHover] = useState(true);
	const [s, setS] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const vidRef = useRef(null);
    const [showReview,setShowReveiw]=useState(false)
	const [reviews, setReviews] = useState([
		{
			name: "Nhyira",
			from: "New York, USA",
			review:
				"An absolutely fantastic movie with stunning visuals and a gripping story! The cinematography was breathtaking, and the performances were top-notch. I was fully engaged from start to finish.",
			rating: 4.5,
		},
		{
			name: "Leonard",
			from: "London, UK",
			review:
				"Great performances, but the pacing felt a bit slow in some parts. While the first half kept me hooked, I felt that the middle dragged on a bit too long. However, the emotional depth of the characters made up for it.",
			rating: 3.8,
		},
		{
			name: "Carlos Rodriguez",
			from: "Madrid, Spain",
			review:
				"A masterpiece! The cinematography and soundtrack were top-notch. Every scene felt carefully crafted, and the background score perfectly complemented the mood of the film. Easily one of the best movies I’ve watched in recent years!",
			rating: 5.0,
		},
		{
			name: "Emily Davis",
			from: "Toronto, Canada",
			review:
				"Enjoyable, but I felt the ending was a bit rushed. The build-up was fantastic, but the resolution felt too quick. I would have loved to see more character development towards the conclusion. Still, it's worth watching!",
			rating: 3.5,
		},
		{
			name: "Kofi Mensah",
			from: "Accra, Ghana",
			review:
				"A solid movie with great action scenes and a compelling plot. The fight choreography was intense, and the special effects were well done. I also appreciated the strong character arcs that kept me invested throughout.",
			rating: 4.2,
		},
	]);

	const play = () => {
		setShouldPlay(!shouldPlay);
		if (shouldPlay) vidRef.current.play();
		else vidRef.current.pause();
	};
    const sliderRef=useRef(null);
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
					<button onClick={()=>{setShowReveiw(true)}}>
						<img src="/Plus.png" alt="" srcset="" />
						Add Your Review
					</button>
				</div>
				<div className={styles.revDiv} ref={sliderRef}>
					{reviews.map((review, id) => (
						<div key={id}>
							<div className={styles.revHead}>
								<div>
									<p>{review.name}</p>
									<p> from {review.from}</p>
								</div>
								<div>
									<Rating
										name="rating"
										// defaultValue={2.5}
										value={review.rating}
										precision={0.1}
										readOnly
										style={{ color: "var(--primary-btn)" }}
										size="small"
									/>
									<span>{review.rating}</span>
								</div>
							</div>
							<div>
								<p>{review.review}</p>
							</div>
						</div>
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
