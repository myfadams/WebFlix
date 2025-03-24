import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./browswe.module.css";
import Single from "../components/home/Single";
import { getLanguageName, groupByLanguage, movies } from "../commonJs/common";
import { getMovies, getShows, retrieveUserList } from "../firebase/database";
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../context/Context";
function BrowseScreen() {
	const [filmsData, setFilmsData] = useState([]);
	const location = useLocation();
	const {
		user,
		cachedMovies,
		setCachedMovies,
		setCachedShows,
		cachedShows,
		cachedUserList,
		setCachedUserList,
	} = useAuth();
	const data = location?.state?.browseDetails;
	const filmsDetails = location?.state?.filmObj;
	const typeSect = location?.state?.typeSect === "genre";
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const t10 = data?.top10;

	let specificGenre;
	let top10;
	if (typeSect) {
		specificGenre = filmsDetails?.filter((it) =>
			it?.genres?.some(
				(gen) =>
					gen?.toLowerCase().includes(data?.genreName?.toLowerCase()) ||
					gen
						?.toLowerCase()
						.includes(data?.genreName?.slice(0, 4).toLowerCase()) ||
					gen
						?.toLowerCase()
						.includes(data?.genreName?.slice(0, 3).toLowerCase())
			)
		);
		top10 = specificGenre?.slice(0, 10);
		console.log(top10, "top10");
	}
	useEffect(() => {
		if (!user) {
			navigate("/login", { replace: true });
		}
	}, []);
	useEffect(() => {
		async function fetctDetails() {
			let res1;
			let res2;
			if (cachedMovies) {
				res1 = cachedMovies;
			} else {
				setIsLoading(true);
				res1 = await getMovies("movies");
				setCachedMovies(res1);
			}

			if (cachedShows) {
				res2 = cachedShows;
			} else {
				setIsLoading(true);
				res2 = await getShows();
				setCachedShows(res2);
			}

			const updated = res2?.map((r) => ({
				...r,
				type: "show",
			}));
			if (data?.active === "movies") {
				setFilmsData(res1);
			} else if (data?.active === "tv_shows") {
				setFilmsData(updated);
			} else if (data?.active === "new") {
				setFilmsData([...res1, ...updated]);
			} else if (data?.active === "languages") {
				const temp = groupByLanguage([...res1, ...updated]);

				setFilmsData(temp);
			} else {
				// setFilmsData([])
				// if(cachedUserList){
				// 	setFilmsData(cachedUserList);
				// 	return;
				// }
				setIsLoading(true);
				const cachedProfile =
					JSON.parse(localStorage.getItem("currentProfile")) || {};
				const films = [...res1, ...updated];
				retrieveUserList(cachedProfile?.id).then((res) => {
					const matchingMovies = films?.filter((movie) =>
						res?.includes(movie?.name || movie?.title)
					);
					setCachedUserList(matchingMovies);

					setFilmsData(matchingMovies);
				});
			}

			setIsLoading(false);
		}
		if (!typeSect) fetctDetails();
	}, [data?.active]);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	// console.log(data);

	return (
		<div style={{ position: "relative" }}>
			<HomeNavBar page={data?.active} />
			<h1 className={styles.bHeader}>
				{data?.top10 ? `Top 10 ${data?.genreName}` : `${data?.genreName}`}
			</h1>
			{isLoading ? (
				<LoadingScreen title={"Loading page"} />
			) : (
				<>
					{data?.active !== "languages" && (
						<>
							<div className={styles.moviePage}>
								{!data?.top10 && !typeSect
									? filmsData?.map((film, id) => (
											<Single
												imgUrl={film?.posterLink}
												releaseDate={film?.releaseDate || film?.showReleaseDate}
												watchTime={film?.runtime || film?.totalRuntime}
												views={film?.views || 0}
												show={film?.type}
												key={id}
												title={film?.title}
												movieId={film?.id || id}
												userData={data?.userData}
												detObj={film}
												seasons={film?.numberOfSeasons}
											/>
									  ))
									: !data?.top10 &&
									  specificGenre?.map((film, id) => (
											<Single
												imgUrl={film?.posterLink}
												releaseDate={film?.releaseDate || film?.showReleaseDate}
												watchTime={film?.runtime || film?.totalRuntime}
												views={film?.views || 0}
												show={location?.state?.show}
												key={id}
												title={film?.title}
												movieId={film?.id || id}
												userData={data?.userData}
												detObj={film}
												seasons={film?.numberOfSeasons}
											/>
									  ))}
								{t10 &&
									typeSect &&
									top10?.map((film, id) => (
										<Single
											imgUrl={film?.posterLink}
											releaseDate={film?.releaseDate || film?.showReleaseDate}
											watchTime={film?.runtime || film?.totalRuntime}
											views={film?.views || 0}
											show={location?.state?.show}
											key={id}
											title={film?.title}
											movieId={film?.id || id}
											userData={data?.userData}
											detObj={film}
											seasons={film?.numberOfSeasons}
										/>
									))}
							</div>
							{!typeSect && !t10 && filmsData?.length == 0 && (
								<h2
									style={{
										width: "100%",
										textAlign: "center",
										fontSize: "2.5rem",
									}}
								>
									{data?.active == "my_list"
										? "Added Movies will appear here"
										: "We're still adding content. Stay tuned!"}
								</h2>
							)}
							{typeSect && !t10 && specificGenre?.length == 0 && (
								<h2
									style={{
										width: "100%",
										textAlign: "center",
										fontSize: "2.5rem",
									}}
								>
									We're still adding content. Stay tuned!
								</h2>
							)}
							{typeSect && t10 && top10?.length == 0 && (
								<h2
									style={{
										width: "100%",
										textAlign: "center",
										fontSize: "2.5rem",
									}}
								>
									We're still adding content. Stay tuned!
								</h2>
							)}
						</>
					)}
					{data?.active === "languages" && (
						<>
							{filmsData?.length == 0 && (
								<h2 style={{ width: "100%", textAlign: "center" }}>
									"We're still adding content. Stay tuned!"
								</h2>
							)}
							{filmsData?.map((langFilm) => (
								<div className={styles.langDiv}>
									<h4 style={{ fontSize: "1.2rem" }}>
										{getLanguageName(langFilm?.language)}
									</h4>
									<div className={styles.moviePage}>
										{langFilm?.films?.map((film, id) => (
											<Single
												imgUrl={film?.posterLink}
												releaseDate={film?.releaseDate || film?.showReleaseDate}
												watchTime={film?.runtime || film?.totalRuntime}
												views={film?.views || 0}
												show={film?.type}
												key={id}
												title={film?.title}
												movieId={film?.id || id}
												userData={data?.userData}
												detObj={film}
												seasons={film?.numberOfSeasons}
											/>
										))}
									</div>
								</div>
							))}
						</>
					)}
				</>
			)}
		</div>
	);
}

export default React.memo(BrowseScreen);
