import React, { useState } from 'react'
import styles from "./popular.module.css"
function Popular({title,details,type}) {
    const [btnHover,setBtnHover]=useState(false);
	const [btnLHover, setBtnLHover] = useState(false);
	const [btnPHover, setBtnPHover] = useState(false);
  return (
		<div className={styles.mainH}>
			<div className={`${styles.bodyDiv} ${type&&styles.bodyDType}`}>
				<div className={styles.btnMains}>
					<h1>House of Ninjas</h1>
					{!type && (
						<p>
							Years after retiring from their formidable ninja lives, a
							dysfunctional family must return to shadowy missions to counteract
							a string of looming threats.
						</p>
					)}
					<div className={`${styles.buttonsH} ${type && styles.detH}`}>
						{!type && (
							<>
								<button>
									<img src="/Play2.png" alt="" /> Play
								</button>
								<button
									onMouseEnter={() => {
										setBtnHover(true);
									}}
									onMouseLeave={() => {
										setBtnHover(false);
									}}
								>
									<img src={btnHover ? "/Info.png" : "/Info2.png"} alt="" />
									More info
								</button>
							</>
						)}
						{type && (
							<>
								<button>
									<img src="/Play2.png" alt="" /> Play
								</button>
								<button
									onMouseEnter={() => {
										setBtnPHover(true);
									}}
									onMouseLeave={() => {
										setBtnPHover(false);
									}}
									className={styles.detBtn}
								>
									<img src={btnPHover ? "/Plus1.png" : "/Plus.png"} alt="" />
								</button>
								<button
									onMouseEnter={() => {
										setBtnLHover(true);
									}}
									onMouseLeave={() => {
										setBtnLHover(false);
									}}
									className={styles.detBtn}
								>
									<img src={btnLHover ? "/like2.png" : "/like.png"} alt="" />
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popular
