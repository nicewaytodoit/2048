/* eslint-disable react/destructuring-assignment, no-unused-vars */
import * as React from 'react';
import './App.css';
import Game from '../Game/Game';
import * as chooserImages from '../assets/chooser';
import Carusel from './Carusel/Carusel';
import * as assets from '../assets';

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


const gameTypesLength = gameTypes.length - 1;

interface iSelectControl {
    GridSize: number;
    HandleChange(e: React.KeyboardEvent | React.MouseEvent | React.FormEvent<HTMLSelectElement>): void;
}

const SelectControl: React.SFC<iSelectControl> = (props) => (
    <select onChange={props.HandleChange}>
        <option key="k-0" value={0}>Please Select</option>
        {gameTypes.map((item) => {
            const optionProps = {
                value: item.value,
                ...(item.value === props.GridSize && { selected: true }),
            };
            return <option key={`k-${item.value}-${item.value}`} {...optionProps}>{item.text} - {item.value} x {item.value}</option>;
        })}
    </select>
);
// 
const ChooserControl: React.SFC<iSelectControl> = (props) => {
    const [index, setIndex] = React.useState<number>(0);
    const [direction, setDirection] = React.useState<number>(0);
    const rollLeft = (size, i) => (size + (i-1)) % size;
    const rollRight = (size, i) => (i+1) % size;
    const moveRight = () => {
        console.log('----(+)--', index, rollRight(gameTypesLength, index), gameTypesLength);
        setDirection(+1);
        setIndex(rollRight(gameTypesLength, index));
    };
    const moveLeft = () => {
        console.log('----(-)--', index, rollLeft(gameTypesLength, index), gameTypesLength);
        setDirection(-1);
        setIndex(rollLeft(gameTypesLength, index));
    };
    const innerPiece = (item, direction = 0) => {
        const scrollClass = (direction === -1) ? 'right' : (direction === 1) ? 'left' : 'middle';
        return (
            <div className={['item', scrollClass].join(' ')} key={`k-${item.value}-${item.value}`}>
                <div style={{height:"200px"}}>
                    <img style={{height:"100%"}} src={chooserImages[item.url]} alt={`Grid ${item.value} x ${item.value}`} />
                </div>
                <div>{item.text} - {item.value} x {item.value}</div>
            </div>
        );
    };
    const scrollChoosenItems = (direction: number, index: number) => {
        return [
            innerPiece(gameTypes[rollLeft(gameTypesLength, index)], -1),
            innerPiece(gameTypes[index], 0),
            innerPiece(gameTypes[rollRight(gameTypesLength, index)], 1),
        ];
    };

    return (
        <div className="Chooser">
            <div className="Content">
                {scrollChoosenItems(direction, index)}                
            </div>
            <div className="ChooserWindow">
                <div className="container-left">
                    <div className="trainagle-container">
                        <div className="triangleLeft" onClick={moveLeft} onKeyPress={moveLeft} role="button" tabIndex={-1} />
                    </div>
                </div>
                <div className="window" />
                <div className="container-right">
                    <div className="trainagle-container">
                        <div className="triangleRight" onClick={moveRight} onKeyPress={moveRight} role="button" tabIndex={-1} />
                    </div>
                </div>
            </div>
            <div onClick={props.HandleChange} onKeyPress={props.HandleChange} role="button" tabIndex={0}>Choose</div>
        </div>
    );
};

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
    ValueChange = (e) => {
        const val = e.target.value;
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
    Button = (props) => {
        const btnStyles = {
            "-webkit-mask": `url(${props.url}) no-repeat center`,
            mask: `url(${props.url}) no-repeat center`,
        };
        return (
            <div
                style={btnStyles}
                role="button"
                onClick={props.onClick}
                onKeyDown={props.onClick}
                tabIndex={0}
                title={props.text}
            />
        );
    };

    render() {
        const { GridSize, GameState } = this.state;
        return (
            <div className="App">
                {!GameState && (
                    <div className="StartScreen">
                        <div className="settings">
                            <this.Button onClick={this.Alert} url={assets.help} text="Help" />
                            <this.Button onClick={this.Alert} url={assets.cog} text="Settings" />
                        </div>
                        {/*
                        <SelectControl GridSize={GridSize} HandleChange={this.ValueChange} />
                        <ChooserControl GridSize={GridSize} HandleChange={this.ValueChange} />
                        */}
                        <Carusel GameTypes={gameTypes} HandleChange={this.ValueChange} />
                        <div className={}>
                            <div>
                                <button type="button" onClick={this.StartGame}>
                                    <this.Button url={assets.game} text="Start Game" />
                                    <span>Start Game</span>
                                </button>
                            </div>
                            <div />
                            <div>
                                <button type="button">
                                    <this.Button url={assets.trophy} text="Leaderboard" />
                                    <span>Leaderboard</span>
                                </button>
                            </div>
                    </div>
                )}
                {GameState && <Game GridSize={GridSize} />}
                {/* <div className="Panel">
                    <div className="Hole" />
                </div>
                <div className="under_scroll">
                    <p>This is some div that needs</p>
                    <p>To be scrolle</p>
                    <p>several times</p>
                </div> */}
            </div>
        );
    }
}

export default App;
