// https://www.youtube.com/watch?v=gaDl_i80PYU

import React, { useEffect, useRef, useState } from "react";
import styles from "./trailer.module.css";
import { Rating } from "@mui/material";
import ReviewBox from "./ReviewBox";
import LoadingScreen from "../LoadingScreen"
import { convertToEmbedURL } from "../../commonJs/common";
import { retrieveReviews } from "../../firebase/database";
import { useAuth } from "../../context/Context";
function TrailerReview({ trailer, setShowReveiw,newReview,film }) {
	console.log(trailer)
	const { user} = useAuth();
    const [reviews, setReviews] = useState([])
	const [isLoading,setIsLoading]=useState(false);

	useEffect(() => {
		console.log("newReview updated:", newReview);
	}, [newReview]);
   useEffect(()=>{
	setIsLoading(true)
	retrieveReviews(film).then((res)=>{
		setReviews([]);
		setReviews([...res].reverse())
	}).finally(()=>{
		setIsLoading(false)
		// window.location.reload()
	})
    // setReviews(dataR)
   },[newReview,user])
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
						frameBorder={0}
					></iframe>
				</div>
			</div>

			<div className={styles.review}>
				{!isLoading ? (
					<>
						<div className={styles.revTit}>
							<h4>Reviews</h4>
							<button
								onClick={() => {
									setShowReveiw(true);
								}}
							>
								<img src="/Plus.png" alt=""  />
								Add Your Review
							</button>
						</div>
						<div className={styles.revDiv} ref={sliderRef}>
							{reviews?.map((review, id) => (
								<ReviewBox review={review} key={id}  id={reviews?.length-1-id} filmName={film}/>
							))}
							{reviews?.length===0&&<p>No reviews, Be the first to add a review.</p>}
						</div>
						{reviews.length>0&&<div className={styles.revButtons}>
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
						</div>}
					</>
				) : (
					<LoadingScreen title={"Loading reviews"} />
				)}
			</div>
		</div>
	);
}

export default TrailerReview;
