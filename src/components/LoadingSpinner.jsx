import React from "react";
import "./spinner.css"; // Make sure to import your CSS file

function LoadingSpinner() {
	return (
		<div className="spinner-container">
			<div className="spinner"></div>
		</div>
	);
}

export default LoadingSpinner;
