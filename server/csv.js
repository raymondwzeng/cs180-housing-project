/*
csv.js

The main file that handles the reading, writing and manipulation of CSV data.
*/

const fs = require('fs')

let neighborhoodsList = [];

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
function load() {
    const loadString = fs.readFileSync("./California_Houses.csv", {
        encoding: "utf-8"
    }).split('\r\n').forEach( entry => {
        const entryArray = entry.split(',')
        //TODO: Create a new object of class Neighborhood, based on the information, and add to table.
        //There's probably a non-Yandere-dev way to handle this, but perhaps that is for another time.
        //Note: Second condition is to eliminate the titles.
        if(entryArray.length == 14 && !isNaN(Number(entryArray[1]))) {
            const newEntry = {
                median_value: entryArray[0],
                median_income: entryArray[1],
                median_age: entryArray[2],
                total_rooms: entryArray[3],
                total_bedrooms: entryArray[4],
                population: entryArray[5],
                households: entryArray[6],
                latitude: entryArray[7],
                longitude: entryArray[8],
                distance_to_coast: entryArray[9],
                distance_to_LA: entryArray[10],
                distance_to_SD: entryArray[11],
                distance_to_SJ: entryArray[12],
                distance_to_SF: entryArray[13]
            }
            neighborhoodsList.push(newEntry)
        }
    })
    return neighborhoodsList //TODO: Only allow csv.js to manipulate the data. Basically, "close" the DB layer.
}

exports.load = load;