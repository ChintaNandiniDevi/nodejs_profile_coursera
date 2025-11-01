import logo from './logo.svg';
import './App.css';

function App() {
  const api = () => {
    fetch('http://localhost:3000/api/user/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer`,
        },
      }
    ).then((res) => {
      console.log(res.json(), "res")
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <button onClick={() => {api()}}>api</button>
      </header>
    </div>
  );
}

export default App;
