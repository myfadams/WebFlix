import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import styles from "./video.module.css";
import { Slider } from "@mui/material";
import Loading from "./Loading";
import LoadingSpinner from "../LoadingSpinner";
import { formatMovieTime } from "../../commonJs/common";
import { useNavigate } from "react-router";
function VideoPlayer() {
	const videoRef = useRef(null);
	const containerRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const inactivityTimer = useRef(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [duration, setDuration] = useState(false);
	const [sliderTime, setSliderTime] = useState(0);
	const navigate= useNavigate();
	const [disable,setDisable]=useState(false)

	useEffect(() => {
			window.scroll(0, 0);
			const hasVisited = localStorage.getItem("hasVisited");
			if (!hasVisited) {
				localStorage.setItem("hasVisited", "true");
				window.location.reload(); // Reloads the page
				// window.location.reload();
			}
		}, []);
	const handleMove = () => {
		setShouldShow(true);

		clearTimeout(inactivityTimer.current);
		inactivityTimer.current = setTimeout(() => {
			setShouldShow(false);
		}, 2000);
	};

	const goToTime = (seconds) => {
		if (videoRef.current) {
			videoRef.current.currentTime = seconds;
		}
	};

	const forwardBackward = (type) => {
		if (type == "forward") {
			videoRef.current.currentTime += 10;
			return;
		}
		videoRef.current.currentTime -= 10;
	};

	function handleTimeUpdates(event) {
		const percentage = (event.target.currentTime / duration) * 100;
		setSliderTime(percentage);
	}
	const handleLoading = (event) => {
		setHasLoaded(true);
		setDuration(event.target.duration);
		console.log(event.target.duration, "duration");
	};
	const togglePlay = () => {
		// console.log("plat")
		if (videoRef.current) {
			if (playing) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setPlaying(!playing);
		}
	};

	const toggleFullscreen = () => {
		if (containerRef.current) {
			if (!document.fullscreenElement) {
				containerRef.current.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	};
	const [shouldShow, setShouldShow] = useState(false);
	return (
		<div
			ref={containerRef}
			className={`${styles.videoContainer}  ${isMobile && styles.videoMobile}`}
			onMouseMove={handleMove}
			style={{
				width: isMobile
					? `${window.innerHeight}px`
					: `${window.innerWidth}px`,
			}}
		>
			{shouldShow && hasLoaded && (
				<>
					<div className={styles.mobileTitle}>
						<button
							onClick={() => {
								navigate(-1);
								setDisable(true);
							}}
							disabled={disable}
						>
							<img src="/moveFwd.png" alt="" />
						</button>
						{isMobile && <p>Sactuary Episode 1</p>}
					</div>

					<div className={styles.slder}>
						<Slider
							defaultValue={0}
							aria-label="none"
							step={1}
							disabled={isMobile}
							disableSwap
							value={sliderTime}
							onChange={(_, value) => {
								setSliderTime(value);
								goToTime((value / 100) * duration);
							}}
							sx={{
								"& .MuiSlider-track": {
									backgroundColor: "var(--primary-btn)",
									borderColor: "transparent",
								},
								"& .MuiSlider-rail": { backgroundColor: "white" },
								"& .MuiSlider-thumb": {
									backgroundColor: "var(--primary-btn)",
									width: isMobile ? 14 : 8, // Bigger thumb for better touch support
									height: isMobile ? 14 : 8,
								},
							}}
						/>
						<span>
							{!hasLoaded
								? formatMovieTime(duration)
								: formatMovieTime((sliderTime / 100) * duration)}
						</span>
					</div>
					{isMobile && (
						<div className={styles.controls}>
							<button
								onClick={() => {
									forwardBackward("backward");
								}}
							>
								<img src="/fowardvid.png" alt="" />
							</button>
							<button onClick={togglePlay}>
								<img src={playing ? "/pause.png" : "/LargePlay.png"} alt="" />
							</button>
							<button
								onClick={() => {
									forwardBackward("forward");
								}}
							>
								<img src="/backward.png" alt="" />
							</button>
						</div>
					)}
					<div className={styles.videoOptions}>
						<div>
							{!isMobile && (
								<button onClick={togglePlay}>
									<img src={playing ? "/pause.png" : "/LargePlay.png"} alt="" />
								</button>
							)}
							<button>
								<img src="/volume.png" alt="" />
							</button>
							{!isMobile && (
								<>
									<button
										onClick={() => {
											forwardBackward("backward");
										}}
									>
										<img src="/fowardvid.png" alt="" />
									</button>
									<button
										onClick={() => {
											forwardBackward("forward");
										}}
									>
										<img src="/backward.png" alt="" />
									</button>
								</>
							)}
						</div>
						{!isMobile && <div>Sactuary Episode 1</div>}
						<div>
							<button>
								<img src="/nextVideo.png" alt="" />
							</button>
							<button>
								<img src="/episodes.png" alt="" />
							</button>
							<button>
								<img src="/subtitles.png" alt="" />
							</button>
							<button>
								<img src="/speed.png" alt="" />
							</button>
							{!isMobile && (
								<button onClick={toggleFullscreen}>
									<img src="/resize.png" alt="" />
								</button>
							)}
						</div>
					</div>
				</>
			)}
			{!hasLoaded && <LoadingSpinner styles={{ right: "auto" }} />}
			<video
				ref={videoRef}
				className={`${styles.video}`}
				src={"/temp/question.mp4"}
				onLoadedMetadata={handleLoading}
				onTimeUpdate={handleTimeUpdates}
				onEnded={() => {
					setPlaying(false);
				}}
				controls={false}
				playsInline={isMobile}
				// poster={poster}
			/>
		</div>
	);
}

export default VideoPlayer;
