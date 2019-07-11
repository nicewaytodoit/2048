import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Game from '../Game/Game';
// import AppHeader from './AppHeader';

const sizes = [
    { text:'Small', value: 3 },
    { text:'Normal', value: 4 },
    { text:'Big', value: 5 },
    { text:'Bigger', value: 6 },
    { text:'Very Big', value: 7 },
    { text:'Large', value: 8 },
    { text:'Larger', value: 9 },
    { text:'Very Large', value: 10 },
    { text:'Why man, why?!', value: 11 },
];

const SelectControl = ({ GridSize, HandleChange }) => (
    <select selected={GridSize} onChange={HandleChange}>
        <option key="k-0" value={0}>Please Select</option>
        {sizes.map((item) =><option key={`k-${item.value}-${item.value}`} value={item.value}>{item.text} - {item.value} x {item.value}</option>)}
    </select>
);

SelectControl.propTypes = {
    GridSize: PropTypes.number.isRequired,
    HandleChange: PropTypes.func.isRequired,
};

class App extends React.Component {
    state = {
        GridSize: 0,
        GameState: false,
    };

    ValueChange = (e) => {
        const val = e.target.value;
        this.setState(() => ({ GridSize: Number.parseInt(val)}));
    }
    
    StartGame = () => {
        this.setState((prev) => {
            const state = !!prev.GridSize;
            return { GameState: state };
        });
    }

    render() {
        const { GridSize, GameState } = this.state;



        return (
            <div className="App">
                {!GameState && (
                    <div className="StartScreen">
                        <span> ( ? ) </span>
                        <span> Settings </span>
                        <SelectControl GridSize={GridSize} HandleChange={this.ValueChange} />
                        <button type="button" onClick={this.StartGame}>Start Game</button>
                        <button type="button">Leaderboard</button>
                    </div>
                )}
                {GameState && <Game Size={GridSize} />}
            </div>
        );
    }
}

export default App;
