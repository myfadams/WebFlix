import React, { useEffect } from "react";
import VideoPlayer from "../components/video/VrdeoPlayer";
import { Slider } from "@mui/material";
import VerticalSlider from "../components/video/Temp";
import { useLocation } from "react-router";

function Video() {
	const location =useLocation();
	const url = location?.state?.filmUrl;
	const title=location?.state?.title

	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				// overflow: "hidden !important",
				// overscrollBehavior: "contain",
				touchAction: "none",
			}}
		>
			<VideoPlayer urlFilm={url} title={title}/>
		</div>
	);
}

export default Video;
