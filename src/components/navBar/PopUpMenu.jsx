import React, { useEffect, useState } from 'react'
import styles from "./popup.module.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Context';
import { retrieveProfiles } from '../../firebase/database';
function PopUpMenu({onClose, profiles}) {
	const { user,setProfile, logout } = useAuth();
	const [userProfiles, setUserProfiles] = useState();
	
	const navigate = useNavigate();
	const [disable,setDisable]=useState(false);
    
  return (
		<div className={styles.overlay} onClick={()=>{onClose(false)}}>
		<div className={styles.mainMenu}>
			<div className={styles.subMen}>
				{profiles?.map((userP, id) => (
					<button className={styles.menuBtn} key={id} onClick={()=>{
						// console.log("heres")
						localStorage.setItem("currentProfile", JSON.stringify(userP));
						window.location.reload()
					}}>
						<img src={userP?.profileImg} alt="" style={{ width: "1.6rem" }} />{" "}
						{userP?.profileName}
					</button>
				))}
				<button className={styles.menuBtn}>
					<img src="/edit.png" alt="" style={{ width: "1.6rem" }} /> Manage
					Profiles
				</button>
				<button className={styles.menuBtn}>
					<img src="/transfer.png" alt="" style={{ width: "1.6rem" }} />
					Transfer Profiles
				</button>
				<button className={styles.menuBtn}>
					<img src="/QuestionMark.png" alt="" style={{ width: "1.6rem" }} />
					Manage Profiles
				</button>
				<button className={styles.menuBtn} onClick={()=>{
					setDisable(true)
					navigate("/upload");
					setDisable(false)
				}} disabled={disable}>
					<img src="/upload.png" alt="" style={{ width: "1.6rem" }} />
					Upload a Movie
				</button>
			</div>

			<button className={styles.menuBtn} onClick={()=>{
				setDisable(true)
				logout().finally(()=>{
					window.history.pushState(null, null, "/login");
					window.history.go(0);
					setDisable(false);
				})

			}}>Sign out of MovieHaven</button>
		</div>
		</div>
	);
}

export default PopUpMenu
