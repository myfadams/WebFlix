import React, { useState } from 'react'
import styles from "./popup.module.css"
function PopUpMenu() {
    const [userProfiles, setUserProfiles] = useState([
            { name: "Jennifer", profile: "./avatar1.png" },
            { name: "Rex", profile: "./avatar2.png" },
            { name: "Bill", profile: "./avatar3.png" },
            // { name: "Arthur", profile: "./avatar4.png" },
        ]);
  return (
		<div className={styles.mainMenu}>
			<div className={styles.subMen}>
				{userProfiles.map((user, id) => (
					<button className={styles.menuBtn} key={id}>
						<img src={user.profile} alt="" style={{ width: "1.6rem" }} />{" "}
						{user.name}
					</button>
				))}
				<button className={styles.menuBtn}>
					<img src="./edit.png" alt="" style={{ width: "1.6rem" }} /> Manage
					Profiles
				</button>
				<button className={styles.menuBtn}>
					<img src="./transfer.png" alt="" style={{ width: "1.6rem" }} />
					Transfer Profiles
				</button>
				<button className={styles.menuBtn}>
					<img src="./QuestionMark.png" alt="" style={{ width: "1.6rem" }} />
					Manage Profiles
				</button>
				<button className={styles.menuBtn}>
					<img src="./upload.png" alt="" style={{ width: "1.6rem" }} />
					Upload a Movie
				</button>
			</div>

			<button className={styles.menuBtn}>Sign out of MovieHaven</button>
		</div>
	);
}

export default PopUpMenu
