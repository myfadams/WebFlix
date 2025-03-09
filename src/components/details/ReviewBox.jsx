import React, { useEffect, useState } from 'react'
import styles from "./trailer.module.css";
import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import formatViews from '../../commonJs/common';


function ReviewBox({review}) {
	const [hasLiked,setHasLiked]=useState(false)
	const [currentLikes, setcurrentLikes] = useState(0);
	useEffect(()=>{
		setcurrentLikes(review?.likes);
	},[review])
  return (
		<div>
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
			<div className={styles.like}>
				<Favorite
					onClick={() => {
						setHasLiked(!hasLiked);
						if (!hasLiked) {
							setcurrentLikes(currentLikes + 1);
						} else {
							setcurrentLikes(
								currentLikes > 0 ? currentLikes - 1 : currentLikes
							);
						}
					}}
					style={{ color: hasLiked && "var(--primary-btn)" }}
					className={styles.fav}
				/>

				<span>{formatViews(currentLikes)}</span>
			</div>
		</div>
	);
}

export default ReviewBox
