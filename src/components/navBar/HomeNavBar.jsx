import React, { useEffect, useRef, useState } from 'react'
import styles from "./homeNavBar.module.css"
import PopUpMenu from './PopUpMenu';

const useIsVisible = (threshold = 0.1) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold }
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) observer.unobserve(elementRef.current);
		};
	}, [threshold]);
	console.log(isVisible)
	return [elementRef, isVisible];
};

const PhoneCarousel = ({page}) => {
	const carouselRef = useRef(null);
	
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
		<>
			<div
				ref={carouselRef}
				className={styles.linksPhone}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<a href="" className={`${page == "home" && styles.active}`}>
					Home
				</a>
				<a href="" className={`${page == "tv_shows" && styles.active}`}>
					Tv Shows
				</a>
				<a href="" className={`${page == "movies" && styles.active}`}>
					Movies
				</a>
				<a href="" className={`${page == "new" && styles.active}`}>
					New & Popular
				</a>
				<a href="" className={`${page == "my_list" && styles.active}`}>
					My List
				</a>
				<a href="" className={`${page == "languages" && styles.active}`}>
					Browse by Language
				</a>
			</div>
			
		</>
	);
};


function HomeNavBar({userDetails, page}) {
	const [ref, isVisible] = useIsVisible();
	const [showMenu,setShowMenu]=useState(false)
  return (
		<>
			<div className={`${styles.navHB}  ${!isVisible && styles.navHover}`}>
				<div className={`${styles.homeNav}`}>
					<div className={styles.first}>
						<div className={styles.logo}>
							<img src="./Wordmark.png" alt="web flix logo" />
						</div>
						<div className={styles.links}>
							<a href="" className={`${page == "home" && styles.active}`}>
								Home
							</a>
							<a href="" className={`${page == "tv_shows" && styles.active}`}>
								Tv Shows
							</a>
							<a href="" className={`${page == "movies" && styles.active}`}>
								Movies
							</a>
							<a href="" className={`${page == "new" && styles.active}`}>
								New & Popular
							</a>
							<a href="" className={`${page == "my_list" && styles.active}`}>
								My List
							</a>
							<a href="" className={`${page == "languages" && styles.active}`}>
								Browse by Language
							</a>
						</div>
					</div>
					<div className={styles.second}>
						<a href="">
							<img
								src="./Search1.png"
								alt="Search button"
								className={styles.whLi}
								style={{ width: "1.3rem" }}
							/>
							<img
								src="./Search.png"
								alt="Search button"
								className={styles.pLi}
								style={{ width: "1.3rem" }}
							/>
						</a>
						<a href="">
							<img
								src="./Notification1.png"
								alt="Notification buttons"
								className={styles.whLi}
								style={{ width: "1.3rem" }}
							/>
							<img
								src="./Notification.png"
								alt="Notification buttons"
								className={styles.pLi}
								style={{ width: "1.3rem" }}
							/>
						</a>
						<button
							href=""
							style={{
								display: "flex",
								alignItems: "center",
								gap: "5px",
								padding: "0",
								backgroundColor: "transparent",
							}}
							onClick={() => {
								setShowMenu(!showMenu);
							}}
						>
							<img
								src={userDetails?.profile}
								alt="profile"
								style={{ width: "2rem", height: "2rem", borderRadius: "2px" }}
							/>
							{!showMenu && (
								<>
									<img
										src="./down1.png"
										alt=""
										className={styles.whLi}
										style={{ width: "1.5rem" }}
									/>
									<img
										src="./down.png"
										alt=""
										className={styles.pLi}
										style={{ width: "1.5rem" }}
									/>
								</>
							)}
							{showMenu && (
								<>
									<img
										src="./up.png"
										alt=""
										className={styles.whLi}
										style={{ width: "1.5rem" }}
									/>
									<img
										src="./up1.png"
										alt=""
										className={styles.pLi}
										style={{ width: "1.5rem" }}
									/>
								</>
							)}
						</button>
					</div>

					{showMenu && <PopUpMenu />}
				</div>

				<PhoneCarousel page={page} />
			</div>
			<div ref={ref} style={{ height: "1px" }}></div>
		</>
	);
}

export default HomeNavBar
