/*
operations.js

File that stores neighborhoodList in memory. Performs all CRUD operations on neighborhoodList and sends list to other layers
*/

const csv = require('./csv')
const Neighborhood = require('./neighborhood') // Required to call Neighborhood constructor

let isLoaded = false
let neighborhoodList = []
let highestValueCache = []
let lowestValueCache = []
let closestCoastCache = []
let highestPopulationCache = []

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

	// Functions to return min and max value from the cache
	static getHighestPopulationCache() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return highestPopulationCache
	}	
	static getHighestValueCache() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return highestValueCache
	}	
	static getLowestValueCache() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return lowestValueCache
	}	
	static getClosestCoastCache() {
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		return closestCoastCache
	}
	/*
	Function to get the entire NeighborhoodList array from the csv.
	*/
	static initializeDataLayer() {
		if(!isLoaded) {
			neighborhoodList = csv.load("./California_Houses.csv")
			isLoaded = true
			this.createCaches();
		}
	}

	static createMedianCaches(){
		neighborhoodList.sort(function(a,b){return a.median_value - b.median_value});
		this.createHighCache();
		this.createLowCache();
		neighborhoodList.sort(function(a,b){return a.id - b.id});
	}

	static createHighCache(){
		highestValueCache.splice(0,highestValueCache.length)
		for(let i=0; i<20; i++){
			highestValueCache.push(neighborhoodList[neighborhoodList.length-1-i]);
		}
	}

	static createLowCache(){
		lowestValueCache.splice(0,lowestValueCache.length)
		for(let i=0; i<20; i++){
			lowestValueCache.push(neighborhoodList[i])
		}
	}

	static createCloseCache(){
		closestCoastCache.splice(0,closestCoastCache.length);
		neighborhoodList.sort(function(a,b){return a.distance_to_coast - b.distance_to_coast});
		for(let i=0; i<20; i++){
			closestCoastCache.push(neighborhoodList[i]);
		}
		neighborhoodList.sort(function(a,b){return a.id - b.id});
	}

	static createPopCache(){
		highestPopulationCache.splice(0,highestPopulationCache.length);
		neighborhoodList.sort(function(a,b){return b.population - a.population});
		for(let i=0; i<20; i++){
			highestPopulationCache.push(neighborhoodList[i]);
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
				csv.save(neighborhoodList, "California_Houses_Backup.csv");
				// Search caches for the deleted value and update them if needed
				this.updateCacheDelete(neighborhoodList[i], highestValueCache);
				this.updateCacheDelete(neighborhoodList[i], lowestValueCache);
				this.updateCacheDelete(neighborhoodList[i], highestPopulationCache);
				this.updateCacheDelete(neighborhoodList[i], closestCoastCache);

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
		if(!isLoaded) OperationsLayer.initializeDataLayer();

		if(neighborhoodData.length == 14 && !isNaN(Number(neighborhoodData[1]))) {
			neighborhoodData.push(Number(neighborhoodList.at(-1).id) + 1) 		// Create a new neighborhood ID by incrementing
            const newNeighborhood = new Neighborhood(neighborhoodData); // Create a new neighborhood with neighborhoodData 
			neighborhoodList.push(newNeighborhood);						// Add the new neighborhood to neighborhoodList
			this.updateCacheAdd(newNeighborhood); // Update the cache
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
		if(!isLoaded) OperationsLayer.initializeDataLayer();
		if(neighborhoodData.length == 15 && !isNaN(Number(neighborhoodData[1]))) {
            const newNeighborhood = new Neighborhood(neighborhoodData); // Create a new neighborhood with neighborhoodData 
			for(let i = 0; i < neighborhoodList.length; i++) {
				if(neighborhoodList[i].id == neighborhoodData[14]){ // Find the neighborhood with the specified id
					//Replace the neighborhood at index location i with the newNeighborhood
					this.updateCacheUpdate(newNeighborhood);
					neighborhoodList[i] = newNeighborhood;
					csv.save(neighborhoodList, "California_Houses_Backup.csv");
					return 0; // addNeighborhood successful.
				}	
			}
        }
		return -1; // addNeighborhood failed.
	}

	static createCaches() {
		this.createMedianCaches();
		this.createCloseCache();
		this.createPopCache();
	}

	// Check to see if the cache needs to be updated, and do so
	static updateCacheDelete(neighborhood, cache) {
		for(let i = 0; i < cache.length; i++) {
			if(neighborhood.id == cache[i].id) {
				cache.splice(i, 1); // Delete value from cache

				if(cache.length < 10) {
					this.createCaches();
				}
					
				break;
			}
		}
	}

	static updateCacheAdd(neighborhood) {
		for(let i = 0; i < highestValueCache.length; i++) {
			if(neighborhood.median_value > highestValueCache[i].median_value) {
				highestValueCache.splice(i, 0, neighborhood); // Add a new value to the cache
				break;
			}
		}
		for(let i = 0; i < lowestValueCache.length; i++) {
			if(neighborhood.median_value < lowestValueCache[i].median_value) {
				lowestValueCache.splice(i, 0, neighborhood); // Add a new value to the cache
				break;
			}
		}
		for(let i = 0; i < closestCoastCache.length; i++) {
			if(neighborhood.distance_to_coast < closestCoastCache[i].distance_to_coast) {
				closestCoastCache.splice(i, 0, neighborhood); // Add a new value to the cache
				break;
			}
		}
		for(let i = 0; i < highestPopulationCache.length; i++) {
			if(neighborhood.population > highestPopulationCache[i].population) {
				highestPopulationCache.splice(i, 0, neighborhood); // Add a new value to the cache
				break;
			}
		}
	}

	static updateCacheUpdate(neighborhood) {
		this.updateCacheDelete(neighborhood, highestValueCache);
		this.updateCacheDelete(neighborhood, lowestValueCache);
		this.updateCacheDelete(neighborhood, highestPopulationCache);
		this.updateCacheDelete(neighborhood, closestCoastCache);
		this.updateCacheAdd(neighborhood);
	}
	
}

exports.OperationsLayer = OperationsLayer