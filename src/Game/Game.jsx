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
            target: 1024 * Math.pow(2, (Size - 3)),
        };
    }

    componentWillMount() {
        const { on } = this.props;
        on("move", this.move.bind(this));
        on("restart", this.restart.bind(this));
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
    };

    cellContent = (allcells, cell) => {
        return (this.withinBounds(cell)) ? allcells[cell.x][cell.y] : null;
    };
    
    cellOccupied = (allcells, cell) => !!this.cellContent(allcells, cell);

    cellAvailable = (allcells, cell) => !this.cellOccupied(allcells, cell);

   
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
            return tile;
        }
        return null;
    }

    prepareTiles = (allcells, size) => {
        this.eachCell(allcells, size, (x, y, tile) => {
            if (tile) {
                tile.mergedFrom = null;
                tile.savePosition();
            }
        });
    }

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
                        allcells[tile.x][tile.y] = null; // remove tile
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
                        allcells[tile.x][tile.y] = null; // delete previous position
                        allcells[cellF.x][cellF.y] = tile; // add new position
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
        const { cells, score, difference, won, over, topscore, target } = this.state;

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
        };

        const addTile = (tile) => {
            var classes = ["tile", "tile-" + tile.value]; // positionClass
    
            if (tile.previousPosition) {
                classes[2] = this.positionClass({ x: tile.x, y: tile.y });
            }
            else if (tile.mergedFrom) {
                classes.push("tile-merged");
            }
            else {
                classes.push("tile-new");
            }
    
            tileContainer = [
                ...tileContainer,
                <div
                    key={tile.id}
                    className={[
                        ...classes,
                    ].join(' ')}
                    style={getStyle(tile, Size)}
                >
                    {tile.value}
                </div>,
            ];
        };

        cells.forEach((column) => {
            column.forEach((cell) => {
                if (cell) {
                    addTile(cell);
                }
            });
        });

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
