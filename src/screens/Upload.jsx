import React from 'react'

function Upload() {
  return (
		<div className="movie-upload-form">
			<h2>Upload a Movie</h2>
			<form onSubmit={handleSubmit}>
				{/* Title Field */}
				<label>Movie Title:</label>
				<input
					type="text"
					value={movieData.title}
					onChange={(e) =>
						setMovieData({ ...movieData, title: e.target.value })
					}
					onBlur={() => fetchMovieDetails(movieData.title)}
					placeholder="Enter movie title"
					required
				/>

				{/* Description */}
				<label>Description:</label>
				<textarea
					value={movieData.description}
					onChange={(e) =>
						setMovieData({ ...movieData, description: e.target.value })
					}
					placeholder="Movie synopsis"
					required
				/>

				{/* Release Date */}
				<label>Release Date:</label>
				<input
					type="date"
					value={movieData.releaseDate}
					onChange={(e) =>
						setMovieData({ ...movieData, releaseDate: e.target.value })
					}
					required
				/>

				{/* Runtime */}
				<label>Runtime (minutes):</label>
				<input
					type="number"
					value={movieData.runtime}
					onChange={(e) =>
						setMovieData({ ...movieData, runtime: e.target.value })
					}
					required
				/>

				{/* Genres */}
				<label>Genres:</label>
				<input
					type="text"
					value={movieData.genres.join(", ")}
					onChange={(e) =>
						setMovieData({ ...movieData, genres: e.target.value.split(", ") })
					}
					placeholder="Action, Comedy, Drama..."
				/>

				{/* Language */}
				<label>Language:</label>
				<input
					type="text"
					value={movieData.language}
					onChange={(e) =>
						setMovieData({ ...movieData, language: e.target.value })
					}
					required
				/>

				{/* Director */}
				<label>Director:</label>
				<input
					type="text"
					value={movieData.director}
					onChange={(e) =>
						setMovieData({ ...movieData, director: e.target.value })
					}
				/>

				{/* Cast */}
				<label>Cast (Top 5):</label>
				<input
					type="text"
					value={movieData.cast.join(", ")}
					onChange={(e) =>
						setMovieData({ ...movieData, cast: e.target.value.split(", ") })
					}
				/>

				{/* Rating */}
				<label>IMDb Rating:</label>
				<input
					type="number"
					step="0.1"
					value={movieData.rating}
					onChange={(e) =>
						setMovieData({ ...movieData, rating: e.target.value })
					}
				/>

				{/* Trailer URL */}
				<label>Trailer URL:</label>
				<input
					type="url"
					value={movieData.trailer}
					onChange={(e) =>
						setMovieData({ ...movieData, trailer: e.target.value })
					}
				/>

				{/* Poster Upload */}
				<label>Upload Poster:</label>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => handleFileChange(e, "poster")}
					required
				/>

				{/* Backdrop Upload */}
				<label>Upload Backdrop:</label>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => handleFileChange(e, "backdrop")}
					required
				/>

				{/* Movie File Upload */}
				<label>Upload Movie:</label>
				<input
					type="file"
					accept="video/*"
					onChange={(e) => handleFileChange(e, "movieFile")}
					required
				/>

				{/* Submit Button */}
				<button type="submit">
					{loading ? "Fetching Details..." : "Upload Movie"}
				</button>
			</form>
		</div>
	);
}

export default Upload
