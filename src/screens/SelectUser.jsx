import React, { useEffect, useState } from "react";
import styles from "./selectuser.module.css";
import commonStyles from "../components/common/commonstyles.module.css"
import PopUp from "../components/popup/PopUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import { addProfile, retrieveProfiles } from "../firebase/database";
import LoadingScreen from "../components/LoadingScreen";
function SelectUser() {
	const { user, cachedProfiles, setCachedProfiles, setProfile } = useAuth();
	const [isLoading,setLoading]=useState(true)
	const navigate = useNavigate();
	useEffect(()=>{
			window.scroll(0,0)
			if(!user){
				navigate("/login",{replace:true})

			}
		},[])

	
	const [userProfiles, setUserProfiles] = useState([]);
	const [newUser, setNewUser] = useState();
	
	const [isOpen, setISOpen] = useState(false);
	useEffect(()=>{
		// console.log("profiles",!newUser&&cachedProfiles)
		if(!newUser&&cachedProfiles?.lenght>0){
			setUserProfiles(cachedProfiles);
			return
		}
		setLoading(true)
		retrieveProfiles(user?.uid).then((res)=>{
			
			setUserProfiles(res)
			setCachedProfiles(res)
		}).finally(()=>{
			setLoading(false);
			setNewUser(null)
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
									
									setProfile(userProf)
									localStorage.setItem(
										"currentProfile",
										JSON.stringify(userProf)
									);
									navigate("/home",{replace:true});
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
