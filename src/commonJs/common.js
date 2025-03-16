export default  function formatViews(views) {
	if (views >= 1_000_000) {
		return (views / 1_000_000).toFixed(1) + "M";
	} else if (views >= 1_000) {
		return (views / 1_000).toFixed(1) + "K";
	} else {
		return views.toString();
	}
}
export function formatRuntime(minutes) {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	if (hours > 0 && mins > 0) {
		return `${hours}h ${mins}m`;
	} else if (hours > 0) {
		return `${hours}h`;
	} else {
		return `${mins}m`;
	}
}
export function formatDate(dateString) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(dateString);
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
}

export const seasons = [
  {
    season: 1,
    episodes: [
      {
        title: "Pilot",
        description: "The beginning of an epic journey as our hero faces their first challenge.",
        cover: "/tem/image.png"
      },
      {
        title: "Into the Unknown",
        description: "New allies are made, but danger lurks in the shadows.",
        cover: "/tem/image.png"
      },
      {
        title: "The Reckoning",
        description: "A shocking revelation turns everything upside down.",
        cover: "/tem/image.png"
      }
    ]
  },
  {
    season: 2,
    episodes: [
      {
        title: "A New Threat",
        description: "Just when things seem calm, a new enemy emerges.",
        cover: "/tem/image.png"
      },
      {
        title: "Betrayal Within",
        description: "An unexpected betrayal shakes the team's trust.",
        cover: "/tem/image.png"
      },
      {
        title: "Rise Again",
        description: "With the odds stacked against them, they must find the strength to fight back.",
        cover: "/tem/image.png"
      }
    ]
  },
  {
    season: 3,
    episodes: [
      {
        title: "Darkest Hour",
        description: "The team faces their most difficult challenge yet.",
        cover: "/tem/image.png"
      },
      {
        title: "Final Stand",
        description: "Everything has led to this moment—the battle for survival begins.",
        cover: "/tem/image.png"
      },
      {
        title: "New Dawn",
        description: "As the dust settles, a new era begins.",
        cover: "/tem/image.png"
      },
      {
        title: "Epilogue",
        description: "Reflections on the past and a glimpse into the future.",
        cover: "/tem/image.png"
      }
    ]
  }
];


export const formatMovieTime = (seconds) => {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);
	return `${hrs > 0 ? hrs + ":" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};




export const movieGenres = [
	{ id: 1, name: "Action" },
	{ id: 2, name: "Adventure" },
	{ id: 3, name: "Comedy" },
	{ id: 4, name: "Crime" },
	{ id: 5, name: "Drama" },
	{ id: 6, name: "Fantasy" },
	{ id: 7, name: "Historical" },
	{ id: 8, name: "Horror" },
	{ id: 9, name: "Mystery" },
	{ id: 10, name: "Romance" },
	{ id: 11, name: "Sci-Fi" },
	{ id: 12, name: "Thriller" },
	{ id: 13, name: "Western" },
	{ id: 14, name: "Animation" },
	{ id: 15, name: "Documentary" },
];
export const movies = [
	{
		id: 1,
		title: "The Dark Knight",
		genre: "Action",
		runtime: 152,
		views: 2500000,
		releaseDate: "2008-07-18",
		imageUrl: "/temp/Image.png",
	},
	{
		id: 2,
		title: "Inception",
		genre: "Sci-Fi",
		runtime: 148,
		views: 3200000,
		releaseDate: "2010-07-16",
		imageUrl: "/temp/Image1.png",
	},
	{
		id: 3,
		title: "The Godfather",
		genre: "Crime",
		runtime: 175,
		views: 1800000,
		releaseDate: "1972-03-24",
		imageUrl: "/temp/Image2.png",
	},
	{
		id: 4,
		title: "Titanic",
		genre: "Romance",
		runtime: 195,
		views: 4000000,
		releaseDate: "1997-12-19",
		imageUrl: "/temp/Image.png",
	},
	{
		id: 5,
		title: "Interstellar",
		genre: "Sci-Fi",
		runtime: 169,
		views: 2900000,
		releaseDate: "2014-11-07",
		imageUrl: "/temp/Image1.png",
	},
	{
		id: 6,
		title: "Joker",
		genre: "Drama",
		runtime: 122,
		views: 2200000,
		releaseDate: "2019-10-04",
		imageUrl: "/temp/Image2.png",
	},
	{
		id: 7,
		title: "Gladiator",
		genre: "Historical",
		runtime: 155,
		views: 1500000,
		releaseDate: "2000-05-05",
		imageUrl: "/temp/Image.png",
	},
	{
		id: 8,
		title: "Avengers: Endgame",
		genre: "Action",
		runtime: 181,
		views: 5000000,
		releaseDate: "2019-04-26",
		imageUrl: "/temp/Image1.png",
	},
	{
		id: 9,
		title: "The Conjuring",
		genre: "Horror",
		runtime: 112,
		views: 1700000,
		releaseDate: "2013-07-19",
		imageUrl: "/temp/Image2.png",
	},
	{
		id: 10,
		title: "Frozen",
		genre: "Animation",
		runtime: 102,
		views: 3100000,
		releaseDate: "2013-11-27",
		imageUrl: "/temp/Image.png",
	},
];
export const shows = [
	{
		id: 1,
		title: "Breaking Bad",
		genre: "Crime",
		seasons: 5,
		views: 4500000,
		totalWatchTime: 3150,
		releaseDate: "2008-01-20",
		imageUrl: "/temp/show1.png",
	}, // 5 seasons * 13 episodes * 45 min
	{
		id: 2,
		title: "Stranger Things",
		genre: "Sci-Fi",
		seasons: 4,
		views: 5200000,
		totalWatchTime: 1800,
		releaseDate: "2016-07-15",
		imageUrl: "/temp/show2.png",
	}, // 4 * 9 * 50 min
	{
		id: 3,
		title: "Game of Thrones",
		genre: "Fantasy",
		seasons: 8,
		views: 6800000,
		totalWatchTime: 4300,
		releaseDate: "2011-04-17",
		imageUrl: "./temp/show3.png",
	}, // 8 * 10 * 54 min
	{
		id: 4,
		title: "The Office",
		genre: "Comedy",
		seasons: 9,
		views: 3900000,
		totalWatchTime: 4500,
		releaseDate: "2005-03-24",
		imageUrl: "./temp/Image.png",
	}, // 9 * 22 * 23 min
	{
		id: 5,
		title: "Money Heist",
		genre: "Crime",
		seasons: 5,
		views: 3100000,
		totalWatchTime: 2400,
		releaseDate: "2017-05-02",
		imageUrl: "/temp/show4.png",
	}, // 5 * 10 * 48 min
	{
		id: 6,
		title: "The Mandalorian",
		genre: "Sci-Fi",
		seasons: 3,
		views: 2700000,
		totalWatchTime: 1200,
		releaseDate: "2019-11-12",
		imageUrl: "/temp/show1.png",
	}, // 3 * 8 * 50 min
	{
		id: 7,
		title: "Friends",
		genre: "Comedy",
		seasons: 10,
		views: 5900000,
		totalWatchTime: 5000,
		releaseDate: "1994-09-22",
		imageUrl: "/temp/show2.png",
	}, // 10 * 24 * 22 min
	{
		id: 8,
		title: "Peaky Blinders",
		genre: "Crime",
		seasons: 6,
		views: 3300000,
		totalWatchTime: 2160,
		releaseDate: "2013-09-12",
		imageUrl: "/temp/Image1.png",
	}, // 6 * 6 * 60 min
	{
		id: 9,
		title: "The Witcher",
		genre: "Fantasy",
		seasons: 3,
		views: 2800000,
		totalWatchTime: 1350,
		releaseDate: "2019-12-20",
		imageUrl: "/temp/show3.png",
	}, // 3 * 8 * 56 min
	{
		id: 10,
		title: "Sherlock",
		genre: "Mystery",
		seasons: 4,
		views: 3500000,
		totalWatchTime: 1440,
		releaseDate: "2010-07-25",
		imageUrl: "/temp/show4.png",
	}, // 4 * 3 * 120 min
];

export const newReleases = [
	{
		id: 1,
		title: "The Dark Knight",
		type: "Movie",
		genre: "Action",
		runtime: 152,
		views: 2500000,
		releaseDate: "2008-07-18",
		imageUrl: "./temp/Image1.png",
	},
	{
		id: 2,
		title: "Breaking Bad",
		type: "Show",
		genre: "Crime",
		seasons: 5,
		views: 4500000,
		totalWatchTime: 3150,
		releaseDate: "2008-01-20",
		imageUrl: "./temp/show2.png",
	},
	{
		id: 3,
		title: "Interstellar",
		type: "Movie",
		genre: "Sci-Fi",
		runtime: 169,
		views: 2900000,
		releaseDate: "2014-11-07",
		imageUrl: "./temp/Image2.png",
	},
	{
		id: 4,
		title: "Stranger Things",
		type: "Show",
		genre: "Sci-Fi",
		seasons: 4,
		views: 5200000,
		totalWatchTime: 1800,
		releaseDate: "2016-07-15",
		imageUrl: "./temp/show4.png",
	},
	{
		id: 5,
		title: "Money Heist",
		type: "Show",
		genre: "Crime",
		seasons: 5,
		views: 3100000,
		totalWatchTime: 2400,
		releaseDate: "2017-05-02",
		imageUrl: "./temp/show1.png",
	},
	{
		id: 6,
		title: "Titanic",
		type: "Movie",
		genre: "Romance",
		runtime: 195,
		views: 4000000,
		releaseDate: "1997-12-19",
		imageUrl: "./temp/Image1.png",
	},
	{
		id: 7,
		title: "Game of Thrones",
		type: "Show",
		genre: "Fantasy",
		seasons: 8,
		views: 6800000,
		totalWatchTime: 4300,
		releaseDate: "2011-04-17",
		imageUrl: "./temp/show3.png",
	},
	{
		id: 8,
		title: "Joker",
		type: "Movie",
		genre: "Drama",
		runtime: 122,
		views: 2200000,
		releaseDate: "2019-10-04",
		imageUrl: "./temp/Image.png",
	},
	{
		id: 9,
		title: "Sherlock",
		type: "Show",
		genre: "Mystery",
		seasons: 4,
		views: 3500000,
		totalWatchTime: 1440,
		releaseDate: "2010-07-25",
		imageUrl: "./temp/show2.png",
	},
	{
		id: 10,
		title: "The Witcher",
		type: "Show",
		genre: "Fantasy",
		seasons: 3,
		views: 2800000,
		totalWatchTime: 1350,
		releaseDate: "2019-12-20",
		imageUrl: "./temp/show4.png",
	},
];


export function getLanguageName(code) {
	const languageMap = {
		en: "English",
		zh: "Chinese",
		hi: "Hindi",
		es: "Spanish",
		fr: "French",
		ar: "Arabic",
		bn: "Bengali",
		ru: "Russian",
		pt: "Portuguese",
		ja: "Japanese",
		de: "German",
		ko: "Korean",
		te: "Telugu",
		ta: "Tamil",
		mr: "Marathi",
		tr: "Turkish",
		pa: "Punjabi",
		it: "Italian",
		ur: "Urdu",
		fa: "Persian",
		pl: "Polish", 

		nl: "Dutch",
		sv: "Swedish",
		he: "Hebrew",
		th: "Thai",
		vi: "Vietnamese",
		el: "Greek",
		cs: "Czech",
		hu: "Hungarian",
		id: "Indonesian",
		ro: "Romanian",
	};

	return languageMap[code] || code;
}

export function convertToEmbedURL(url) {
	const urlObj = new URL(url);
	const videoID = urlObj.searchParams.get("v");

	if (!videoID) {
		return "Invalid YouTube URL";
	}

	return `https://www.youtube.com/embed/${videoID}?fs=0`;
}


export function shuffleArray(array) {
	for (let i = array?.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
}

export function get4Covers(array, genre) {
	let selected = array
		?.filter((item) =>
			item.genres.some((it) => it.toLowerCase().includes(genre.toLowerCase()))
		)
		.slice(0, 4);

	if (selected?.length < 4) {
		// Get movies that are NOT already selected
		let remainingMovies = array.filter((item) => !selected.includes(item));

		// Shuffle the remaining movies
		for (let i = remainingMovies?.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[remainingMovies[i], remainingMovies[j]] = [
				remainingMovies[j],
				remainingMovies[i],
			];
		}

		// Add enough unique movies to reach 4
		selected = [...selected, ...remainingMovies.slice(0, 4 - selected.length)];
	}

	return selected;
}

export function groupByLanguage(array) {
  const grouped = array.reduce((acc, item) => {
    const lang = item.language; // Get the language key
    let group = acc.find((g) => g.language === lang);

    if (!group) {
      group = { language: lang, films: [] };
      acc.push(group);
    }

    group.films.push(item);
    return acc;
  }, []);

  return grouped;
}