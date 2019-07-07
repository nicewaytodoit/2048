import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Body from './Body/Body';
import Header from './Header';
import { Help, Divider, Credits } from './Info';
import Hint from './Hint';
import Tile from './Tile';
import KeyboardInputManager from './hoc/KeyboardInputManager';
import './main.scss';

const init = (size) => Array(size).fill(null).map(() => Array(size).fill(null));

class Game extends Component {
    constructor(props) {
        super(props);
        const { Size } = props;
        this.state = {
            cells: init(Size),
            score: 0,
            topscore: 0,
            difference: 0,
            over: false,
            won: false,
            tempTiles: [
                { id: 'tile_1', x: 0, y: 0, value: 2 },
                { id: 'tile_2', x: 3, y: 0, value: 4 },
                { id: 'tile_3', x: 3, y: 3, value: 8 },
            ],
            tempStep: 0,
        };
    }

    componentWillMount() {
        const { on } = this.props;
        on("move", this.move.bind(this));
        on("restart", this.restart.bind(this));
        this.addStartTiles();
    }
    
    // Grid ---------------------------------------------
    eachCell = (callback) => {
        const { Size } = this.props;
        const { cells } = this.state;
        for (let x = 0; x < Size; x++) {
            for (let y = 0; y < Size; y++) {
                callback(x, y, cells[x][y]);
            }
        }
    };

    availableCells = () => {
        let cells = [];
        this.eachCell((x, y, tile) => {
            if (!tile) {
                cells.push({ x: x, y: y });
            }
        });
        return cells;
    };
    
    cellsAvailable = () => {
        const available = !!this.availableCells().length;
        return available;
    };

    randomAvailableCell = () => {
        let cells = this.availableCells();
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    };

    withinBounds = (position) => {
        const { Size } = this.props;
        return position.x >= 0 && position.x < Size && position.y >= 0 && position.y < Size;
    }

    cellContent = (cell) => {
        const { cells } = this.state;
        return (this.withinBounds(cell)) ? cells[cell.x][cell.y] : null;
    }
    
    cellOccupied = (cell) => !!this.cellContent(cell);

    cellAvailable = (cell) => !this.cellOccupied(cell);

    updateCellsState = (tile, value) => {
        this.setState((prevState) => ({
            cells: [
                ...prevState.cells.slice(0, tile.x),
                [
                    ...prevState.cells[tile.x].slice(0, tile.y),
                    value,
                    ...prevState.cells[tile.x].slice(tile.y + 1),
                ],
                ...prevState.cells.slice(tile.x + 1),
            ],
        }));
    }

    insertTile = (tile) => this.updateCellsState(tile, tile);
    
    removeTile = (tile) => this.updateCellsState(tile, null);

    
    // Game ---------------------------------------------

    restart = () => {
        console.log('RESET');
        const { Size } = this.props;
        this.setState(() => ({ won: false, over: false, cells: init(Size), score:0, difference: 0 }), () => {
            this.addStartTiles();
        });
    };

    addStartTiles = () => {
        const startTiles = 2;
        for (var i = 0; i < startTiles; i++) {
            this.addRandomTile();
        }
    };

    addRandomTile = () => {
        if (this.cellsAvailable()) {
            var value = Math.random() < 0.9 ? 2 : 4;
            var tile = new Tile(this.randomAvailableCell(), value);
            this.insertTile(tile);
        }
    };

    prepareTiles = () => {
        this.eachCell((x, y, tile) => {
            if (tile) {
                tile.mergedFrom = null;
                tile.savePosition();
            }
        });
    };

    moveTile = (tile, cell) => {
        this.updateCellsState(tile, null);
        this.updateCellsState(cell, tile);
        tile.updatePosition(cell);
    };

    move = (direction) => {
        const { over, won, score, topscore } = this.state;
        if (over || won) return; // Don't do anything if the game's over
        const vector = this.getVector(direction);
        const traversals = this.buildTraversals(vector);
        let moved = false;
        let totalScore = score;
        let difference = 0;
        this.prepareTiles();
        
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                const cell = { x: x, y: y };
                const tile = this.cellContent(cell);
                if (tile) {
                    const positions = this.findFarthestPosition(cell, vector);
                    const next = this.cellContent(positions.next);
                    if (next && next.value === tile.value && !next.mergedFrom) {
                        const merged = new Tile(positions.next, tile.value * 2);
                        merged.mergedFrom = [tile, next];
                        this.insertTile(merged);
                        this.removeTile(tile);
                        tile.updatePosition(positions.next);
                        totalScore = totalScore + merged.value;
                        difference = difference + merged.value;
                        if (merged.value === 2048) {
                            this.setState({ won: true });
                            return;
                        }
                    }
                    else {
                        this.moveTile(tile, positions.farthest);
                    }
                    if (!this.positionsEqual(cell, tile)) {
                        moved = true; // The tile moved from its original cell!
                    }
                }
            });
        });
        
        if (moved) {
            this.setState(() => ({ score: totalScore, difference: difference, ...(totalScore > topscore && { topscore: totalScore }) }));
            this.addRandomTile();
            if (!this.movesAvailable()) {
                this.setState(()=>({ over: true })); // Game over!
            }
        }
    };

    getVector = (direction) => {
        var map = {
            0: { x: 0, y: -1 }, // up
            1: { x: 1, y: 0 },  // right
            2: { x: 0, y: 1 },  // down
            3: { x: -1, y: 0 },   // left
        };
        return map[direction];
    };

    buildTraversals = (vector) => {
        const { Size } = this.props;
        const traversals = { x: [], y: [] };
        for (let pos = 0; pos < Size; pos++) {
            traversals.x.push(pos);
            traversals.y.push(pos);
        }
        if (vector.x === 1) traversals.x = traversals.x.reverse();
        if (vector.y === 1) traversals.y = traversals.y.reverse();
        return traversals;
    };

    findFarthestPosition = (cell, vector) => {
        let previous;

        do {
            previous = cell;
            cell = { x: previous.x + vector.x, y: previous.y + vector.y };
        }
        while (this.withinBounds(cell) && this.cellAvailable(cell));

        return {
            farthest: previous,
            next: cell, // Used to check if a merge is required
        };
    };

    movesAvailable = () => this.cellsAvailable() || this.tileMatchesAvailable();

    tileMatchesAvailable = () => {
        let tile;
        const { Size } = this.props;
        for (let x = 0; x < Size; x++) {
            for (let y = 0; y < Size; y++) {
                tile = this.cellContent({ x: x, y: y });
                if (tile) {
                    for (let direction = 0; direction < 4; direction++) {
                        const vector = this.getVector(direction);
                        const cell = { x: x + vector.x, y: y + vector.y };
                        const other = this.cellContent(cell);

                        if (other && other.value === tile.value) {
                            return true; // These two tiles can be merged
                        }
                    }
                }
            }
        }
        console.log('Match Available: FALSE');
        return false;
    };

    positionsEqual = (first, second) => first.x === second.x && first.y === second.y;


    // Actuator ----------------------------------------------------------------------------------------
    normalizePosition = (position) => ({ x: position.x + 1, y: position.y + 1 });

    positionClass = (position) => {
        position = this.normalizePosition(position);
        return "tile-position-" + position.x + "-" + position.y;
    };

    role = () => {
        this.setState((prev) => {
            const step = (prev.tempStep + 1) > 3 ? 0 : prev.tempStep + 1; 
            return { tempStep: step };
        });
    }


    render () {
        const { Size, emit } = this.props;
        const { /* cells, */ tempTiles, tempStep, score, difference, won, over, topscore } = this.state;
        let tileContainer = [];
            
        // const addTile = (tile) => {
        //     const position = tile.previousPosition || { x: tile.x, y: tile.y };
        //     const positionClass = this.positionClass(position);
        //     var classes = ["tile", "tile-" + tile.value, positionClass];
    
        //     if (tile.previousPosition) {
        //         classes[2] = this.positionClass({ x: tile.x, y: tile.y });
        //     }
        //     else if (tile.mergedFrom) {
        //         classes.push("tile-merged");
        //         tile.mergedFrom.forEach((merged) => {
        //             addTile(merged);
        //         });
        //     }
        //     else {
        //         classes.push("tile-new");
        //     }
    
        //     tileContainer = [
        //         ...tileContainer,
        //         <div key={`tile-${tileContainer.length+1}`} className={classes.join(' ')}>{tile.value}</div>,
        //     ];
        // };

        // cells.forEach((column) => {
        //     column.forEach((cell) => {
        //         if (cell) {
        //             addTile(cell);
        //         }
        //     });
        // });

        const mapTile = (tile, position, index) => {
            const map = [
                { x: 0, y: 0 },
                { x: 3, y: 0 },
                { x: 3, y: 3 },
                { x: 0, y: 3 },
            ];
            const relativeStep = (position + index) % 4; 
            return { ...tile, x: map[relativeStep].x, y: map[relativeStep].y };
        }

        tileContainer = tempTiles.map((tile, i) => (
            <div
                key={tile.id}
                className={["tile", "tile-" + tile.value, this.positionClass(mapTile(tile, tempStep, i))].join(' ')}
            >
                {tile.value}
            </div>
        ));

        return (
            <div className="container">
                <Header score={score} difference={difference} topscore={topscore} />
                <Hint emit={emit} />
                <button type="button" onClick={this.role}>Roll Those</button>
                <Body 
                    Size={Size} 
                    tiles={tileContainer} 
                    message={{ won, over }} 
                    emit={emit}
                />
                <Help />
                <Divider />
                <Credits />
            </div>
        );
    }
}

Game.propTypes = {
    Size: PropTypes.number.isRequired,
    on: PropTypes.func,
    emit: PropTypes.func,
};

export default KeyboardInputManager(Game);
