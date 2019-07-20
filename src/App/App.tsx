/* eslint-disable react/prop-types, react/destructuring-assignment */
import * as React from 'react';
import './App.css';
import Game from '../Game/Game';

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

interface iSelectControl {
    GridSize: number;
    HandleChange(e: React.KeyboardEvent | React.MouseEvent | React.FormEvent<HTMLSelectElement>): void;
}

const SelectControl: React.SFC<iSelectControl> = (props) => (
    <select onChange={props.HandleChange}>
        <option key="k-0" value={0}>Please Select</option>
        {sizes.map((item) => {
            const optionProps = {
                value:item.value,
                ...(item.value === props.GridSize && { selected: true }),
            };
            return <option key={`k-${item.value}-${item.value}`} {...optionProps}>{item.text} - {item.value} x {item.value}</option>;
        })}
    </select>
);

type MyProps = { };
type MyState = {
    GridSize: number,
    GameState: Boolean,
};

class App extends React.Component<MyProps, MyState> {
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
                {GameState && <Game GridSize={GridSize} />}
            </div>
        );
    }
}

export default App;
