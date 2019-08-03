/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import './App.css';
import Game from '../Game/Game';
import * as chooserImages from '../assets/chooser';

const getAssetName = (val) => `img${val}x${val}`;
const sizes = [
    { text: 'Small', value: 3, url: getAssetName(3) },
    { text: 'Normal', value: 4, url: getAssetName(4) },
    { text: 'Big', value: 5, url: getAssetName(5) },
    { text: 'Bigger', value: 6, url: getAssetName(6) },
    { text: 'Very Big', value: 7, url: getAssetName(7) },
    { text: 'Large', value: 8, url: getAssetName(8) },
    { text: 'Larger', value: 9, url: getAssetName(9) },
    { text: 'Very Large', value: 10, url: getAssetName(10) },
    { text: 'Why man, why?!', value: 11, url: getAssetName(11) },
];
const sizesLength = sizes.length - 1;

interface iSelectControl {
    GridSize: number;
    HandleChange(e: React.KeyboardEvent | React.MouseEvent | React.FormEvent<HTMLSelectElement>): void;
}

const SelectControl: React.SFC<iSelectControl> = (props) => (
    <select onChange={props.HandleChange}>
        <option key="k-0" value={0}>Please Select</option>
        {sizes.map((item) => {
            const optionProps = {
                value: item.value,
                ...(item.value === props.GridSize && { selected: true }),
            };
            return <option key={`k-${item.value}-${item.value}`} {...optionProps}>{item.text} - {item.value} x {item.value}</option>;
        })}
    </select>
);

const ChooserControl: React.SFC<iSelectControl> = (props) => {
    const [index, setIndex] = React.useState<number>(0);
    const [direction, setDirection] = React.useState<number>(0);
    const rollLeft = (size, i) => (size + (i-1)) % size;
    const rollRight = (size, i) => (i+1) % size;
    const moveRight = () => {
        console.log('----(+)--', index, rollRight(sizesLength, index), sizesLength);
        setDirection(+1);
        setIndex(rollRight(sizesLength, index));
    };
    const moveLeft = () => {
        console.log('----(-)--', index, rollLeft(sizesLength, index), sizesLength);
        setDirection(-1);
        setIndex(rollLeft(sizesLength, index));
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
            innerPiece(sizes[rollLeft(sizesLength, index)], -1),
            innerPiece(sizes[index], 0),
            innerPiece(sizes[rollRight(sizesLength, index)], 1),
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
        GridSize: 0,
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

    render() {
        const { GridSize, GameState } = this.state;
        return (
            <div className="App">
                {!GameState && (
                    <div className="StartScreen">
                        <span> ( ? ) </span>
                        <span> Settings </span>
                        <SelectControl GridSize={GridSize} HandleChange={this.ValueChange} />
                        <ChooserControl GridSize={GridSize} HandleChange={this.ValueChange} />
                        <button type="button" onClick={this.StartGame}>Start Game</button>
                        <button type="button">Leaderboard</button>
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
