import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./browswe.module.css";
import Single from "../components/home/Single";
import { getLanguageName, groupByLanguage, movies } from "../commonJs/common";
import { getMovies, getShows } from "../firebase/database";
import LoadingScreen from "../components/LoadingScreen";
function BrowseScreen() {
	const [filmsData, setFilmsData] = useState([]);
	const location = useLocation();
	const data = location?.state?.browseDetails;
	const filmsDetails = location?.state?.filmObj;
	const typeSect = location?.state?.typeSect === "genre";
	const [isLoading, setIsLoading] = useState(false);

	
	let specificGenre;
	let top10;
	if (typeSect) {
		specificGenre = filmsDetails?.filter((it) =>
			it?.genres?.some((gen) =>
				gen?.toLowerCase().includes(data?.genreName?.toLowerCase())
			)
		);
		top10 = specificGenre?.slice(0, 10)
	}
	useEffect(() => {
		async function fetctDetails() {
			setIsLoading(true);
			const res1 = await getMovies("movies");
			const res2 = await getShows();
			const updated = res2?.map((r) => ({
				...r,
				type: "show",
			}));
			if (data?.active === "movies") {
				
				setFilmsData(res1)
			} else if (data?.active === "tv_shows") {
				
				setFilmsData(updated)
			}else if (data?.active === "new"){
				
				setFilmsData([...res1,...updated]);
			}else if (data?.active === "languages"){
				const temp = groupByLanguage([...res1, ...updated]);
				console.log(temp)
				setFilmsData(temp)
			}else{
				setFilmsData([])
			}
				 
			setIsLoading(false);
		}
		if (!typeSect) fetctDetails();
	}, [data?.active]);

	useEffect(() => {
		window.scroll(0, 0);
	}, [data]);
	// console.log(data);
	const temp = [...movies, ...movies];
	const mTop10 = temp.slice(0, 10);
	return (
		<div style={{ position: "relative" }}>
			<HomeNavBar userDetails={data?.userData} page={data?.active} />
			<h1 className={styles.bHeader}>
				{data?.top10 ? `Top 10 ${data?.genreName}` : `${data?.genreName}`}
			</h1>
			{isLoading ? (
				<LoadingScreen title={"Loading page"} />
			) : (
				<>
					{data?.active !== "languages" && (
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
								: specificGenre?.map((film, id) => (
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
							{data?.top10 &&
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
					)}
					{data?.active === "languages" && (
						<>
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

export default BrowseScreen;
