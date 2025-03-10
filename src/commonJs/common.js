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