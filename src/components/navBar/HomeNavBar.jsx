import React, { useEffect, useRef, useState } from "react";
import styles from "./homeNavBar.module.css";
import PopUpMenu from "./PopUpMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { retrieveProfiles } from "../../firebase/database";

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
	
	return [elementRef, isVisible];
};

const PhoneCarousel = ({ page,  isActive }) => {
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
				<Link
					className={`${page === "home" && styles.active}`}
					to={"/home"}
					state={{
						
						active: "home",
						
					}}
					replace
				>
					Home
				</Link>

				<Link
					className={`${page === "tv_shows" && styles.active}`}
					to={"/browse/tv shows"}
					state={{
						browseDetails: {
							genreName: "Tv Shows and Series",
							active: "tv_shows",
							
						},
						typeSect: "sections",
						show: "show",
					}}
					replace
				>
					Tv Shows
				</Link>
				<Link
					className={`${page === "movies" && styles.active}`}
					to={"/browse/movies"}
					state={{
						browseDetails: {
							genreName: "All Movies",
							active: "movies",
							
						},
						typeSect: "sections",
					}}
					replace
				>
					Movies
				</Link>
				<Link
					className={`${page === "new" && styles.active}`}
					to={"/browse/new popoluar"}
					state={{
						browseDetails: {
							genreName: "New & Popular",
							active: "new",
							
						},
						typeSect: "sections",
					}}
					replace
				>
					New & Popular
				</Link>
				<Link
					className={`${page === "my_list" && styles.active}`}
					to={"/browse/my list"}
					state={{
						browseDetails: {
							genreName: "My List",
							active: "my_list",
							
						},
						typeSect: "sections",
					}}
					replace
				>
					My List
				</Link>
				<Link
					className={`${page == "languages" && styles.active}`}
					to={"/browse/language"}
					state={{
						browseDetails: {
							genreName: "Browse by Language",
							active: "languages",
							
						},
						typeSect: "sections",
					}}
					replace
				>
					Browse by Language
				</Link>
			</div>
		</>
	);
};

function HomeNavBar({ page, isActive }) {
	// console.log(page)
	const [ref, isVisible] = useIsVisible();
	const [showMenu, setShowMenu] = useState(false);
	const { profile, setProfile, user, cachedProfiles, setCachedProfiles } =
		useAuth();
	const [userProfiles, setUserProfiles] = useState();
	
		useEffect(()=>{
			const cachedProfile = JSON.parse(
				localStorage.getItem("currentProfile")
			);
				if(cachedProfiles){
					const results = cachedProfiles?.filter(
						(item) => item?.id !== cachedProfile?.id
					);
					setUserProfiles(results);
					return
				}
				retrieveProfiles(user?.uid).then((res)=>{
					const results = res?.filter((item) => item?.id !== cachedProfile?.id);
					setUserProfiles(results)
					setCachedProfiles(results)
				})
				
			},[])
	// console.log(profile,"yes")
	useEffect(() => {
		setShowMenu(false);
	}, [isVisible]);
	useEffect(()=>{
		const cachedProfile = JSON.parse(localStorage.getItem("currentProfile"));
		setProfile(cachedProfile)
	},[])
	return (
		<>
			<div className={`${styles.navHB}  ${!isVisible && styles.navHover}`}>
				<div className={`${styles.homeNav}`}>
					<div className={styles.first}>
						<div className={styles.logo}>
							<img
								src="/Wordmark.svg"
								alt="web flix logo"
								className="siteLogo"
							/>
						</div>
						<div className={styles.links}>
							<Link
								className={`${page === "home" && styles.active}`}
								to={"/home"}
								state={{
									
									active: "home",
									
								}}
								replace
							>
								Home
							</Link>

							<Link
								className={`${page === "tv_shows" && styles.active}`}
								to={"/browse/tv shows"}
								state={{
									browseDetails: {
										genreName: "Tv Shows and Series",
										active: "tv_shows",
										
									},
									typeSect: "sections",
									show: "show",
								}}
								replace
							>
								Tv Shows
							</Link>
							<Link
								className={`${page === "movies" && styles.active}`}
								to={"/browse/movies"}
								state={{
									browseDetails: {
										genreName: "All Movies",
										active: "movies",
										
									},
									typeSect: "sections",
								}}
								replace
							>
								Movies
							</Link>
							<Link
								className={`${page === "new" && styles.active}`}
								to={"/browse/new popoluar"}
								state={{
									browseDetails: {
										genreName: "New & Popular",
										active: "new",
										
									},
									typeSect: "sections",
								}}
								replace
							>
								New & Popular
							</Link>
							<Link
								className={`${page === "my_list" && styles.active}`}
								to={"/browse/my list"}
								state={{
									browseDetails: {
										genreName: "My List",
										active: "my_list",
										
									},
									typeSect: "sections",
								}}
								replace
							>
								My List
							</Link>
							<Link
								className={`${page == "languages" && styles.active}`}
								to={"/browse/language"}
								state={{
									browseDetails: {
										genreName: "Browse by Language",
										active: "languages",
										
									},
									typeSect: "sections",
								}}
								replace
							>
								Browse by Language
							</Link>
						</div>
					</div>
					<div className={styles.second}>
						{isActive !== "search" && (
							<Link
								to={"/search"}
								state={{ active: "search" }}
							>
								<img
									src="/Search1.png"
									alt="Search button"
									className={styles.whLi}
									style={{ width: "1.3rem" }}
								/>
								<img
									src="/Search.png"
									alt="Search button"
									className={styles.pLi}
									style={{ width: "1.3rem" }}
								/>
							</Link>
						)}
						<Link>
							<img
								src="/Notification1.png"
								alt="Notification buttons"
								className={styles.whLi}
								style={{ width: "1.3rem" }}
							/>
							<img
								src="/Notification.png"
								alt="Notification buttons"
								className={styles.pLi}
								style={{ width: "1.3rem" }}
							/>
						</Link>
						<button
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
								src={profile?.profileImg}
								alt="profile"
								style={{ width: "2rem", height: "2rem", borderRadius: "2px" }}
							/>
							{!showMenu && (
								<>
									<img
										src="/down1.png"
										alt=""
										className={styles.whLi}
										style={{ width: "1.5rem" }}
									/>
									<img
										src="/down.png"
										alt=""
										className={styles.pLi}
										style={{ width: "1.5rem" }}
									/>
								</>
							)}
							{showMenu && (
								<>
									<img
										src="/up.png"
										alt=""
										className={styles.whLi}
										style={{ width: "1.5rem" }}
									/>
									<img
										src="/up1.png"
										alt=""
										className={styles.pLi}
										style={{ width: "1.5rem" }}
									/>
								</>
							)}
						</button>
					</div>

					{showMenu && <PopUpMenu onClose={setShowMenu}  profiles={userProfiles}/>}
				</div>

				<PhoneCarousel page={page} />
			</div>
			<div ref={ref} style={{ height: "1px" }}></div>
		</>
	);
}

export default HomeNavBar;
