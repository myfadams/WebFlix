import React, { useEffect, useState } from "react";
import styles from "./sign-up.module.css";
import Input from "../components/input/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import Loading from "../components/video/Loading";

function SignIn() {
	const { user, checkEmailVerification } = useAuth();
	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});
	const [remember, setRemember] = useState(false);

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [disable, setDisable] = useState(true);
	useEffect(() => {
		if (!user) {
			setIsLoading(false);
			setDisable(false);
			return;
		}
		const interval = setInterval(() => {
			if (user && !user?.emailVerified) {
				checkEmailVerification();
			} else {
				console.log("verified");
				navigate("/selectProfile");
				clearInterval(interval);
				return;
			}
		}, 3000);

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [user, checkEmailVerification]);
	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return (
		<section className={styles.signMain}>
			<div className={styles.mainOverlay}></div>
			<div>
				<div className={styles.logoDiv}>
					<img
						src="./Wordmark.svg"
						alt=""
						className={`${styles.logo} siteLogo`}
					/>
				</div>
				<div className={styles.signBody}>
					{/* <div className=''> */}
					<form action="">
						<h2>Sign in</h2>

						<Input
							placeHolder={"Email"}
							setValue={setUserDetails}
							type={"email"}
							value={userDetails}
							name={"email"}
						/>
						<Input
							placeHolder={"Password"}
							setValue={setUserDetails}
							type={"password"}
							value={userDetails}
							name={"password"}
						/>

						{/* <img src="./hide.png" alt="" /> */}
						<button
							className={styles.signBtn}
							onClick={() => {
								navigate("/selectProfile");
								// setDisable(!disable);
							}}
							disabled={disable}
						>
							{isLoading ? (
								<Loading
									styles={{
										borderLeftColor: "white",
										width: "20px",
										height: "20px",
									}}
								/>
							) : (
								"Sign Up"
							)}
						</button>
						<label className={styles.checkboxContainer}>
							<input
								type="checkbox"
								checked={remember}
								onChange={() => setRemember(!remember)}
							/>
							<span className={styles.checkmark}></span>
							Remember Me
						</label>
						<div className={styles.new}>
							<p>
								New to MovieHaven?{" "}
								<NavLink to={"/register"} replace>
									Sign up.
								</NavLink>
							</p>
							<p>
								This page is protected by Google reCAPTCHA to ensure you’re not
								a bot.<a href="#"> Learn more.</a>
							</p>
						</div>
					</form>
					{/* </div> */}
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

export default SignIn;
