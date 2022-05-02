import './Data.css';
import TwoSidedSlider from '../components/TwoSidedSlider';
import {useEffect, useState} from 'react'
import Card from '../components/Card';
import AddCard from '../components/AddCard';

const minMedianHousePrice = 0
const maxMedianHousePrice = 500000
const minLatitudeLongitude = -150
const maxLatitudeLongitude = 150

export const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let setCardContainerOuter

fetchAllData() //Display data on initial run

function Data() {
  const [medianHousePrice, setMedianHousePrice] = useState([minMedianHousePrice, maxMedianHousePrice])
  const [latitude, setLatitude] = useState([minLatitudeLongitude, maxLatitudeLongitude])
  const [longitude, setLongitude] = useState([minLatitudeLongitude, maxLatitudeLongitude])
  const [cardContainer, setCardContainer] = useState([])
  const [tempCardContainer, setTempCardContainer] = useState([])
  const [maxShow, setMaxShow] = useState(50)

  setCardContainerOuter = setCardContainer //Pass the method outside so that other functions in the file can control the state

  useEffect(() => {
    console.log("Update on cardcontainer:", cardContainer)
    if(cardContainer.length >= 0) {
      setTempCardContainer(cardContainer.slice(0, maxShow))
    }
  }, [cardContainer, tempCardContainer, maxShow])

  
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

    // return () => {
    //   window.removeEventListener('scroll')
    // }
  }, [cardContainer, tempCardContainer, maxShow])

  // Barebones HTML for the webpage
  return (
    <div className="page-contents">
      <h1>1990 Housing Data Viewer</h1>
      <h3>A reminder that today's economy is screwed for the rest of us</h3>
        {/* Two Sided Sliders for all of the data values*/}
        <div id='slider-container'>
        <div className="slider">
          <div className="slider-text">Median House Price: [{medianHousePrice[0]}, {medianHousePrice[1]}]</div>
          <TwoSidedSlider className="median-slider" min={minMedianHousePrice} max={maxMedianHousePrice} onChange={(medianHousePrice, _) => setMedianHousePrice(medianHousePrice)}/>
        </div>
        <div className="slider">
          <div className="slider-text">Latitude: [{latitude[0]}, {latitude[1]}]</div>
          <TwoSidedSlider className="latitude-slider" min={minLatitudeLongitude} max={maxLatitudeLongitude} onChange={(latitude, _) => setLatitude(latitude)}/>
        </div>
        <div className="slider">
          <div className="slider-text">Longitude: [{longitude[0]}, {longitude[1]}]</div>
          <TwoSidedSlider className="longitude-slider" min={minLatitudeLongitude} max={maxLatitudeLongitude} onChange={(longitude, _) => setLongitude(longitude)}/>
        </div>
        </div>
      <input className="button" type="submit" value="Show all data" onClick={fetchAllData}/>
      <input className="button" type="submit" value="Show filtered data" onClick={() => fetchFilteredData(medianHousePrice, latitude, longitude)}/>
      <p id="output"> Result from server</p>
      <div id='card-container'>
        <AddCard cardContainerSetter={setCardContainer}/>
        {tempCardContainer.map(element => {
          return <Card {...element} updateData={updateData} deleteEntry={deleteEntry}/>
        })}
      </div>
    </div>
  );
}

async function fetchAllData() {
  displayAllData(await postFunc('api/neighborhoodList', "api/neighborhoodList called"))
}

/**
 * Updates the data on the server side, specifically /api/cards, with a PATCH request.
 * @param {string} entryId - The id of the element you wish to update.
 * @param {Object} entryState - The JSONified state of the element. You do not need to remove the 'isEditMode' property.
 */
async function updateData(entryId, entryState) {
  delete entryState['isEditMode'] //Safe delete, remove unused state
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
}

async function fetchFilteredData(medianHousePrice, latitude, longitude) {
  fetch('http://localhost:4000/api/getFilteredData', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      minMedianHousePrice: medianHousePrice[0],
      maxMedianHousePrice: medianHousePrice[1],
      minLatitude: latitude[0],
      maxLatitude: latitude[1],
      minLongitude: longitude[0],
      maxLongitude: longitude[1]
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
