import React, { useState } from 'react'
import styles from "./popular.module.css"
function Popular() {
    const [btnHover,setBtnHover]=useState(false);
  return (
		<div className={styles.mainH}>
			
			<div className={styles.bodyDiv}>
				<div className={styles.btnMains}>
					<h1>House of Ninjas</h1>
					<p>
						Years after retiring from their formidable ninja lives, a
						dysfunctional family must return to shadowy missions to counteract a
						string of looming threats.
					</p>
					<div className={styles.buttonsH}>
						<button>
							<img src="./Play2.png" alt="" /> Play
						</button>
						<button
							onMouseEnter={() => {
								setBtnHover(true);
							}}
							onMouseLeave={() => {
								setBtnHover(false);
							}}
						>
							<img src={btnHover ? "./Info.png" : "./Info2.png"} alt="" />
							More info
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popular
