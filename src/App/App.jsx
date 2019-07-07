import React from 'react';
import './App.css';
import Game from '../Game/Game';
// import AppHeader from './AppHeader';

function App() {
    return (
        <div className="App">
            {/* <AppHeader /> */}
            <Game Size={8} />
        </div>
    );
}

export default App;
