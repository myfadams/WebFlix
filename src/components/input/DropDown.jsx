import React, { useState } from "react";
import styles from "./drop.module.css";
function DropDown({ list, name, setValue, values }) {
	const [selectedGenre, setSelectedGenre] = useState(values.genres); // Use a string instead of an array

	const handleGenreChange = (event) => {
		const newGenre = event.target.value;
		if (!selectedGenre.includes(newGenre)) {
			const updatedGenres = [...selectedGenre, newGenre];
			setSelectedGenre(updatedGenres);
			setValue({ ...values, genres: updatedGenres });
		}
		// setSelectedGenre([...selectedGenre, newGenre]);
		// setValue({ ...values, genres: [...values.genres, newGenre] });
		// console.log(values);
	};

	return (
		<div className={styles.select}>
			<select value={""} onChange={handleGenreChange} className={styles.sel}>
				<option value="" disabled>
					Select a genre
				</option>
				{list.map((genre) => (
					<option key={genre} value={genre}>
						{genre}
					</option>
				))}
			</select>
			{selectedGenre.length != 0
				? selectedGenre.join(", ")
				: "Select movie genres"}
		</div>
	);
}

export default DropDown;
