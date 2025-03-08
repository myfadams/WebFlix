import React, { useState } from 'react'
import styles from "./navbar.module.css"
import { useNavigate } from 'react-router';
function NavBar() {
  let navigate = useNavigate();
	const [disable, setDisable] = useState(false);
  return (
		<div className={styles.navBody}>
			<div className={styles.logo}>
				<img
					src="./Wordmark.svg"
					alt=""
					className={`${styles.logo} siteLogo`}
				/>
			</div>
			<button
				className={styles.signIn}
				onClick={() => {
					navigate("login");
					setDisable(true);
				}}
				disabled={disable}
			>
				Sign in
			</button>
		</div>
	);
}

export default NavBar
