import React, { useState } from 'react'
import styles from "./popup.module.css"
import Input from  "../input/Input"
import { Rating } from '@mui/material';

const prof = [];
for (let i = 0; i <= 15; i++) {
	prof.push(`/avatars/avatar${i != 0 ? i:""}.png`);
}
const PopUp = ({ isOpen, onClose, setDet, type }) => {
	if (!isOpen) return null; // Don't render if popup is closed
	const [userProfile, setUseProfile] = useState({
		profileName: "",
		profileImg: "",
	});
	const [reviewDetails, setReviewDetails] = useState({
		name: "",
		from: "",
		review:
			"",
		rating: 0,
		likes:0
	});
	const [selected,setSelected]=useState("");
	
	// console.log(prof)
	return !type ? (
		<div className={styles.popupOverlay} onClick={onClose}>
			<div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
				<h2>Create profile</h2>
				<Input
					name={"profileName"}
					placeHolder={"Profile name"}
					setValue={setUseProfile}
					type={"text"}
					value={userProfile}
				/>
				<button className={styles.closeButton} onClick={onClose}>
					<img src="/close.png" alt="close button" />
				</button>
				<div className={styles.profSelect}>
					{prof.map((profile, id) => {
						return (
							<img
								src={profile}
								key={id}
								style={{ width: "100%" }}
								onClick={() => {
									setSelected(profile);
									setUseProfile({ ...userProfile, profileImg: profile });
								}}
								className={`${selected == profile && styles.highlighted}`}
							/>
						);
					})}
				</div>
				<button
					className={styles.popBtn}
					onClick={() => {
						if (
							userProfile.profileName.trim() !== "" &&
							userProfile.profileImg.trim() !== ""
						) {
							setDet({
								name: userProfile.profileName,
								profile: userProfile.profileImg,
							});
							onClose();
						}
					}}
				>
					Add
				</button>
			</div>
		</div>
	) : (
		<div className={styles.popupOverlay} onClick={onClose}>
			<div
				className={`${styles.popupContent} ${styles.popN}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2>Add review</h2>
				<Input
					name={"name"}
					placeHolder={"Your name"}
					setValue={setReviewDetails}
					type={"text"}
					value={reviewDetails}
				/>
				<Input
					name={"from"}
					placeHolder={"Your location"}
					setValue={setReviewDetails}
					type={"text"}
					value={reviewDetails}
				/>
				<textarea
					name="review"
					onChange={(e) => {
						setReviewDetails({ ...reviewDetails, review: e.target.value });
					}}
					value={reviewDetails.review}
					placeholder="Enter you review"
					className={styles.review}
				/>
				<div className={styles.rating}>
					<span>Rating</span>
					<span style={{display:"flex",alignItems:"center", gap:"4px"}}>
						<Rating
							name="rating"
							value={reviewDetails.rating}
							onChange={(event, newValue) => {
								setReviewDetails({ ...reviewDetails, rating: newValue });
							}}
							precision={0.1}
							style={{ color: "var(--primary-btn)" }}
							sx={{
								"& .MuiRating-iconEmpty": {
									color: "white", // Sets unfilled stars to white
								},
							}}
							// emptyIcon={<StarIcon fontSize="inherit" />}
							size="large"
						/>
						<span>{reviewDetails.rating}</span>
					</span>
				</div>
				<button className={styles.closeButton} onClick={onClose}>
					<img src="/close.png" alt="close button" />
				</button>

				<button
					className={styles.popBtn}
					onClick={() => {
						if (
							reviewDetails.name.trim() !== "" &&
							reviewDetails.from.trim() !== "" && reviewDetails.review.trim()!==""
						) {
							setDet(reviewDetails);
							
							onClose();
						}
					}}
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default PopUp
