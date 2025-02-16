import React, { useEffect, useState } from "react";
import styles from "./selectuser.module.css";
import commonStyles from "../components/common/commonstyles.module.css"
import PopUp from "../components/popup/PopUp";
import { useNavigate } from "react-router";
function SelectUser() {
	const [userProfiles, setUserProfiles] = useState([
		{ name: "Jennifer", profile: "./avatar1.png" },
		{ name: "Rex", profile: "./avatar2.png" },
		{ name: "Bill", profile: "./avatar3.png" },
		// { name: "Arthur", profile: "./avatar4.png" },
	]);
	const [newUser, setNewUser] = useState({
		name: "",
		profile: "./avatar1.png",
	});
	// const [disable,setDisable]=useState(false)
	const navigate =useNavigate()
	useEffect(()=>{
		if(newUser.name!=="")
			setUserProfiles([...userProfiles, newUser]);
	},[newUser])
	const [isOpen, setISOpen]=useState(false)
	return (
		<div className={styles.sectionUser}>
			<h1>Who's watching?</h1>
			<PopUp isOpen={isOpen} onClose={() => setISOpen(false)} setDet={setNewUser}/>
			<div className={styles.main}>
				<ul>
					{userProfiles.map((user, id) => {
						return (
							<li key={id} className={`${commonStyles.touchableOpacity}`} onClick={()=>{

								navigate("/home",{state:{user}})
								// setDisable(true)
							}}>
								<img src={user.profile} alt={`${user.name} profile`} />
								<p>{user.name}</p>
							</li>
						);
					})}

					<div
						className={`${commonStyles.touchableOpacity} ${styles.addBtn}`}
						onClick={() => setISOpen(true)}
					>
						<img src="./CirclePlus.png" alt="" />
						<p>Add Profile</p>
					</div>
				</ul>
			</div>
			<button
				className={`${commonStyles.outlineBtn} ${styles.btnMan} ${commonStyles.touchableOpacity}`}
			>
				Manage Profiles
			</button>
		</div>
	);
}

export default SelectUser;
