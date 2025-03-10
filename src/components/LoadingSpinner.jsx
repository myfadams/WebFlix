import React from "react";
import "./spinner.css"; // Make sure to import your CSS file

function LoadingSpinner({styles}) {
	return (
		<div className="spinner-container" style={styles}>
			<div className="spinner"></div>
		</div>
	);
}

export default LoadingSpinner;
