/*
csv.js

The main file that handles the reading, writing and manipulation of CSV data.
*/

const fs = require('fs')
const Neighborhood = require('./neighborhood')

/*
Loads the initial CSV file. A bit rigid, but it works /shrug

Current schema (JSON):
{
    median_value
    median_income
    median_age
    total_rooms
    total_bedrooms
    population
    households
    latitude
    longitude
    distance_to_coast
    distance_to_LA
    distance_to_SD
    distance_to_SJ
    distance_to_SF
}
*/
function load(filepath) {
    let neighborhoodsList = [];

    try {
        fs.readFileSync(filepath, {
            encoding: "utf-8"
        }).split('\r\n').forEach( entry => {
            const entryArray = entry.split(',')
            //Note: Second condition is to eliminate the titles.
            if(entryArray.length == 15 && !isNaN(Number(entryArray[1]))) {
                const newNeighborhood = new Neighborhood(entryArray)
                neighborhoodsList.push(newNeighborhood)
            }
        })
        return neighborhoodsList //TODO: Only allow csv.js to manipulate the data. Basically, "close" the DB layer.
    }catch(error){
        return 'File not found!';
    }   
}
/**
 * Saves the existing (memory) data onto disk.
 * @param {Object} data - The data to store. Expects an array of neighborhood objects.
 * @param {string} filename - The filename to store.
 */
function save(data, filename) {
    let dataString = "Median_House_Value,Median_Income,Median_Age,Tot_Rooms,Tot_Bedrooms,Population,Households,Latitude,Longitude,Distance_to_coast,Distance_to_LA,Distance_to_SanDiego,Distance_to_SanJose,Distance_to_SanFrancisco,ID \r\n"
    data.forEach(element => {
        const elementList = [element.median_value, element.median_income, element.median_age, element.total_rooms, element.total_bedrooms, element.population, element.households, element.latitude, element.longitude, element.distance_to_coast, element.distance_to_LA, element.distance_to_SD, element.distance_to_SJ, element.distance_to_SF, element.id]
        dataString += elementList.map(element => Number(element)).toString() + "\r\n"
    })
    try {
        fs.writeFileSync(filename, dataString)
    } catch (error) {
        console.warn(error)
    }
}
exports.save = save
exports.load = load;
