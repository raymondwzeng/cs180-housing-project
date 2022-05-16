import './Data.css';
import TwoSidedSlider from '../components/TwoSidedSlider';
import {useEffect, useState} from 'react'
import Card from '../components/Card';
import AddCard from '../components/AddCard';
import Navbar from '../components/navbar';

const minMedianHousePrice = 0
const maxMedianHousePrice = 500001
const minMedianIncome = 0
const maxMedianIncome = 16
const minMedianAge = 0
const maxMedianAge = 52
const minTotalRooms = 0
const maxTotalRooms = 40000
const minTotalBedrooms= 0
const maxTotalBedrooms = 6500
const minPopulation = 0
const maxPopulation = 36000
const minHouseholds = 0
const maxHouseholds = 6100
const minLatitude = 32
const maxLatitude = 42
const minLongitude = -125
const maxLongitude = -114
const minDistanceToCoast = 0
const maxDistanceToCoast = 334000
const minDistanceToLA = 0
const maxDistanceToLA = 1020000
const minDistanceToSD = 0
const maxDistanceToSD = 1200000
const minDistanceToSJ = 0
const maxDistanceToSJ = 837000
const minDistanceToSF = 0
const maxDistanceToSF = 904000
const minID = 0
const maxID = 21000

export const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let setCardContainerOuter

fetchAllData() //Display data on initial run, when the items are rendered.

function Data() {
  // Functions to get the slider states
  const [medianHousePrice, setMedianHousePrice] = useState([minMedianHousePrice, maxMedianHousePrice])
  const [medianIncome, setMedianIncome] = useState([minMedianIncome, maxMedianIncome])
  const [medianAge, setMedianAge] = useState([minMedianAge, maxMedianAge])
  const [totalRooms, setTotalRooms] = useState([minTotalRooms, maxTotalRooms])
  const [totalBedrooms, setTotalBedrooms] = useState([minTotalBedrooms, maxTotalBedrooms])
  const [population, setPopulation] = useState([minPopulation, maxPopulation])
  const [households, setHouseholds] = useState([minHouseholds, maxHouseholds])
  const [latitude, setLatitude] = useState([minLatitude, maxLatitude])
  const [longitude, setLongitude] = useState([minLongitude, maxLongitude])
  const [distanceToCoast, setDistanceToCoast] = useState([minDistanceToCoast, maxDistanceToCoast])
  const [distanceToLA, setDistanceToLA] = useState([minDistanceToLA, maxDistanceToLA])
  const [distanceToSD, setDistanceToSD] = useState([minDistanceToSD, maxDistanceToSD])
  const [distanceToSJ, setDistanceToSJ] = useState([minDistanceToSJ, maxDistanceToSJ])
  const [distanceToSF, setDistanceToSF] = useState([minDistanceToSF, maxDistanceToSF])
  const [id, setID] = useState([minID, maxID])

  // Functions to get the state of newly created cards
  const [cardContainer, setCardContainer] = useState([])
  const [tempCardContainer, setTempCardContainer] = useState([])
  const [maxShow, setMaxShow] = useState(50)

  setCardContainerOuter = setCardContainer //Pass the method outside so that other functions in the file can control the state

  useEffect(() => {
    console.log("Update on cardcontainer:", cardContainer)
    if(cardContainer.length >= 0) {
      setTempCardContainer(cardContainer.slice(0, maxShow))
    }
  }, [cardContainer, maxShow])

  
  useEffect(() => {
    window.addEventListener('scroll', () => { 
          //Lifted from W3 docs with some modification: https://www.w3docs.com/snippets/javascript/how-to-check-if-user-has-scrolled-to-the-bottom-of-the-page.htm
          if(window.scrollY + window.innerHeight > document.body.clientHeight) {
            if(maxShow < cardContainer.length) {
              setMaxShow(maxShow+Math.min(50, cardContainer.length - tempCardContainer.length))
              setTempCardContainer(cardContainer.slice(0, maxShow))
            }
          }
        }
    )
  }, [cardContainer, tempCardContainer, maxShow])

  /**
   * Updates the data on the server side, specifically /api/cards, with a PATCH request.
   * @param {string} entryId - The id of the element you wish to update.
   * @param {Object} entryState - The JSONified state of the element. You do not need to remove the 'isEditMode' property.
   */
  async function updateData(entryId, entryState) {
    delete entryState['editingEnabled']
    delete entryState['isEditMode'] //Safe delete, remove unused state
    console.log(entryState)
    console.log("Entry", entryId, "updated with", entryState)
    await fetch('http://localhost:4000/api/cards', {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify({
        id: entryId,
        state: entryState
      })})
      .then(response => response.json())
      .then(responseJSON => console.log(responseJSON)) //TODO: Change the existing set of data on the client to the one returned by the server.
      displayAllData(fetchFilteredData(medianHousePrice, medianIncome, medianAge, totalRooms, totalBedrooms, population, households, latitude, longitude, distanceToCoast, distanceToLA, distanceToSD, distanceToSJ, distanceToSF, id))
  }

  /**
   * Sends a DELETE request to /api/cards with the id of entry to remove.
   * @param {string} entryId - The ID of the element you wish to remove.
   */
  async function deleteEntry(entryId) {
    console.log("Entry", entryId, "removed")
    await fetch('http://localhost:4000/api/cards', {
      method: 'DELETE',
      headers: defaultHeaders,
      body: JSON.stringify({
        id: entryId
      })
    }).then(response => response.json())
    .then(responseJSON => console.log(responseJSON)) //TODO: Change the existing set of data on the client to the one returned by the server. 
    displayAllData(fetchFilteredData(medianHousePrice, medianIncome, medianAge, totalRooms, totalBedrooms, population, households, latitude, longitude, distanceToCoast, distanceToLA, distanceToSD, distanceToSJ, distanceToSF, id))
  }


  // Barebones HTML for the webpage
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="page-contents">
        {/* Two Sided Sliders for all of the data values*/}
        <div id='slider-container'>
          <div className="slider">
            <div className="slider-text">Median House Price: [{medianHousePrice[0]}, {medianHousePrice[1]}]</div>
            <TwoSidedSlider className="median-price-slider" min={minMedianHousePrice} max={maxMedianHousePrice} onChange={(medianHousePrice, _) => setMedianHousePrice(medianHousePrice)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Median Income: [{medianIncome[0]}, {medianIncome[1]}]</div>
            <TwoSidedSlider className="median-income-slider" min={minMedianIncome} max={maxMedianIncome} onChange={(medianIncome, _) => setMedianIncome(medianIncome)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Median Age: [{medianAge[0]}, {medianAge[1]}]</div>
            <TwoSidedSlider className="median-age-slider" min={minMedianAge} max={maxMedianAge} onChange={(medianAge, _) => setMedianAge(medianAge)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Total Rooms: [{totalRooms[0]}, {totalRooms[1]}]</div>
            <TwoSidedSlider className="total-rooms-slider" min={minTotalRooms} max={maxTotalRooms} onChange={(totalRooms, _) => setTotalRooms(totalRooms)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Total Bedrooms: [{totalBedrooms[0]}, {totalBedrooms[1]}]</div>
            <TwoSidedSlider className="total-bedrooms-slider" min={minTotalBedrooms} max={maxTotalBedrooms} onChange={(totalBedrooms, _) => setTotalBedrooms(totalBedrooms)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Population: [{population[0]}, {population[1]}]</div>
            <TwoSidedSlider className="population-slider" min={minPopulation} max={maxPopulation} onChange={(population, _) => setPopulation(population)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Households: [{households[0]}, {households[1]}]</div>
            <TwoSidedSlider className="households-slider" min={minHouseholds} max={maxHouseholds} onChange={(households, _) => setHouseholds(households)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Latitude: [{latitude[0]}, {latitude[1]}]</div>
            <TwoSidedSlider className="latitude-slider" min={minLatitude} max={maxLatitude} onChange={(latitude, _) => setLatitude(latitude)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Longitude: [{longitude[0]}, {longitude[1]}]</div>
            <TwoSidedSlider className="longitude-slider" min={minLongitude} max={maxLongitude} onChange={(longitude, _) => setLongitude(longitude)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Distance to Coast: [{distanceToCoast[0]}, {distanceToCoast[1]}]</div>
            <TwoSidedSlider className="distance-to-coast-slider" min={minDistanceToCoast} max={maxDistanceToCoast} onChange={(distanceToCoast, _) => setDistanceToCoast(distanceToCoast)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Distance to LA: [{distanceToLA[0]}, {distanceToLA[1]}]</div>
            <TwoSidedSlider className="distance-to-la-slider" min={minDistanceToLA} max={maxDistanceToLA} onChange={(distanceToLA, _) => setDistanceToLA(distanceToLA)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Distance to San Diego: [{distanceToSD[0]}, {distanceToSD[1]}]</div>
            <TwoSidedSlider className="distance-to-sd-slider" min={minDistanceToSD} max={maxDistanceToSD} onChange={(distanceToSD, _) => setDistanceToSD(distanceToSD)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Distance to San Jose: [{distanceToSJ[0]}, {distanceToSJ[1]}]</div>
            <TwoSidedSlider className="distance-to-sj-slider" min={minDistanceToSJ} max={maxDistanceToSJ} onChange={(distanceToSJ, _) => setDistanceToSJ(distanceToSJ)}/>
          </div>
          <div className="slider">
            <div className="slider-text">Distance to San Francisco: [{distanceToSF[0]}, {distanceToSF[1]}]</div>
            <TwoSidedSlider className="distance-to-sf-slider" min={minDistanceToSF} max={maxDistanceToSF} onChange={(distanceToSF, _) => setDistanceToSF(distanceToSF)}/>
          </div>
          <div className="slider">
            <div className="slider-text">ID: [{id[0]}, {id[1]}]</div>
            <TwoSidedSlider className="id-slider" min={minID} max={maxID} onChange={(id, _) => setID(id)}/>
          </div>
        </div>
      <input className="button" type="submit" value="Show all data" onClick={fetchAllData}/>
      <input className="button" type="submit" value="Show filtered data" onClick={() => fetchFilteredData(medianHousePrice, medianIncome, medianAge, totalRooms, totalBedrooms, population, households, latitude, longitude, distanceToCoast, distanceToLA, distanceToSD, distanceToSJ, distanceToSF, id)}/>
      <p id="output"> Result from server</p>
      <div id='card-container'>
        <AddCard cardContainerSetter={setCardContainer}/>
        {tempCardContainer.map(element => {
          return <Card {...element} editingEnabled={true} updateData={updateData} deleteEntry={deleteEntry}/>
        })}
      </div>
    </div>
    </div>
    
  );
}

async function fetchAllData() {
  displayAllData(await postFunc('api/neighborhoodList', "api/neighborhoodList called"))
}

async function fetchFilteredData(medianHousePrice, medianIncome, medianAge, totalRooms, totalBedrooms, population, households, latitude, longitude, distanceToCoast, distanceToLA, distanceToSD, distanceToSJ, distanceToSF, id) {
  fetch('http://localhost:4000/api/getFilteredData', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      minMedianHousePrice: medianHousePrice[0],
      maxMedianHousePrice: medianHousePrice[1],
      minMedianIncome: medianIncome[0],
      maxMedianIncome: medianIncome[1],
      minMedianAge: medianAge[0],
      maxMedianAge: medianAge[1],
      minTotalRooms: totalRooms[0],
      maxTotalRooms: totalRooms[1],
      minTotalBedrooms: totalBedrooms[0],
      maxTotalBedrooms: totalBedrooms[1],
      minPopulation: population[0],
      maxPopulation: population[1],
      minHouseholds: households[0],
      maxHouseholds: households[1],
      minLatitude: latitude[0],
      maxLatitude: latitude[1],
      minLongitude: longitude[0],
      maxLongitude: longitude[1],
      minDistanceToCoast: distanceToCoast[0],
      maxDistanceToCoast: distanceToCoast[1],
      minDistanceToLA: distanceToLA[0],
      maxDistanceToLA: distanceToLA[1],
      minDistanceToSD: distanceToSD[0],
      maxDistanceToSD: distanceToSD[1],
      minDistanceToSJ: distanceToSJ[0],
      maxDistanceToSJ: distanceToSJ[1],
      minDistanceToSF: distanceToSF[0],
      maxDistanceToSF: distanceToSF[1],
      minID: id[0],
      maxID: id[1]
    })
  }).then(response => response.json())
  .then(response => {
    displayAllData(response)
  })
}

async function displayAllData(response) {
  var mainContainer = document.getElementById("output");
  mainContainer.innerText = "";

  let tempCardContainer = []; //Empty out the cardContainer before injecting new data

  for (var i = 0; i < response.length; i++) {
    response[i].key = response[i]._id
    tempCardContainer.push(response[i])
  }
  setCardContainerOuter(tempCardContainer)
}

async function postFunc(req, sendText){
  try {
    let response = await fetch('http://localhost:4000/'+req,{
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        firstParam:sendText
      })
    })

  //turn the POST response into a json file, and return the firstParam
  
    let data = await response.json()
    return data;
  }
  catch(error) {
    console.error("ERROR: No response from server. Please check if server is running.");
    return "ERROR: No Response From Server";
  }
  
}

export default Data;
