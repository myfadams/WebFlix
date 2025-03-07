import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./config";

const uploadFiles = async (file, type, setProgress) => {
	return new Promise((resolve, reject) => {
		const moviesRef = ref(storage, `${type}/${file.name}`);
		const uploading = uploadBytesResumable(moviesRef, file);

		uploading.on(
			"state_changed",
			(snapshot) => {
				const percentage = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress((prev) => ({ ...prev, progress: percentage }));
			},
			(error) => {
				console.error("Upload error:", error);
				reject(error);
			},
			async () => {
				try {
					const url = await getDownloadURL(uploading.snapshot.ref);
					resolve(url);
				} catch (error) {
					console.error("Error getting download URL:", error);
					reject(error);
				}
			}
		);
	});
};

export default uploadFiles;
