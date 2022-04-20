/*
operations.js

File that stores neighborhoodList in memory. Performs all CRUD operations on neighborhoodList and sends list to other layers
*/

const csv = require('./csv')

let isLoaded = false
let neighborhoodList = []
class OperationsLayer {
	//Singleton constructor. If data already loaded, then return the list. Otherwise, load the list.
	constructor() {
		if(!isLoaded) {
			neighborhoodList = csv.load()
			isLoaded = true
		}
		return neighborhoodList
	}

	/*
	Function to get the entire NeighborhoodList array from the csv.
	*/
	static getNeighborhoodList() {
		return neighborhoodList
	}

	/*
	Test function to see filtering in action
	*/
	static filterByAll(constraintArray) {
		if(!isLoaded) initializeDataLayer();
		// console.log(constraintArray)
		const newList = neighborhoodList
		.filter( element => element.median_value >= constraintArray.minMedianHousePrice)
		.filter( element => element.median_value <= constraintArray.maxMedianHousePrice)
		.filter( element => element.latitude >= constraintArray.minLatitude)
		.filter( element => element.latitude <= constraintArray.maxLatitude)
		.filter( element => element.longitude >= constraintArray.minLongitude)
		.filter( element => element.longitude <= constraintArray.maxLongitude)
		return newList
	}
	
}

//TODO: Add CRUD operators to modify individual rows in the neighborhoodList
exports.OperationsLayer = OperationsLayer