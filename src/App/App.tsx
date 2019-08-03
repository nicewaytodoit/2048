/* eslint-disable react/destructuring-assignment, no-unused-vars */
import * as React from 'react';
import './App.css';
import Game from '../Game/Game';
import Carusel from './Carusel/Carusel';
import * as assets from '../assets';
import SvgButton from './SvgButton';

const gameTypes = [
    'Small',
    'Normal',
    'Big',
    'Bigger',
    'Very Big',
    'Large',
    'Larger',
    'Very Large',
    'Why man, why?!',
].map((text, index) => {
    const value = 3 + index; 
    return {
        text,
        value,
        url: `img${value}x${value}`,
    };
});

// const gameTypesLength = gameTypes.length - 1;
type MyProps = {};
type MyState = {
    GridSize: number,
    GameState: Boolean,
};

class App extends React.Component<MyProps, MyState> {
    state = {
        GridSize: 3,
        GameState: false,
    };
    ValueChange = (val) => {
        this.setState(() => ({ GridSize: Number.parseInt(val) }));
    }

    StartGame = () => {
        this.setState((prev) => {
            const state = !!prev.GridSize;
            return { GameState: state };
        });
    }

    Alert = () => {
        alert("Button Pressed");
    }

    render() {
        const { GridSize, GameState } = this.state;
        return (
            <div className="App">
                {!GameState && (
                    <div className="StartScreen">
                        <div className="settings">
                            <SvgButton onClick={this.Alert} url={assets.help} text="Help" />
                            <SvgButton onClick={this.Alert} url={assets.cog} text="Settings" />
                        </div>
                        <Carusel GameTypes={gameTypes} HandleChange={this.ValueChange} />
                        <div className="controls">
                            <div />
                            <div>
                                <button type="button" onClick={this.StartGame}>
                                    <SvgButton url={assets.game} text="Start Game" />
                                    <span>Start Game</span>
                                </button>
                                <button type="button">
                                    <SvgButton url={assets.trophy} text="Leaderboard" />
                                    <span>Leaderboard</span>
                                </button>
                            </div>
                            <div />
                        </div>
                    </div>
                )}
                {GameState && <Game GridSize={GridSize} />}
            </div>
        );
    }
}

export default App;
