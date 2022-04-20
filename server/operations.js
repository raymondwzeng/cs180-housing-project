/*
operations.js

File that stores neighborhoodList in memory. Performs all CRUD operations on neighborhoodList and sends list to other layers
*/

const csv = require('./csv')
let neighborhoodList = []

/*
	Function to get the entire NeighborhoodList array from the csv.
	TODO(?): Figure out a way to store the neighborhoodList in memory so that we don't have to parse the csv file
		every time we want to access data. load() function doesn't take that much time, so might not be worth the effort.
*/
function getNeighborhoodList() {
	neighborhoodList = csv.load()
	return neighborhoodList
}

/*
	Test function to see filtering in action
*/
function filterByAll(constraintArray) {
	if(neighborhoodList.length == 0) {
		getNeighborhoodList();
	}
	// console.log(constraintArray)
	const newList = neighborhoodList
	.filter( element => element.median_value >= constraintArray.minMedianHousePrice)
	.filter( element => element.median_value <= constraintArray.maxMedianHousePrice)
	.filter( element => element.latitude >= constraintArray.minLatitude)
	.filter( element => element.latitude <= constraintArray.maxLatitude)
	.filter( element => element.longitude >= constraintArray.minLongitude)
	.filter( element => element.longitude <= constraintArray.maxLongitude)
	console.log(newList)
	return newList
}

//TODO: Add CRUD operators to modify individual rows in the neighborhoodList

exports.filterByAll = filterByAll;
exports.getNeighborhoodList = getNeighborhoodList;
