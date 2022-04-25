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

exports.load = load;
