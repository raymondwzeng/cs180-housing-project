import './App.css';

function App() {
  // Barebones HTML for the webpage
  return (
    <div className="main-container">
    <h1>Client Webpage</h1>
    <form>
      <label>
        <input type="text" id="input" placeholder="Input" />
      </label>
    </form>
    <input type="submit" value="Submit input to server" onClick={changeOutputText}/>
    <p id="output"> Result from server</p>
    </div>
  );
}

// This is a placeholder function to test the button's functionality
// Replace with a function that handles a POST request from the client
function changeOutputText(){
  var inputText = document.getElementById("input").value;
  postFunc('api/test', inputText);
  localStorage.setItem("text", inputText);  // saves the item
  document.getElementById("output").innerText = inputText;
}
// function retrieve(){
//   var text=localStorage.getItem("text");  // retrieve
//   document.getElementById('testDiv').innerHTML = text;  // display
// }
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

  }
  // fetch('http://localhost:4000/'')
  // .then(response => response.json())
  // .then(data => console.log(data));
  
  
  );
  //return to be implement for handling info
  //retrieve();
  // console.log(response.resolve().json().body);
}

export default App;
