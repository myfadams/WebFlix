import React, { useEffect, useState } from "react";
import styles from "./sign-up.module.css";
import Input from "../components/input/Input";
import { NavLink, useLocation, useNavigate } from "react-router";

function SignUp() {
	const location = useLocation();
	const email = location.state?.email;
	const [userDetails, setUserDetails] = useState({
		username: "",
		email: "" || email,
		password: "",
		confirmPassword: "",
	});
	useEffect(()=>{
			window.scroll(0,0)
		},[])
	const [remember, setRemember] = useState(false);
	const [disable,setDisable]=useState(false)
	const navigate = useNavigate();
	
	
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
						<h2>Sign up</h2>
						<Input
							placeHolder={"Username"}
							setValue={setUserDetails}
							type={"text"}
							value={userDetails}
							name={"username"}
						/>
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

						<Input
							placeHolder={"Confirm Password"}
							setValue={setUserDetails}
							type={"password"}
							value={userDetails}
							name={"confirmPassword"}
						/>
						{/* <img src="./hide.png" alt="" /> */}
						<button
							className={styles.signBtn}
							onClick={() => {
								navigate("/selectProfile");
								setDisable(true);
							}}
							disabled={disable}
						>
							Sign Up
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
								Already have an account?{" "}
								<NavLink to={"/login"} replace>
									Sign in.
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

export default SignUp;
