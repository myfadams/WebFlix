import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./browswe.module.css";
import Single from "../components/home/Single";
import { movies } from "../commonJs/common";
import { getMovies, getShows } from "../firebase/database";
import LoadingScreen from "../components/LoadingScreen";
function BrowseScreen() {
	const loction = useLocation();
	const data = loction?.state.browseDetails;
	const filmsDetails = loction?.state?.filmObj;
	const typeSect = loction?.state?.typeSect === "genre";
	const [isLoading, setIsLoading] = useState(false);

	const [filmsData, setFilmsData] = useState([]);
	let specificGenre;
	let top10;
	if (typeSect) {
		specificGenre = filmsDetails?.filter((it) =>
			it?.genres?.some((gen) =>
				gen?.toLowerCase().includes(data?.genreName?.toLowerCase())
			)
		);
		top10 = specificGenre[(0, 10)];
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
			}
			setIsLoading(false)
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
		<div style={{position:"relative"}}>
			<HomeNavBar userDetails={data?.userData} page={data?.active} />
			<h1 className={styles.bHeader}>
				{data?.top10 ? `Top 10 ${data?.genreName}` : `${data?.genreName}`}
			</h1>
			{isLoading?<LoadingScreen title={"Loading page"}/>:
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
								show={loction?.state?.show}
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
							show={loction?.state?.show}
							key={id}
							title={film?.title}
							movieId={film?.id || id}
							userData={data?.userData}
							detObj={film}
							seasons={film?.numberOfSeasons}
						/>
					))}
			</div>}
		</div>
	);
}

export default BrowseScreen;
