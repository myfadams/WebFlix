import React, { useState } from 'react'
import styles from "./secondSection.module.css"
const MoreComponent=({title,text})=>{
	const [show,setShow]=useState(false)
    return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					width: "100%",
					cursor: "pointer",
				}}
			>
				<div
					className={styles.aboutUsDiv}
					onClick={() => {
						setShow(!show);
					}}
				>
					<h3>{title}</h3>
					<img src="./more.png" alt="" />
				</div>
				<div className={`${styles.mAbout} ${show ? styles.show : styles.hide}`}>
					<p>{text}</p>
				</div>
			</div>
		);
}

function SecondSection() {
  return (
		<section className={styles.main}>
			<div className={styles.mainDiv}>
				<div className={`${styles.div} ${styles.d1}`}>
					<img src="./device-pile1.png" alt="" />
					<div>
						<h2>Watch everywhere</h2>
						<p>
							Stream unlimited movies and TV shows on your phone, tablet,
							laptop, and TV.
						</p>
					</div>
				</div>
				<div className={`${styles.div} ${styles.mob}`}>
					<div>
						<h2>Create profiles for kids</h2>
						<p>
							Send kids on adventures with their favorite characters in a space
							made just for them—free with your membership.
						</p>
					</div>
					<img src="./device-pile2.png" alt="" />
				</div>
				<div className={`${styles.div} ${styles.d2}`}>
					<img src="./device-pile3.png" alt="" />
					<div>
						<h2>Download your shows to watch offline</h2>
						<p>Watch on a plane, train or submarine.</p>
					</div>
				</div>

				<div className={styles.aboutUS}>
					<h2>Want to know more?</h2>
					<MoreComponent
						title={"What is MovieHaven?"}
						text={
							"Welcome to MovieHaven – your ultimate destination for streaming the best movies and shows. Discover an endless collection of blockbusters, timeless classics, and hidden gems, all in one place. Watch anytime, anywhere, and experience entertainment like never before"
						}
					/>
					<MoreComponent
						title={"Where can I watch?"}
						text={
							"You can enjoy MovieHaven anytime, anywhere! Stream seamlessly on your favorite devices, including Smart TVs, laptops, tablets, and smartphones. Whether you're at home or on the go, simply log in and start watching on web browsers, iOS and Android devices, or even cast to your TV with Chromecast, AirPlay, or HDMI for the big-screen experience."
						}
					/>
					<MoreComponent
						title={"What can I watch on MovieHaven?"}
						text={
							"You can enjoy MovieHaven anytime, anywhere! Stream seamlessly on your favorite devices, including Smart TVs, laptops, tablets, and smartphones. Whether you're at home or on the go, simply log in and start watching on web browsers, iOS and Android devices, or even cast to your TV with Chromecast, AirPlay, or HDMI for the big-screen experience."
						}
					/>
					<MoreComponent
						title={"Is MovieHaven good for kids?"}
						text={
							"Parents can set up parental controls to ensure a safe viewing experience, with age-appropriate content and restricted access to mature content. With MovieHaven, kids can explore a world of fun and educational entertainment in a secure environment."
						}
					/>
					<div className={styles.signUp}>
						<p>
							Ready to watch? Enter your email to create or restore your access.
						</p>
						<form action="">
							<input
								type="email"
								className={styles.input}
								placeholder="Email address"
							/>
							<button className={styles.signUpBtn}>
								Get Started{" "}
								<img src="./rightArrow.png" alt="" className={styles.i1} />
								<img src="./right.png" alt="" className={styles.i2} />
							</button>
						</form>
					</div>
				</div>

				<div className={styles.footerD}>
					<div>
						<a href="">FAQ</a>
						<a href="">Legal notices</a>
						<a href="">Cookies</a>
						<a href="">Ways to watch</a>
					</div>

					<div>
						<a href="">Terms of use</a>
						<a href="">Contact us</a>
						<a href="">Help center</a>
						<a href="">New Lin</a>
					</div>
					<div>
						<a href="">Account</a>
						<a href="">Privacy</a>
						<a href="">Legal notices</a>
						{/* <a href="">N</a> */}
					</div>
				</div>
			</div>
		</section>
	);
}

export default SecondSection
