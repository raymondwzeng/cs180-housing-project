import './App.css';

function App() {
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

function changeOutputText(){
  var inputText = document.getElementById("input").value;
  document.getElementById("output").innerText = inputText;
}

export default App;
