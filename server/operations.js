/*
operations.js

File that stores neighborhoodList in memory. Performs all CRUD operations on neighborhoodList and sends list to other layers
*/

const csv = require('./csv')
const Neighborhood = require('./neighborhood') // Required to call Neighborhood constructor

let isLoaded = false
let neighborhoodList = []
let highMedian = []
let lowMedian = []
let closestCoast = []
let highestPop = []

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
	static getHighestPop() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return highestPop
	}	
	static getHighMedianCache() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return highMedian
	}	
	static getLowMedianCache() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return lowMedian
	}	
	static getClosestCoast() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return closestCoast
	}
	/*
	Function to get the entire NeighborhoodList array from the csv.
	*/
	static initializeDataLayer() {
		if(!isLoaded) {
			neighborhoodList = csv.load("./California_Houses.csv")
			isLoaded = true
			this.createMedianCaches();
			this.createCloseCache();
			this.createPopCache();
		}
	}

	static createMedianCaches(){
		neighborhoodList.sort(function(a,b){return a.median_value - b.median_value});
		this.createHighCache();
		this.createLowCache();
		neighborhoodList.sort(function(a,b){return a.id - b.id});
	}

	static createHighCache(){
		highMedian.splice(0,highMedian.length)
		for(let i=0; i<20; i++){
			highMedian.push(neighborhoodList[neighborhoodList.length-1-i]);
		}
	}

	static createLowCache(){
		lowMedian.splice(0,lowMedian.length)
		for(let i=0; i<20; i++){
			lowMedian.push(neighborhoodList[i])
		}
	}

	static createCloseCache(){
		closestCoast.splice(0,closestCoast.length);
		neighborhoodList.sort(function(a,b){return a.distance_to_coast - b.distance_to_coast});
		for(let i=0; i<20; i++){
			closestCoast.push(neighborhoodList[i]);
		}
		neighborhoodList.sort(function(a,b){return a.id - b.id});
	}

	static createPopCache(){
		highestPop.splice(0,highestPop.length);
		neighborhoodList.sort(function(a,b){return b.population - a.population});
		for(let i=0; i<20; i++){
			highestPop.push(neighborhoodList[i]);
		}
		neighborhoodList.sort(function(a,b){return a.id - b.id});
	}

	/*
	Test function to see filtering in action
	*/
	static filterByAll(constraintArray) {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		const newList = neighborhoodList
		.filter( element => element.median_value >= constraintArray.minMedianHousePrice)
		.filter( element => element.median_value <= constraintArray.maxMedianHousePrice)
		.filter( element => element.latitude >= constraintArray.minLatitude)
		.filter( element => element.latitude <= constraintArray.maxLatitude)
		.filter( element => element.longitude >= constraintArray.minLongitude)
		.filter( element => element.longitude <= constraintArray.maxLongitude)
		.filter( element => element.median_income >= constraintArray.minMedianIncome)
		.filter( element => element.median_income <= constraintArray.maxMedianIncome)
		.filter( element => element.median_age >= constraintArray.minMedianAge)
		.filter( element => element.median_age <= constraintArray.maxMedianAge)
		.filter( element => element.total_rooms >= constraintArray.minTotalRooms)
		.filter( element => element.total_rooms <= constraintArray.maxTotalRooms)
		.filter( element => element.total_bedrooms >= constraintArray.minTotalBedrooms)
		.filter( element => element.total_bedrooms <= constraintArray.maxTotalBedrooms)
		.filter( element => element.population >= constraintArray.minPopulation)
		.filter( element => element.population <= constraintArray.maxPopulation)
		.filter( element => element.households >= constraintArray.minHouseholds)
		.filter( element => element.households <= constraintArray.maxHouseholds)
		.filter( element => element.distance_to_coast >= constraintArray.minDistanceToCoast)
		.filter( element => element.distance_to_coast <= constraintArray.maxDistanceToCoast)
		.filter( element => element.distance_to_LA >= constraintArray.minDistanceToLA)
		.filter( element => element.distance_to_LA <= constraintArray.maxDistanceToLA)
		.filter( element => element.distance_to_SD >= constraintArray.minDistanceToSD)
		.filter( element => element.distance_to_SD <= constraintArray.maxDistanceToSD)
		.filter( element => element.distance_to_SJ >= constraintArray.minDistanceToSJ)
		.filter( element => element.distance_to_SJ <= constraintArray.maxDistanceToSJ)
		.filter( element => element.distance_to_SF >= constraintArray.minDistanceToSF)
		.filter( element => element.distance_to_SF <= constraintArray.maxDistanceToSF)
		.filter( element => element.id >= constraintArray.minID)
		.filter( element => element.id <= constraintArray.maxID)
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
				csv.save(neighborhoodList, "California_Houses_Backup.csv");
				return 0; // addNeighborhood successful.
			}	
		}
		return -1;
	}

	/*
	Add a new neighborhood with the specified data
	*/
	static addNeighborhood(neighborhoodData) {
		if(!isLoaded) OperationsLayer.initializeDataLayer();

		if(neighborhoodData.length == 14 && !isNaN(Number(neighborhoodData[1]))) {
			neighborhoodData.push(Number(neighborhoodList.at(-1).id) + 1) 		// Create a new neighborhood ID by incrementing
            const newNeighborhood = new Neighborhood(neighborhoodData); // Create a new neighborhood with neighborhoodData 
			neighborhoodList.push(newNeighborhood);						// Add the new neighborhood to neighborhoodList
			csv.save(neighborhoodList, "California_Houses_Backup.csv");
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
					csv.save(neighborhoodList, "California_Houses_Backup.csv");
					return 0; // addNeighborhood successful.
				}	
			}
        }
		return -1; // addNeighborhood failed.
	}
	
}

exports.OperationsLayer = OperationsLayer