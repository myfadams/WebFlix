import React, { useEffect, useRef, useState } from "react";
import styles from "./sign-up.module.css";
import Input from "../components/input/Input";
import { NavLink, useLocation, useNavigate } from "react-router";
import Loading from "../components/video/Loading";
import { registerUser, validatePassword } from "../firebase/authentication";
import { useAuth } from "../context/Context";
import { addUserToDB } from "../firebase/database";
import { sendEmailVerification } from "firebase/auth";

function SignUp() {
	const { user, checkEmailVerification } = useAuth();
	
	const location = useLocation();
	const email = location.state?.email;
	const [isLoading, setIsLoading] = useState(true);
	const [disableResend,setdisableResend]=useState(false)
	const [userDetails, setUserDetails] = useState({
		username: "",
		email: "" || email,
		password: "",
		confirmPassword: "",
	});
	const [disable, setDisable] = useState(false);
	const [start, setStart] = useState();
	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	useEffect(() => {
		if (!user) {
			setIsLoading(false);
			setDisable(false)
			return;
		}
		const interval = setInterval(() => {
			if (user && !user?.emailVerified) {
				checkEmailVerification();
			} else {
				console.log("verified");
				addUserToDB(user?.uid, { username:user?.displayName,email:user?.email});
				navigate("/selectProfile", { replace: true });
				clearInterval(interval);
				return;
			}
		}, 3000);

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [user, checkEmailVerification, start]);
	const [remember, setRemember] = useState(false);
	
	const navigate = useNavigate();
	const passwordRef = useRef(null);
	const handleCreateAccount = async () => {
		setDisable(true);
		if (
			userDetails.username.trim() === "" ||
			userDetails.password.trim() === "" ||
			userDetails.confirmPassword.trim() === "" ||
			userDetails.email.trim() === ""
		) {
			setDisable(false);
			alert("Cant leave fields empty");
			return;
		}
		setIsLoading(true);
		if (userDetails.confirmPassword === userDetails.confirmPassword) {
			const result = await validatePassword(userDetails.password);
			if (result.isValid) {
				const res =await registerUser(userDetails.email, userDetails?.password,userDetails.username)
				if(!res.success){
					alert(res.error)
					setIsLoading(false)
					setDisable(false)
				}
				setStart("yes");
			} else {
				let message = "Invalid password:\n";
				if (result.needsLowerCase) message += "- Needs a lowercase letter.\n";
				if (result.needsUpperCase) message += "- Needs an uppercase letter.\n";
				if (result.needsNumber) message += "- Needs a number.\n";
				if (result.needsSpecialChar)
					message += "- Needs a special character.\n";
				if (result.needsMinLength) message += "- Password is too short.\n";

				passwordRef.current.setCustomValidity(message);
				passwordRef.current.reportValidity();
				setIsLoading(false);
				setDisable(false);
			}
		} else {
			passwordRef.current.setCustomValidity("Passwords do not match");
			passwordRef.current.reportValidity();
			setIsLoading(false);
			setDisable(false);
		}
		if (user?.emailVerified) {
			setIsLoading(false);
			setDisable(false);
			navigate("/selectProfile",{replace:true});
		}
	};
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
							ref={passwordRef}
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
							onClick={handleCreateAccount}
							disabled={disable}
							type="button"
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
						<div className={styles.resend}>
							<label className={styles.checkboxContainer}>
								<input
									type="checkbox"
									checked={remember}
									onChange={() => setRemember(!remember)}
								/>
								<span className={styles.checkmark}></span>
								Remember Me
							</label>
							{isLoading&&!disableResend&&<button onClick={async()=>{
								setdisableResend(true);
								await sendEmailVerification(user);
								setTimeout(()=>{
									setdisableResend(false)
								},300_000)
							}} disabled={disableResend}>Resend</button>}
						</div>
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
