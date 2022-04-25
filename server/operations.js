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
			OperationsLayer.initializeDataLayer();
		}
		return neighborhoodList
	}

	/*
	Function to get the entire NeighborhoodList array from the csv.
	*/
	static getNeighborhoodList() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return neighborhoodList
	}

	/*
	Function to get the entire NeighborhoodList array from the csv.
	*/
	static initializeDataLayer() {
		if(!isLoaded) {
			neighborhoodList = csv.load("./California_Houses.csv")
			isLoaded = true
		}
	}

	/*
	Test function to see filtering in action
	*/
	static filterByAll(constraintArray) {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
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
	/*
	Delete a neighborhood with the specified id
	*/
	static deleteNeighborhood(id) {
		if(!isLoaded) OperationsLayer.initializeDataLayer();

		// Search through neighborhoodList for the neighborhood with the given id
		for(let i = 0; i < neighborhoodList.length; i++) {
			if(neighborhoodList[i].id == id){
				//delete the neighborhood at index location i
				neighborhoodList.splice(i, 1);
				return 0;
			}	
		}
		return -1;
	}
	
}

//TODO: Add CRUD operators to modify individual rows in the neighborhoodList
exports.OperationsLayer = OperationsLayer