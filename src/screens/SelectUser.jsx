import React, { useEffect, useState } from "react";
import styles from "./selectuser.module.css";
import commonStyles from "../components/common/commonstyles.module.css"
import PopUp from "../components/popup/PopUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import { addProfile, retrieveProfiles } from "../firebase/database";
import LoadingScreen from "../components/LoadingScreen";
function SelectUser() {
	const { user, checkEmailVerification,setProfile } = useAuth();
	const [isLoading,setLoading]=useState(true)
	useEffect(()=>{
			window.scroll(0,0)
		},[])

	
	const [userProfiles, setUserProfiles] = useState();
	const [newUser, setNewUser] = useState();
	const navigate = useNavigate();
	const [isOpen, setISOpen] = useState(false);
	useEffect(()=>{
		setLoading(true)
		retrieveProfiles(user?.uid).then((res)=>{
			setUserProfiles(res)
		}).finally(()=>{
			window.reload
			setLoading(false);
		})
		
	},[newUser,isOpen])
	const fetchProfiles = () => {
		setLoading(true);
		retrieveProfiles(user?.uid)
			.then((res) => {
				setUserProfiles(res);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	if(isLoading)
		return <LoadingScreen title={"Loading..."} />;
	return (
		<div className={styles.sectionUser}>
			<h1>Who's watching?</h1>
			<PopUp isOpen={isOpen} onClose={() => setISOpen(false)} setDet={fetchProfiles}/>
			<div className={styles.main}>
				<ul>
					{userProfiles?.map((userProf, id) => {
						return (
							<li
								key={id}
								className={`${commonStyles.touchableOpacity}`}
								onClick={() => {
									console.log(userProf)
									setProfile(userProf)
									navigate("/home");
									// setDisable(true)
								}}
							>
								<img
									src={userProf?.profileImg}
									alt={`${userProf?.profileName} profile`}
								/>
								<p>{userProf?.profileName}</p>
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
