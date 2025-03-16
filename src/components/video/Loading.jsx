import React from 'react'
import "../spinner.css";
function Loading( {styles}) {
  return (
		<div className="spinner-container">
			<div className="spinner" style={{ ...styles }}></div>
		</div>
	);
}

export default Loading
