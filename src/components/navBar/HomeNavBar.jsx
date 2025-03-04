import React, { useEffect, useRef } from 'react'
import styles from "./homeNavBar.module.css"

const PhoneCarousel = () => {
	const carouselRef = useRef(null);
	// useEffect(() => {
	// 	const el = carouselRef.current;
	// 	if (el) {
	// 		// Force it to start at the very first item
	// 		setTimeout(() => {
	// 			el.scrollTo({ left: 0, behavior: "instant" });
	// 		}, 50);
	// 	}
	// }, []);
	// Touch scroll handling
	const handleTouchStart = (e) => {
		carouselRef.current.startX = e.touches[0].clientX;
		carouselRef.current.scrollLeftStart = carouselRef.current.scrollLeft;
	};

	const handleTouchMove = (e) => {
		if (!carouselRef.current.startX) return;
		const deltaX = e.touches[0].clientX - carouselRef.current.startX;
		carouselRef.current.scrollLeft =
			carouselRef.current.scrollLeftStart - deltaX;
	};

	const handleTouchEnd = () => {
		carouselRef.current.startX = null;
	};

	return (
		<div
			ref={carouselRef}
			className={styles.linksPhone}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<a href="#">Home</a>
			<a href="#">TV Shows</a>
			<a href="#">Movies</a>
			<a href="#">New & Popular</a>
			<a href="#">My List</a>
			<a href="#">Browse by Language</a>
		</div>
	);
};


function HomeNavBar({userDetails, page}) {
  return (
		<div className={styles.navHB}>
			<div className={styles.homeNav}>
				<div className={styles.first}>
					<div className={styles.logo}>
						<img src="./Wordmark.png" alt="web flix logo" />
					</div>
					<div className={styles.links}>
						<a href="" className={`${page=="home"&& styles.active}`}>Home</a>
						<a href="" className={`${page=="tv_shows"&& styles.active}`}>Tv Shows</a>
						<a href="" className={`${page=="movies"&& styles.active}`}>Movies</a>
						<a href="" className={`${page=="new"&& styles.active}`}>New & Popular</a>
						<a href="" className={`${page=="my_list"&& styles.active}`}>My List</a>
						<a href="" className={`${page=="languages"&& styles.active}`}>Browse by Language</a>
					</div>
				</div>
				<div className={styles.second}>
					<a href="">
						<img
							src="./Search1.png"
							alt="Search button"
							className={styles.whLi}
						/>
						<img src="./Search.png" alt="Search button" className={styles.pLi} />
					</a>
					<a href="">
						<img
							src="./Notification1.png"
							alt="Notification buttons"
							className={styles.whLi}
						/>
						<img
						src="./Notification.png"
						alt="Notification buttons"
						className={styles.pLi}
					/>
					</a>
					<a
						href=""
						style={{ display: "flex", alignItems: "center", gap: "5px" }}
					>
						<img
							src={userDetails?.profile}
							alt="profile"
							style={{ width: "2rem", height: "2rem", borderRadius: "2px" }}
						/>
						<img src="./down1.png" alt="" className={styles.whLi} />
						<img src="./down.png" alt="" className={styles.pLi} />
					</a>
				</div>
			</div>
			{/* <div className={styles.linksPhone}>
				<a href="">Home</a>
				<a href="">Tv Shows</a>
				<a href="">Movies</a>
				<a href="">New & Popular</a>
				<a href="">My List</a>
				<a href="">Browse by Language</a>
			</div> */}
            <PhoneCarousel/>
		</div>
	);
}

export default HomeNavBar
