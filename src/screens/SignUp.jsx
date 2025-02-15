import React from 'react'
import styles from "./sign-up.module.css"
import Input from '../components/input/Input';

function SignUp() {
  return (
		<section className={styles.signMain}>
			<div className={styles.mainOverlay}></div>
			<div>
				<div className={styles.logoDiv}>
					<img src="./Wordmark.png" alt="" className={styles.logo} />
				</div>
				<div className={styles.signBody}>
					{/* <div className=''> */}
						<form action="">
							<h2>Sign in</h2>
							<Input />
						</form>
					{/* </div> */}
				</div>
			</div>
		</section>
	);
}

export default SignUp 