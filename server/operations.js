/*
operations.js

File that stores neighborhoodList in memory. Performs all CRUD operations on neighborhoodList and sends list to other layers
*/

const csv = require('./csv')

/*
	Function to get the entire NeighborhoodList array from the csv.
	TODO(?): Figure out a way to store the neighborhoodList in memory so that we don't have to parse the csv file
		every time we want to access data. load() function doesn't take that much time, so might not be worth the effort.
*/
function getNeighborhoodList() {
	return csv.load();
}

exports.getNeighborhoodList = getNeighborhoodList;
