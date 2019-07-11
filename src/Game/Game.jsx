import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Body from './Body/Body';
import Header from './Header';
import { Help, Divider, Credits } from './Info';
import Hint from './Hint';
import Tile, { getTileSize } from './Tile';
import KeyboardInputManager from './hoc/KeyboardInputManager';
import './main.scss';

const init = (size) => Array(size).fill(null).map(() => Array(size).fill(null));

class Game extends Component {
    constructor(props) {
        super(props);
        const { Size } = props;
        this.tileCounter = 0;
        this.state = {
            cells: this.addStartTiles(),
            score: 0,
            topscore: 0,
            difference: 0,
            over: false,
            won: false,
            // tempTiles: [
            //     { id: 'tile_1', x: 0, y: 0, value: 2 },
            //     { id: 'tile_2', x: 3, y: 0, value: 4 },
            //     { id: 'tile_3', x: 3, y: 3, value: 8 },
            // ],
            // tempStep: 0,
            target: 1024 * Math.pow(2, (Size - 3)),
        };
    }

    componentWillMount() {
        const { on } = this.props;
        on("move", this.move.bind(this));
        on("restart", this.restart.bind(this));
        // console.log('will moung Start Tile');
        
    }
    
    // Grid ---------------------------------------------
    eachCell = (cells, size, callback) => {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                callback(x, y, cells[x][y]);
            }
        }
    };

    availableCells = (allcells, size) => {
        let cells = [];
        this.eachCell(allcells, size, (x, y, tile) => {
            if (!tile) {
                cells.push({ x: x, y: y });
            }
        });
        return cells;
    };
    
    cellsAvailable = (allcells, size) => {
        const available = !!this.availableCells(allcells, size).length;
        return available;
    };

    randomAvailableCell = (allcells, size) => {
        let cells = this.availableCells(allcells, size);
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    };

    withinBounds = (position) => {
        const { Size } = this.props;
        return position.x >= 0 && position.x < Size && position.y >= 0 && position.y < Size;
    }

    cellContent = (allcells, cell) => {
        // console.log('cell content', allcells, cell);
        return (this.withinBounds(cell)) ? allcells[cell.x][cell.y] : null;
    }
    
    cellOccupied = (allcells, cell) => !!this.cellContent(allcells, cell);

    cellAvailable = (allcells, cell) => !this.cellOccupied(allcells, cell);

    // updateCellsState = (tile, value) => {
    //     this.setState((prevState) => ({
    //         cells: [
    //             ...prevState.cells.slice(0, tile.x),
    //             [
    //                 ...prevState.cells[tile.x].slice(0, tile.y),
    //                 value,
    //                 ...prevState.cells[tile.x].slice(tile.y + 1),
    //             ],
    //             ...prevState.cells.slice(tile.x + 1),
    //         ],
    //     }));
    // }

    // insertTile = (tile) => this.updateCellsState(tile, tile);
    
    // removeTile = (tile) => this.updateCellsState(tile, null);

    
    // Game ---------------------------------------------

    restart = () => {
        console.log('RESET');
        this.setState(() => ({ won: false, over: false, cells: this.addStartTiles(), score:0, difference: 0 }));
    };

    addStartTiles = () => {
        const startTiles = 4;
        const { Size } = this.props;
        const cells = init(Size);
        for (var i = 0; i < startTiles; i++) {
            const tile = this.addRandomTile(cells, Size);
            // console.log('---,--@', tile);
            if (tile) {
                cells[tile.x][tile.y] = tile;
            }
        }
        return cells;
    };

    increaseTileCounter = () => {
        return (this.tileCounter++);
    }

    addRandomTile = (allcells, size) => {
        if (this.cellsAvailable(allcells, size)) {
            var value = Math.random() < 0.9 ? 2 : 4;
            var tile = new Tile(this.randomAvailableCell(allcells, size), value, this.increaseTileCounter());
            // this.insertTile(tile);
            return tile;
        }
        return null;
    };

    prepareTiles = (allcells, size) => {
        this.eachCell(allcells, size, (x, y, tile) => {
            if (tile) {
                tile.mergedFrom = null;
                tile.savePosition();
            }
        });
    };

    // moveTile = (tile, cell) => {
    //     this.updateCellsState(tile, null);
    //     this.updateCellsState(cell, tile);
    //     tile.updatePosition(cell);
    // };

    move = (direction) => {
        const { Size } = this.props;
        const { over, won, score, topscore, target, cells } = this.state;
        if (over || won) return; // Don't do anything if the game's over
        const vector = this.getVector(direction);
        const traversals = this.buildTraversals(vector);
        let moved = false;
        let totalScore = score;
        let difference = 0;
        const allcells = [ ...cells ];
        this.prepareTiles(allcells, Size);

        
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                const cell = { x: x, y: y };
                const tile = this.cellContent(allcells, cell);
                if (tile) {
                    const positions = this.findFarthestPosition(allcells, cell, vector);
                    const next = this.cellContent(allcells, positions.next);
                    if (next && next.value === tile.value && !next.mergedFrom) {
                        const merged = new Tile(positions.next, tile.value * 2, this.increaseTileCounter()); // tile.id
                        merged.mergedFrom = true; // [tile, next];
                        // this.removeTile(tile); 
                        allcells[tile.x][tile.y] = null; // remove tile
                        // this.insertTile(merged);
                        allcells[merged.x][merged.y] = merged; // insert tile
                        tile.updatePosition(positions.next);
                        totalScore = totalScore + merged.value;
                        difference = difference + merged.value;
                        if (merged.value === target) {
                            this.setState({ cells: allcells, won: true });
                            return;
                        }
                    }
                    else {
                        const cellF = positions.farthest;
                        // this.moveTile(tile, positions.farthest);
                        // this.updateCellsState(tile, null);
                        // this.updateCellsState(cell, tile);
                        // console.log(tile, cellF, '<<<<<<<<<<<<<<<<<<<<<<<<');
                        allcells[tile.x][tile.y] = null;
                        allcells[cellF.x][cellF.y] = tile;
                        tile.updatePosition(cellF);
                    }
                    if (!this.positionsEqual(cell, tile)) {
                        moved = true; // The tile moved from its original cell!
                    }
                }
            });
        });

        let movesAvailable = true;
        if (moved) {
            const tileNew = this.addRandomTile(allcells, Size);
            allcells[tileNew.x][tileNew.y] = tileNew;
            movesAvailable = !!this.movesAvailable(allcells, Size);
        }
        // console.log('Update move', allcells);
        this.setState(() => ({
            cells: allcells, // update cells after all calculations
            ...(moved && { score: totalScore, difference: difference, ...(totalScore > topscore && { topscore: totalScore }) }),
            ...(!movesAvailable && { over: true }), // game over
        }));
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

    findFarthestPosition = (allcells, cell, vector) => {
        let previous;

        do {
            previous = cell;
            cell = { x: previous.x + vector.x, y: previous.y + vector.y };
        }
        while (this.withinBounds(cell) && this.cellAvailable(allcells, cell));

        return {
            farthest: previous,
            next: cell, // Used to check if a merge is required
        };
    };

    movesAvailable = (allcells, size) => this.cellsAvailable(allcells, size) || this.tileMatchesAvailable(allcells, size);

    tileMatchesAvailable = (allcells, size) => {
        let tile;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                tile = this.cellContent(allcells, { x: x, y: y });
                if (tile) {
                    for (let direction = 0; direction < 4; direction++) {
                        const vector = this.getVector(direction);
                        const cell = { x: x + vector.x, y: y + vector.y };
                        const other = this.cellContent(allcells, cell);

                        if (other && other.value === tile.value) {
                            // console.log('Merging:', tile, other);
                            return true; // These two tiles can be merged
                        }
                    }
                }
            }
        }
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
        const { cells, /* tempTiles, tempStep, */ score, difference, won, over, topscore, target } = this.state;
        // const callBB = (acc, vv) => ([...acc, ...(vv ? [vv]: [])]);
        // console.log('RENDER', cells.reduce((row, acc) => ([ ...acc, ...row.reduce(callBB,[])])), []);

        let tileContainer = [];
        const getStyle = (normalisedTile, size) => {
            const tileSize = getTileSize(size);
            const lineHeight = tileSize + 10;
            const tileAndSpaceSize = tileSize + 15;
            return {
                position: 'absolute',
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                lineHeight: `${lineHeight}px`,
                left: `${normalisedTile.x * tileAndSpaceSize}px`,
                top: `${normalisedTile.y * tileAndSpaceSize}px`,
                fontSize: `${((55 * 4) / size)}px`,
            };
        }

        const addTile = (tile) => {
            // console.log('add tile', tile.mergedFrom);
            // const position = tile.previousPosition || { x: tile.x, y: tile.y };
            // const positionClass = this.positionClass(position);
            var classes = ["tile", "tile-" + tile.value]; // positionClass
    
            if (tile.previousPosition) {
                classes[2] = this.positionClass({ x: tile.x, y: tile.y });
            }
            else if (tile.mergedFrom) {
                classes.push("tile-merged");
                // tile.mergedFrom.forEach((merged) => {
                //     addTile(merged);
                // });
            }
            else {
                classes.push("tile-new");
            }
    
            tileContainer = [
                ...tileContainer,
                // <div key={`tile-${tileContainer.length+1}`} className={classes.join(' ')}>{tile.value}</div>,
                <div
                    key={tile.id}
                    className={[
                        ...classes,
                        // "tile",
                        // "tile-" + tile.value,
                        // this.positionClass(mapTile(tile, tempStep, i)),
                    ].join(' ')}
                    style={getStyle(tile, Size)}
                >
                    {tile.value}
                </div>,
            ];
        };

        // let counter = 0;
        cells.forEach((column) => {
            column.forEach((cell) => {
                if (cell) {
                    // console.log('Add', counter++, cell.id);
                    addTile(cell);
                }
            });
        });

        // const mapTile = (tile, position, index) => {
        //     const maxSize = Size -1;
        //     const map = [
        //         { x: 0, y: 0 },
        //         { x: maxSize, y: 0 },
        //         { x: maxSize, y: maxSize },
        //         { x: 0, y: maxSize },
        //     ];
        //     const relativeStep = (position + index) % 4; 
        //     return { ...tile, x: map[relativeStep].x, y: map[relativeStep].y };
        // }

        // tileContainer = tempTiles.map((tile, i) => (
        //     <div
        //         key={tile.id}
        //         className={[
        //             "tile",
        //             "tile-" + tile.value,
        //             // this.positionClass(mapTile(tile, tempStep, i)),
        //         ].join(' ')}
        //         style={getStyle(mapTile(tile, tempStep, i), Size)}
        //     >
        //         {tile.value}
        //     </div>
        // ));

        // console.log('Render Controls===', tileContainer);

        return (
            <div className="container">
                <Header score={score} difference={difference} topscore={topscore} />
                <Hint emit={emit} target={target} />
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
