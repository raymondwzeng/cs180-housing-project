/*
operations.js

File that stores neighborhoodList in memory. Performs all CRUD operations on neighborhoodList and sends list to other layers
*/

const csv = require('./csv')
const Neighborhood = require('./neighborhood') // Required to call Neighborhood constructor

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
				return 0; // addNeighborhood successful.
			}	
		}
		return -1;
	}

	/*
	Add a new neighborhood with the specified data
	*/
	static addNeighborhood(neighborhoodData) {
		if(!isLoaded) initializeDataLayer();

		if(neighborhoodData.length == 14 && !isNaN(Number(neighborhoodData[1]))) {
			neighborhoodData.push(neighborhoodList.at(-1).id + 1) 		// Create a new neighborhood ID by incrementing
            const newNeighborhood = new Neighborhood(neighborhoodData); // Create a new neighborhood with neighborhoodData 
            neighborhoodList.push(newNeighborhood);						// Add the new neighborhood to neighborhoodList
			return 0; // addNeighborhood successful.
        }	
		/*
		// The following else if handles the case where a neighborhood class object is passed into the function.
		// We can choose to use this if we want, or delete it later
		else if(neighborhoodData instanceof Neighborhood) {		// If the neighborhoodData is a Neighborhood
			neighborhoodData.id = neighborhoodList.at(-1).id + 1;
			neighborhoodList.push(neighborhoodData);						
			return 0;
		}
		*/
		return -1; // addNeighborhood failed.
	}

	/*
	Modify the neighborhood with the specified id
	*/
	static updateNeighborhood(neighborhoodData) {
		if(!isLoaded) initializeDataLayer();

		if(neighborhoodData.length == 15 && !isNaN(Number(neighborhoodData[1]))) {
            const newNeighborhood = new Neighborhood(neighborhoodData); // Create a new neighborhood with neighborhoodData 
			for(let i = 0; i < neighborhoodList.length; i++) {
				if(neighborhoodList[i].id == neighborhoodData[14]){ // Find the neighborhood with the specified id
					//Replace the neighborhood at index location i with the newNeighborhood
					neighborhoodList[i] = newNeighborhood;
					return 0; // addNeighborhood successful.
				}	
			}
        }
		return -1; // addNeighborhood failed.
	}
	
}

exports.OperationsLayer = OperationsLayer