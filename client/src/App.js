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
    <input type="submit" value="Submit input to server" onClick={DoSomething}/>
    <p id="output"> Result from server</p>
    </div>
  );
}

function DoSomething(){
  console.log('You clicked submit.');
}

export default App;
