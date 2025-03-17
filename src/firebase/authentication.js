import {
	getAuth,
	validatePassword as firebaseValidatePassword,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import { auth, database } from "./config";


export const validatePassword = async (passwordFromUser) => {
	try {
		const status = await firebaseValidatePassword(auth, passwordFromUser);

		if (!status.isValid) {
			return {
				isValid: false,
				needsLowerCase: !status.containsLowercaseLetter,
				needsUpperCase: !status.containsUppercaseLetter,
				needsNumber: !status.containsNumber,
				needsSpecialChar: !status.containsSpecialCharacter,
				needsMinLength: status.passwordTooShort,
			};
		}

		return { isValid: true };
	} catch (error) {
		// console.error("Password validation error:", error);
		alert(error.message)
		return { isValid: false, error: error.message };
	}
};


export const registerUser = async (email, password,username) => {
	try {
		// Create user
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		await updateProfile(user, { displayName: username });
        // setUser(user);
		// Send verification email
		await sendEmailVerification(user);
		alert(`Verification email sent! to ${email}`);

		return { success: true, message: "User created, verification email sent!" };
	} catch (error) {
		console.error("Error:", error.message);
		return { success: false, error: error.message };
	}
};


