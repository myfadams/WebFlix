import React from "react";
import styles from "./selectuser.module.css";
import commonStyles from "../components/common/commonstyles.module.css"
function SelectUser() {
	const userProfiles = [
		{ name: "Jennifer", profile: "./avatar1.png" },
		{ name: "Rex", profile: "./avatar2.png" },
		{ name: "Bill", profile: "./avatar3.png" },
		{ name: "Arthur", profile: "./avatar4.png" },
	];
	return (
		<div className={styles.sectionUser}>
			<h1>Who's watching?</h1>
			<div className={styles.main}>
				<ul>
					{userProfiles.map((user, id) => {
						return (
							<li
								key={id}
								className={`${commonStyles.touchableOpacity}`}
							>
								<img src={user.profile} alt={`${user.name} profile`} />
								<p>{user.name}</p>
							</li>
						);
					})}

					<div className={`${commonStyles.touchableOpacity} ${styles.addBtn}`}>
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
