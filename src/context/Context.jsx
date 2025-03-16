import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile,setProfile]=useState(null)

	useEffect(() => {
		// Listen for auth state changes
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			try {
				if (currentUser) {
					await currentUser.reload(); // 🔄 Refresh user data
					setUser({
						...currentUser,
						emailVerified: currentUser.emailVerified, // ✅ Track email verification status
					});
				} else {
					setUser(null);
				}
			} catch (error) {
				console.log(error)
			} finally{
				setLoading(false);

			}
		});

		return () => unsubscribe(); // Cleanup function
	}, []);

	// Function to manually check email verification
	const checkEmailVerification = async () => {
		if (auth.currentUser) {
			await auth.currentUser.reload();
			setUser((prevUser) => ({
				...prevUser,
				emailVerified: auth.currentUser.emailVerified,
			}));
		}
	};

	// Logout Function
	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, logout, checkEmailVerification,profile,setProfile }}
		>
			{!loading && children} {/* Prevent rendering until loading is done */}
		</AuthContext.Provider>
	);
};

// Custom Hook for easy access
export const useAuth = () => {
	return useContext(AuthContext);
};
