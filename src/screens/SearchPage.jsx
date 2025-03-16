import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HomeNavBar from "../components/navBar/HomeNavBar";
import styles from "./search.module.css";
import Loading from "../components/video/Loading";
import { searchEntries, sortBySearchTerm} from "../firebase/search";
import Single from "../components/home/Single";
function SearchPage() {
	const location = useLocation();
	const active = location?.state?.active;
	const uData = location?.state?.userData;
	const [searchResults, setSearchResults] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
  const [s,setS]=useState("")
	const handleSearch = async () => {
		if (searchTerm.trim() !== "") {
			setIsLoading(true);
			const res1 = await searchEntries(searchTerm, "movies");
			const res2 = await searchEntries(searchTerm, "shows");

			const updated = res2?.map((r) => ({
				...r,
				type: "show",
			}));
			setSearchResults(sortBySearchTerm([...res1, ...updated],searchTerm));
      setS(searchTerm)
			setIsLoading(false);
		}
		setIsLoading(false);
	};
	return (
		<div>
			<HomeNavBar isActive={active} userDetails={uData} />
			<div className={styles.mainSearch}>
				<div style={{width:"100%"}}>
					<h1>{s.trim()!==""?`Results for "${s}"`:"Search"}</h1>
				</div>
				<div className={styles.searchDiv}>
					{isLoading && <Loading styles={{ width: "20px", height: "20px" }} />}
					<input
						type="text"
						placeholder="Find any movie or show"
						enterKeyHint="Search"
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
						value={searchTerm}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
					/>
				</div>
				<div className={styles.moviePage}>
					{searchResults?.map((film, id) => {
						return (
							// <h1>{film?.name||film?.title}</h1>
							<Single
								imgUrl={film?.posterLink}
								releaseDate={film?.releaseDate || film?.showReleaseDate}
								watchTime={film?.runtime || film?.totalRuntime}
								views={film?.views || 0}
								show={film?.type}
								key={id}
								title={film?.title}
								movieId={film?.id || id}
								userData={uData}
								detObj={film}
								seasons={film?.numberOfSeasons}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SearchPage;
