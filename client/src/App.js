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
async function changeOutputText(){
  var inputText = document.getElementById("input").value;
  let response = await postFunc('api/test', inputText);
  document.getElementById("output").innerText = response;
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
    console.log(data.firstParam);
    return data.firstParam;
  }
  catch(error) {
    console.error("ERROR: No response from server. Please check if server is running.");
    return "ERROR: No Response From Server";
  }
  
}

export default App;
