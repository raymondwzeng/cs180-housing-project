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
      <input className="button" type="submit" value="Submit input to server" onClick={changeOutputText}/>
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
function changeOutputText(){

  // Minimum and maximum values from all of the sliders
  // We might find a better way of passing these values to the server
  var medianMin = document.getElementsByClassName("median-slider-value-0")[0].innerText;
  var medianMax = document.getElementsByClassName("median-slider-value-1")[0].innerText;
  var longitudeMin = document.getElementsByClassName("longitude-slider-value-0")[0].innerText;
  var longitudeMax = document.getElementsByClassName("longitude-slider-value-1")[0].innerText;
  var latitudeMin = document.getElementsByClassName("latitude-slider-value-0")[0].innerText;
  var latitudeMax = document.getElementsByClassName("latitude-slider-value-1")[0].innerText;

  postFunc('api/test', medianMin);
  document.getElementById("output").innerText = medianMin;

  
}

function postFunc(req, sendText){
  fetch('http://localhost:4000/'+req,{
    method: 'Post',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstParam:sendText
    })
  });
  //return to be implement for handling info
}

function getFunc(req, sendText){
  fetch('http://localhost:4000/'+req,{
    method: 'Get',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstParam:sendText
    })
  });
  //return to be implement for handling info
}

export default App;
