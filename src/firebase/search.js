// searchHelper.js
import { ref, get } from "firebase/database";
import { database } from "./config";

export const searchEntries = async (searchTerm, collection) => {
	try {
		const dbRef = ref(database, collection);
		const snapshot = await get(dbRef);
		const data = snapshot.val();
		const results = [];
		for (const key in data) {
			
			// console.log(key)
			if (
				key&&
				key?.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				let res;
				if(collection==="movies"){
					const k= Object.keys(data[key])[0]
					res={...data[key][k],id:k}
					results.push(res)
				}else{
					results.push({ ...data[key] });
					
				}
			}
		}
		// console.log(results)
		return results;
	} catch (error) {
		console.error("Error searching entries:", error);
		return [];
	}
};

export const sortBySearchTerm = (array, searchTerm) => {
	const lowerSearchTerm = searchTerm.toLowerCase();

	return array.sort((a, b) => {
		const aText = (a.name || a.title || "").toLowerCase();
		const bText = (b.name || b.title || "").toLowerCase();

		const scoreA = getMatchScore(aText, lowerSearchTerm);
		const scoreB = getMatchScore(bText, lowerSearchTerm);

		// Sort by relevance score, then alphabetically as a tie-breaker
		return scoreB - scoreA || aText.localeCompare(bText);
	});
};

// Function to rank matches
const getMatchScore = (text, search) => {
	if (!text) return 0; // Handle missing name/title gracefully

	if (text === search) return 5; // Exact match (highest priority)
	if (text.startsWith(search)) return 4; // Starts with search term
	if (text.includes(search)) return 3; // Contains search term
	return getSimilarityScore(text, search); // Approximate match
};
