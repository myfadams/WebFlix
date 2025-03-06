import React, { useState } from "react";

function DropDown({ list,name }) {
	const [selectedGenre, setSelectedGenre] = useState([]);

	const handleGenreChange = (event) => {
		setSelectedGenre([...selectedGenre, event.target.value]);
	};

	return (
		<select value={selectedGenre[selectedGenre.length-1]} onChange={handleGenreChange} >
			<option value="" disabled>
				Select a genre
			</option>
			{list.map((genre) => (
				<option key={genre} value={genre}>
					{genre}
				</option>
			))}
		</select>
	);
}

export default DropDown;
