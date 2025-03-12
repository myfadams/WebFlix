import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import HomeNavBar from '../components/navBar/HomeNavBar';
import styles from "./browswe.module.css"
import Single from '../components/home/Single';
import { movies } from '../commonJs/common';
function BrowseScreen() {
  const loction=useLocation();
  const data = loction?.state.browseDetails;

//   console.log(data)
  useEffect(()=>{
		window.scroll(0,0)
		
	},[data])
  console.log(data)
  const temp =[...movies,...movies]
  const mTop10 = temp.slice(0, 10);
  return (
		<div>
			<HomeNavBar userDetails={data?.userData} page={data?.active}/>
			<h1 className={styles.bHeader}>
				{data?.top10 ? `Top 10 ${data?.genreName}` : `${data?.genreName}`}
			</h1>
			<div className={styles.moviePage}>
				{!data?.top10&&
					temp.map(
						(
							{
								imageUrl,
								runtime,
								views,
								genre,
								releaseDate,
								title,
								id: movieId,
							},
							id
						) => (
							<Single
								imgUrl={imageUrl}
								releaseDate={releaseDate}
								watchTime={runtime}
								views={views}
								key={id}
								title={title}
								movieId={movieId}
								userData={data?.userData}
							/>
						)
					)}
				{data?.top10 &&
					mTop10.map(
						(
							{
								imageUrl,
								runtime,
								views,
								genre,
								releaseDate,
								title,
								id: movieId,
							},
							id
						) => (
							<Single
								imgUrl={imageUrl}
								releaseDate={releaseDate}
								watchTime={runtime}
								views={views}
								key={id}
								title={title}
								movieId={movieId}
								userData={data?.userData}
							/>
						)
					)}
			</div>
		</div>
	);
}

export default BrowseScreen
