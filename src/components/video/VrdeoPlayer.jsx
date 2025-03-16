import React, { useEffect, useRef, useState } from "react";
import { isIOS } from "react-device-detect";
import styles from "./video.module.css";
import { Slider } from "@mui/material";
import Loading from "./Loading";
import LoadingSpinner from "../LoadingSpinner";
import { formatMovieTime } from "../../commonJs/common";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../custom/CustomHooks";
import { useMediaQuery } from "react-responsive";
import { incrementViews } from "../../firebase/database";
function VideoPlayer({urlFilm, title,filmId}) {
	const videoRef = useRef(null);
	const containerRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const inactivityTimer = useRef(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [duration, setDuration] = useState(false);
	const [sliderTime, setSliderTime] = useState(0);
	const navigate = useNavigate();
	const [disable, setDisable] = useState(false);
	const videoSize = useWindowSize();
	const [checkMobile, setCheckMobile] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const [showAds,setShowAds]=useState(false);
	const [mute,setMute]=useState(true);
	const [adtime,setAdtime]=useState(0);
	const adRef=useRef()
	const [timeToplayAd,setTimeToplayAd]=useState(null);
	const [hasPlayed,setHasPlayed]=useState(false)
	const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });
	useEffect(() => {
		// console.log(isMobile, "mobile");
		if (isMobile) {
			setCheckMobile(true);
			return;
		}
		setCheckMobile(false);
	}, [videoSize]);
	
	// console.log(videoSize);
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
		// console.log(event.target.currentTime);
		if (Math.abs(event.target.currentTime - timeToplayAd) <= 0.5 && !hasPlayed) {
			togglePlay();
			setShowAds(true)
			setHasPlayed(true)
			// console.log("play the add");
		}
	}
	const handleLoading = async (event) => {
		setHasLoaded(true);
		setDuration(event.target.duration);
		console.log(event.target.duration, "duration");
		const adT = Math.random() * (event.target.duration*0.65 - 100) + 100;
		console.log(adT,"add time")
		setTimeToplayAd(adT)
		await incrementViews(title,"views",filmId)
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

	const toggleFullscreen = async () => {
		if (containerRef.current) {
			if (!document.fullscreenElement) {
				containerRef.current.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}

		if (screen.orientation && screen.orientation.lock) {
			try {
				await screen.orientation.lock("landscape");
			} catch (err) {
				console.warn("Orientation lock failed:", err);
			}
		}
	};
	const [shouldShow, setShouldShow] = useState(false);
	return (
		<div
			ref={containerRef}
			className={`${styles.videoContainer}  ${
				checkMobile && isIOS && styles.videoMobile
			} ${checkMobile && isIOS && isLandscape && styles.rotback}`}
			onMouseMove={handleMove}
			style={{
				width:
					checkMobile && isIOS
						? `${videoSize.height}px`
						: `${videoSize.width}px`,
				height: !checkMobile ? `100vh` : !isIOS && `50vh`,
			}}
		>
			{shouldShow && hasLoaded && !showAds && (
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
						{checkMobile && <p>{title}</p>}
					</div>

					<div className={styles.slder}>
						<Slider
							defaultValue={0}
							aria-label="none"
							step={1}
							disabled={isIOS}
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
									width: checkMobile ? 14 : 8, // Bigger thumb for better touch support
									height: checkMobile ? 14 : 8,
								},
							}}
						/>
						<span>
							{!hasLoaded
								? formatMovieTime(duration)
								: formatMovieTime((sliderTime / 100) * duration)}
						</span>
					</div>
					{checkMobile && (
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
							{!checkMobile && (
								<button onClick={togglePlay}>
									<img src={playing ? "/pause.png" : "/LargePlay.png"} alt="" />
								</button>
							)}
							<button>
								<img src="/volume.png" alt="" />
							</button>
							{!checkMobile && (
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
						{!checkMobile && <div>{title}</div>}
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
							{!isIOS && (
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
				src={urlFilm || "/temp/404 Not Found.mp4"}
				onLoadedMetadata={handleLoading}
				onTimeUpdate={handleTimeUpdates}
				onEnded={() => {
					setPlaying(false);
				}}
				controls={false}
				playsInline={isIOS}
				
				// poster={poster}
			/>
			{showAds && (
				<div className={`${styles.adVideo}`}>
					<button
						onClick={() => {
							if (adRef.current.muted) {
								adRef.current.muted = false;
								return;
							}
							setMute(!mute);
							adRef.current.muted = true;
						}}
						style={{
							position: "absolute",
							zIndex: "3000",
							width: "",
							backgroundColor: "transparent",
							bottom: "2rem",
						}}
					>
						<img
							src={!mute ? "/mute.png" : "/unmute.png"}
							alt=""
							style={{ width: "1.5rem" }}
						/>
					</button>
					<button
						onClick={() => {
							setShowAds(false);
							togglePlay();
						}}
						style={{
							position: "absolute",
							zIndex: "3000",

							color: "white",
							bottom: "2rem",
							right: "1rem",
							backgroundColor: "var(--primary-btn)",
						}}
						disabled={adtime < 6}
					>
						{adtime < 6 ? `Skip in ${adtime}s` : "Skip"}
					</button>
					<video
						ref={adRef}
						className={`${styles.adMobile}`}
						src={"/temp/advideo.mp4"}
						onEnded={() => {
							setShowAds(false);
							togglePlay();
						}}
						onClick={() => {
							adRef.current.pause();
						}}
						onTimeUpdate={() => {
							setTimeout(() => {
								setAdtime(adtime + 1);
							}, 1500);
						}}
						controls={false}
						playsInline={isIOS}
						// poster={poster}
						muted
						autoPlay
					/>
				</div>
			)}
		</div>
	);
}

export default VideoPlayer;
