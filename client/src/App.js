import './App.css';
import './Slider.css'
import TwoSidedSlider from './TwoSidedSlider';
import {useState} from 'react'
import Card from './Card';

const minMedianHousePrice = 0
const maxMedianHousePrice = 500000
const minLatitudeLongitude = -150
const maxLatitudeLongitude = 150

let cardContainer = []

function App() {
  const [medianHousePrice, setMedianHousePrice] = useState([minMedianHousePrice, maxMedianHousePrice])
  const [latitude, setLatitude] = useState([minLatitudeLongitude, maxLatitudeLongitude])
  const [longitude, setLongitude] = useState([minLatitudeLongitude, maxLatitudeLongitude])

  // Barebones HTML for the webpage
  return (
    <div className="page-contents">
      <h1>1990 Housing Data Viewer</h1>
      <h3>A reminder that today's economy is screwed for the rest of us</h3>
      <div className='test'>Min:{latitude[0]}, Max:{latitude[1]}</div>
      {/* Two Sided Sliders for all of the data values*/}
      <div className="slider">
        <div className="slider-text">Median House Price</div>
        <TwoSidedSlider className="median-slider" min={minMedianHousePrice} max={maxMedianHousePrice} onChange={(medianHousePrice, _) => setMedianHousePrice(medianHousePrice)}/>
      </div>
      <div className="slider">
        <div className="slider-text">Latitude</div>
        <TwoSidedSlider className="latitude-slider" min={minLatitudeLongitude} max={maxLatitudeLongitude} onChange={(latitude, _) => setLatitude(latitude)}/>
      </div>
      <div className="slider">
        <div className="slider-text">Longitude</div>
        <TwoSidedSlider className="longitude-slider" min={minLatitudeLongitude} max={maxLatitudeLongitude} onChange={(longitude, _) => setLongitude(longitude)}/>
      </div>
      <input className="button" type="submit" value="Show all data" onClick={fetchAllData}/>
      <input className="button" type="submit" value="Show filtered data" onClick={() => fetchFilteredData(medianHousePrice, latitude, longitude)}/>
      <p id="output"> Result from server</p>
      <div id='card-container'>
        <div id='header'/>
        {cardContainer}
      </div>
    </div>
  );
}

async function fetchAllData() {
  displayAllData(await postFunc('api/neighborhoodList', "api/neighborhoodList called"))
}

async function fetchFilteredData(medianHousePrice, latitude, longitude) {
  fetch('http://localhost:4000/api/getFilteredData', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
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
    console.log(response)
    displayAllData(response)
  })
}

async function displayAllData(response) {
  console.log(response);

  var mainContainer = document.getElementById("output");
  mainContainer.innerText = "";

  var div = document.createElement("div");
  div.innerHTML = 'ID|Median Value|Median Income|Median Age|Total Rooms|Total Bedrooms|Population|Households|Latitude|Longitude|Dist to Coast|LA Dist|SD Dist|SF Dist|SJ DIst|Closest Metro'
  mainContainer.appendChild(div);

  cardContainer = []; //Empty out the cardContainer before injecting new data

  for (var i = 0; i < response.length; i++) {
    response[i].key = i
    const newCard = Card(response[i])
    cardContainer.push(newCard)
  }
}

async function postFunc(req, sendText){
  try {
    let response = await fetch('http://localhost:4000/'+req,{
      method: 'Post',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam:sendText
      })
    })

  //turn the POST response into a json file, and return the firstParam
  
    let data = await response.json()
    console.log(data);
    return data;
  }
  catch(error) {
    console.error("ERROR: No response from server. Please check if server is running.");
    return "ERROR: No Response From Server";
  }
  
}

export default App;
