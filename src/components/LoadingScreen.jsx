import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./loadingStyles.module.css"
function LoadingScreen({title}) {
	return (
		<div className={styles.over}>
			<LoadingSpinner />
			<h4>{title}</h4>
		</div>
	);
}

export default LoadingScreen;
