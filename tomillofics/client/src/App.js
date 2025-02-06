import logo from './logo.svg';
import './App.css';
import Ejemplo from './Ejemplo';
import React, {useState} from 'react'

function App() {
    const [num, setNum] = useState(0)

    const handleClick = () =>{
        num === 0 ? setNum(1) : setNum(0)
    }

    return (
        <div className="App">
            <header className={num === 0 ? "App-header-light" : "App-header-dark"}>
                <Ejemplo />
                <img src={logo} className="App-logo" alt="logo" />
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
                </a>
                <button onClick={handleClick}>
                    {num === 0 ? "dark" : "light"}
                </button>
            </header>
        </div>
    );
}

export default App;
