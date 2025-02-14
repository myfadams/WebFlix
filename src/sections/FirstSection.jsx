import React from 'react'
import styles from "./firstsection.module.css"
import NavBar from '../components/navBar/NavBar';
function FirstSection() {
  return (
		<>
			<section className={styles.main}>
				<div className={styles.mainOverlay}></div>
				<div className={styles.mainDiv}>
					<NavBar />
					<div className={styles.margDiv}>
						<div className={styles.mainText}>
							<h1>Unlimited movies, TV shows, and more</h1>
							<p>Watch anywhere. Cancel anytime.</p>
						</div>
						<div className={styles.signUp}>
							<p>
								Ready to watch? Enter your email to create or restore your
								access.
							</p>
							<form action="">
								<input
									type="email"
									className={styles.input}
									placeholder="Email address"
								/>
								<button className={styles.signUpBtn}>
									Get Started <img src="./rightArrow.png" alt="" className={styles.i1} />
									<img src="./right.png" alt="" className={styles.i2} />
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
			<div className={styles.footer}>
				<div className={styles.fMain}>
					<div>
						<img src="./popcorn.png" alt="image of popcorn" />
					</div>
					<div className={styles.fp}>
						<h4>The MovieHaven you love for just free.</h4>
						<p>Get the Standard with ads plan.</p>
						<a href="#" className={styles.lMore}>
							Learn more <img src="./rightArrow.png" alt="" />
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default FirstSection
