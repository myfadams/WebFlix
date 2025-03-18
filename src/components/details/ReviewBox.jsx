import React, { useEffect, useState } from 'react'
import styles from "./trailer.module.css";
import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import formatViews from '../../commonJs/common';
import { addLike } from '../../firebase/database';
import { onValue, ref } from 'firebase/database';
import { database } from '../../firebase/config';


function ReviewBox({review,id,filmName}) {
	// console.log(id,"review id")
	const [hasLiked,setHasLiked]=useState(false)
	const [isLiking,setIsLiking]=useState(false)
	
	const [likesCount, setLikesCount] = useState(0);
	const handleLike =()=>{
		setIsLiking(true)
		const cachedProfile =
			JSON.parse(localStorage.getItem("currentProfile")) || {};
		addLike(filmName,cachedProfile?.id,id.toString()).finally(()=>{
			setIsLiking(false);
		})
	}

	useEffect(() => {
		if (!id.toString()) return;

		const likesRef = ref(database, `reviews/${filmName}/reviews/${id}/likes`);
		const cachedProfile =
			JSON.parse(localStorage.getItem("currentProfile")) || {};
		const unsubscribe = onValue(likesRef, (snapshot) => {
			const likesData = snapshot.val();
			
			if (Array.isArray(likesData)) {
				setLikesCount(likesData.length);
				setHasLiked(likesData.includes(cachedProfile?.id));
			} else {
				setLikesCount(0); // If not an array, set likes to 0
				setHasLiked(false)
			}
		});

		return () => unsubscribe(); // Cleanup listener on unmount
	}, [id,]);
  return (
		<div style={{ minWidth:"25rem",maxWidth:"25rem" }}>
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
						sx={{
							"& .MuiRating-iconEmpty": {
								color: "white", // Sets unfilled stars to white
							},
						}}
						// emptyIcon={<StarIcon fontSize="inherit" />}
						size="small"
					/>
					<span>{review.rating}</span>
				</div>
			</div>
			<div className={styles.text}>
				<p>{review.review}</p>
			</div>
			<button
				className={styles.like}
				onClick={() => {
					handleLike();
				}}
			>
				<Favorite
					style={{ color: hasLiked && "var(--primary-btn)" }}
					className={styles.fav}
				/>

				<span>{formatViews(likesCount)}</span>
			</button>
		</div>
	);
}

export default ReviewBox
