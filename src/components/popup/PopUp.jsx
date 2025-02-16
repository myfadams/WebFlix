import React, { useState } from 'react'
import styles from "./popup.module.css"
import Input from  "../input/Input"
const PopUp = ({ isOpen, onClose, setDet }) => {
	if (!isOpen) return null; // Don't render if popup is closed
	const [userProfile, setUseProfile] = useState({ profileName: "" });
	return (
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
					<img src="./close.png" alt="close button" />
				</button>
				<button className={styles.popBtn} onClick={()=>{
                    if(userProfile.profileName!==""){
                        setDet({ name: userProfile.profileName, profile:"./avatar1.png" });
                        onClose()

                    }
                }}>Add</button>
			</div>
		</div>
	);
};

export default PopUp
