import React, { useState } from 'react'
import styles from "./popup.module.css"
import Input from  "../input/Input"

const prof = [];
for (let i = 0; i <= 15; i++) {
	prof.push(`./avatars/avatar${i != 0 ? i:""}.png`);
}
const PopUp = ({ isOpen, onClose, setDet }) => {
	if (!isOpen) return null; // Don't render if popup is closed
	const [userProfile, setUseProfile] = useState({
		profileName: "",
		profileImg: "",
	});
	const [selected,setSelected]=useState("");
	
	// console.log(prof)
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
				<div className={styles.profSelect}>
					{prof.map((profile, id)=>{
						return <img src={profile} key={id} style={{width:"100%"}} onClick={()=>{
							setSelected(profile)
							setUseProfile({...userProfile,profileImg:profile})
						}} 
						className={`${selected==profile&&styles.highlighted}`}/>
					})}
				</div>
				<button className={styles.popBtn} onClick={()=>{
                    if(userProfile.profileName!==""){
                        setDet({ name: userProfile.profileName, profile:userProfile.profileImg });
                        onClose()

                    }
                }}>Add</button>
			</div>
		</div>
	);
};

export default PopUp
