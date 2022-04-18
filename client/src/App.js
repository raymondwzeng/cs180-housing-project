import './App.css';
import './Slider.css'
import ReactSlider from 'react-slider'

function App() {
  // Barebones HTML for the webpage
  return (
    <div className="page-contents">
      <h1>1990 Housing Data Viewer</h1>
      <div className='test'>10</div>
      {/* Two Sided Sliders for all of the data values*/}
      <div className="slider">
        <div className="slider-text">Median House Price</div>
        <TwoSidedSlider className="median-slider" min={0} max={100}/>
      </div>
      <div className="slider">
        <div className="slider-text">Latitude</div>
        <TwoSidedSlider className="latitude-slider" min={0} max={100}/>
      </div>
      <div className="slider">
        <div className="slider-text">Longitude</div>
        <TwoSidedSlider className="longitude-slider" min={0} max={100}/>
      </div>
      <input className="button" type="submit" value="Show all data" onClick={displayAllData}/>
      <p id="output"> Result from server</p>
    </div>
  );
}

// Returns a Slider with two thumbs
function TwoSidedSlider(props) {
  return (
    <ReactSlider
        className={"horizontal-slider " + props.className}
        id={props.id}
        thumbClassName={"slider-thumb " + props.className + "-value"}
        trackClassName="slider-track"
        defaultValue={[props.min, props.max]}
        min={props.min}
        max={props.max}
        ariaLabel={['Lower thumb', 'Upper thumb']}    // aria text for screen readers
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        // onAfterChange={(value, index) =>
        //   console.log(`onAfterChange: ${JSON.stringify({ value, index })}`)
        // }
        // minDistance={1}
      />
  );
}

// This is a placeholder function to test the button's functionality
// Replace with a function that handles a POST request from the client
async function changeOutputText(){
  // Minimum and maximum values from all of the sliders
  // We might find a better way of passing these values to the server
  var medianMin = document.getElementsByClassName("median-slider-value-0")[0].innerText;
  var medianMax = document.getElementsByClassName("median-slider-value-1")[0].innerText;
  var longitudeMin = document.getElementsByClassName("longitude-slider-value-0")[0].innerText;
  var longitudeMax = document.getElementsByClassName("longitude-slider-value-1")[0].innerText;
  var latitudeMin = document.getElementsByClassName("latitude-slider-value-0")[0].innerText;
  var latitudeMax = document.getElementsByClassName("latitude-slider-value-1")[0].innerText;

  let response = await postFunc('api/test', medianMin);
  document.getElementById("output").innerText = response;
}

async function displayAllData() {
  let response = await postFunc('api/neighborhoodList', "test");
  //console.log(response);
  //document.getElementById("output").innerText = response;

  var mainContainer = document.getElementById("output");
  mainContainer.innerText = "";

  var div = document.createElement("div");
  div.innerHTML = 'Median Value|Median Income|Median Age|Total Rooms|Total Bedrooms|Population|Households|Latitude|Longitude|Dist to Coast|LA Dist|SD Dist|SF Dist|SJ DIst|Closest Metro'
  mainContainer.appendChild(div);

  for (var i = 0; i < response.length; i++) {
    // append each neighborhood to our page
    div = document.createElement("div");
    div.innerHTML = response[i]._median_value + ' | ' + response[i]._median_income + ' | ' + response[i]._median_age + ' | '
                  + response[i]._total_rooms + ' | ' + response[i]._total_bedrooms + ' | ' + response[i]._population + ' | '
                  + response[i]._households + ' | ' + response[i]._latitude + ' | ' + response[i]._longitude + ' | ' 
                  + response[i]._distance_to_coast + ' | ' + response[i]._distance_to_LA + ' | ' + response[i]._distance_to_SD
                  + ' ' + response[i]._distance_to_SF + ' | ' + response[i]._distance_to_SJ + ' | ' + response[i]._closest_metro;
    mainContainer.appendChild(div);
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
