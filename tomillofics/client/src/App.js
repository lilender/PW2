import './App.css';
import React, {useState} from 'react'
import Registro from './Registro';

function App() {
    const [num, setNum] = useState(0)

    const handleClick = () =>{
        num === 0 ? setNum(1) : setNum(0)
    }

    return (
        <div className="App">
            <header className={num === 0 ? "App-header-light" : "App-header-dark"}>
                <Registro />
                <br />
                <button onClick={handleClick}>
                    {num === 0 ? "dark" : "light"}
                </button>
            </header>
        </div>
    );
}

export default App;
