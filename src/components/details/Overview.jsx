import React, { useEffect, useRef, useState } from 'react'
import styles from "./overview.module.css"

import { Rating } from '@mui/material';
import { getLanguageName } from '../../commonJs/common';
import { retrieveReviews } from '../../firebase/database';
function Overview({descprition,releaseDate,cast,genres,director, fType, fCrew, movieGenre, lang, movieRating,film}) {
	// console.log(fCrew)
	const date = new Date(releaseDate);
	const [appRatings,setAppRatings]=useState(0)
	 useEffect(()=>{
		retrieveReviews(film).then((res)=>{
			
			if(res.length<=0){
				
				setAppRatings(0);
				return
			}
			const average =
				res?.reduce((sum, review) => sum + review?.rating, 0) /
				res?.length;
			console.log(average, "average");
			setAppRatings(average)
		}).finally(()=>{
			
		})
		
	   },[])
	
    const movieLanguages = [
			"English",
			"Spanish",
			"French",
			"Mandarin",
			"Hindi",
		];
	const tempGenres=["Horror","SCI-FI", "Action"]
	const tempCast = [
		{
			name: "John Doe",
			character: "Hero",
			profile_path: "/cast/Image1.png",
		},
		{
			name: "Jane Smith",
			character: "Villain",
			profile_path: "/cast/Image2.png",
		},
		{
			name: "Mike Johnson",
			character: "Sidekick",
			profile_path: "/cast/Image3.png",
		},
		{
			name: "Emily Davis",
			character: "Detective",
			profile_path: "/cast/Image4.png",
		},
		{
			name: "Chris Brown",
			character: "Scientist",
			profile_path: "/cast/Image5.png",
		},
	];
	const tempCrew = [
		{
			adult: false,
			gender: 2,
			id: 7467,
			known_for_department: "Directing",
			name: "David Fincher",
			original_name: "David Fincher",
			popularity: 18.514,
			profile_path: "/cast/Image.png",
			credit_id: "52fe4250c3a36847f80149f3",
			department: "Directing",
			job: "Director",
		},
		{
			adult: false,
			gender: 2,
			id: 7468,
			known_for_department: "Writing",
			name: "Jim Uhls",
			original_name: "Jim Uhls",
			popularity: 6.823,
			profile_path: "/cast/Image.png",
			credit_id: "52fe4250c3a36847f80149f7",
			department: "Writing",
			job: "Screenplay",
		},
	];
	let crew;
	if(fCrew)
		crew = [...fCrew];
	else
		crew=[{...director,job:"Director"}]

	const sliderRef = useRef(null);

	const scroll = (direction) => {
		if (sliderRef.current) {
			const scrollAmount = 100;
			sliderRef.current.scrollLeft +=
				direction === "left" ? -scrollAmount : scrollAmount;
		}
	};

  return (
		<div className={styles.mainOver}>
			<div className={styles.overDesc}>
				<h4>Description</h4>
				<p>
					{descprition ||
						"Years after retiring from their formidable ninja lives, a dysfunctional family must return to shadowy missions to counteract a string of looming threats."}
				</p>

				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/calender.png" alt="" />
						Release Year {date.getFullYear() || "2020"}
					</div>
				</div>
				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/lang.png" alt="" />
						Available Languages
					</div>
				</div>
				<div className={styles.lang}>
					{lang
						? lang.map((language, id) => (
								<div key={id}>{getLanguageName(language)}</div>
						  ))
						: movieLanguages.map((language, id) => (
								<div key={id}>{language}</div>
						  ))}
				</div>

				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/Star.png" alt="" />
						Ratings
					</div>
				</div>
				<div className={styles.rating}>
					<div>
						<h4>IMDB</h4>
						<Rating
							name="rating"
							// defaultValue={2.5}
							value={(movieRating / 10) * 5}
							precision={0.5}
							readOnly
							style={{ color: "var(--primary-btn)" }}
							sx={{
								"& .MuiRating-iconEmpty": {
									color: "white", // Sets unfilled stars to white
								},
							}}
							size="small"
						/>
					</div>
					<div>
						<h4>MovieHaven</h4>
						<Rating
							name="rating"
							// defaultValue={2.5}
							value={appRatings}
							precision={0.5}
							readOnly
							style={{ color: "var(--primary-btn)" }}
							sx={{
								"& .MuiRating-iconEmpty": {
									color: "white", // Sets unfilled stars to white
								},
							}}
							size="small"
						/>
					</div>
				</div>

				<div className={styles.releDet}>
					<div>
						{" "}
						<img src="/genre.png" alt="" />
						Genres
					</div>
				</div>
				<div className={styles.lang}>
					{movieGenre
						? movieGenre.map((genre, id) => <div key={id}>{genre}</div>)
						: tempGenres.map((genre, id) => <div key={id}>{genre}</div>)}
				</div>
			</div>
			<div className={styles.cast}>
				<h4>Cast and Crew</h4>
				<div className={styles.crew}>
					{crew
						? crew.map((member, id) => {
								return (
									<div key={id}>
										<h4>{member.job}</h4>
										<div>
											<img
												style={{
													width: "3.5rem",
													height: "3.5rem",
													objectFit: "cover",
													margin: "0.5rem",
													borderRadius: "5px",
													backgroundColor: "var( --input-text)",
												}}
												src={
													member.profile_path
														? `https://image.tmdb.org/t/p/w500${member.profile_path}`
														: "/noProfile.png"
												}
												alt={`picture of ${member.name}`}
											/>
											<p>{member.name}</p>
										</div>
									</div>
								);
						  })
						: tempCrew.map((member, id) => {
								return (
									<div key={id}>
										<h4>{member.job}</h4>
										<div>
											<img
												style={{
													width: "3.5rem",
													height: "3.5rem",
													objectFit: "cover",
													margin: "0.5rem",
													borderRadius: "5px",
													backgroundColor: "var( --input-text)",
												}}
												src={member.profile_path}
												alt={`picture of ${member.name}`}
											/>
											<p>{member.name}</p>
										</div>
									</div>
								);
						  })}
				</div>
				<div className={styles.cas}>
					<div>
						<h4>Cast</h4>{" "}
						<div>
							<button
								onClick={() => {
									scroll("left");
								}}
								className={styles.carou}
							>
								<img src="/moveFwd.png" alt="" />
							</button>
							<button
								onClick={() => {
									scroll("right");
								}}
								className={styles.carou}
							>
								<img src="/moveBck.png" alt="" />
							</button>
						</div>
					</div>
					<div ref={sliderRef}>
						{!cast
							? tempCast.map((member, id) => {
									return (
										<div key={id}>
											<img src={member.profile_path} alt="" />
											<p>{member.name}</p>
										</div>
									);
							  })
							: cast.map((member, id) => {
									return (
										<div key={id} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
											<img
												style={{ height: "5rem", objectFit: "cover" }}
												src={
													fType === "movie"
														? member?.profile_path
															? `https://image.tmdb.org/t/p/w500${member?.profile_path}`
															: "/noProfile.png"
														: member?.image
												}
												alt=""
											/>
											<p>{member.name}</p>
										</div>
									);
							  })}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Overview
