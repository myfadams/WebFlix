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
