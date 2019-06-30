import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Body from './Body/Body';
import Header from './Header';
import { Help, Divider, Credits } from './Info';
import Hint from './Hint';
import Tile from './Tile';
import KeyboardInputManager from './hoc/KeyboardInputManager';
import './main.scss';

class Game extends Component {
    constructor(props) {
        super(props);
        const { Size } = props;
        const init = (size) => Array(size).fill(null).map(() => Array(size).fill(null));
        this.state = {
            cells: init(Size),
            score: 0,
            difference: 0,
            over: false,
            won: false,
            tileContainer: [],
        };
    }

    componentWillMount() {
        // size
        // const inputManager = new InputManager;
        // const actuator = new Actuator;
        console.log('========@@ b-for');
        const { on } = this.props;
        on("move", this.move.bind(this));
        on("restart", this.restart.bind(this));
        console.log('========@@ after');
        this.addStartTiles();
    }
    
    componentDidMount() {
        this.setupGame();
    }
    
    setupGame = () => {
        // this.addStartTiles();
        console.log('#######  Game START #######');
        const { cells } = this.state;
        console.log('Tiles Added?', cells);
        this.actuated();
    };

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
    
    cellsAvailable = () => !!this.availableCells().length;

    randomAvailableCell = () => {
        let cells = this.availableCells();
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    };

    withinBounds = (position) => {
        console.log('====With bounds()');
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
        console.log('###  Reset  ###');
        this.restarted();
        this.setupGame();
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
        console.log('Enter den of move =====> 1');
        var self = this;
        if (this.over || this.won) return; // Don't do anything if the game's over
        var cell, tile;
        var vector = this.getVector(direction);
        var traversals = this.buildTraversals(vector);
        var moved = false;
        this.prepareTiles();
        
        console.log('Enter den of move =====> 2');
        
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                cell = { x: x, y: y };
                tile = this.cellContent(cell);
                console.log('Enter den of move =====> 3');
                if (tile) {
                    console.log('Enter den of move =====> 4');
                    var positions = this.findFarthestPosition(cell, vector);
                    var next = this.cellContent(positions.next);
                    if (next && next.value === tile.value && !next.mergedFrom) {
                        var merged = new Tile(positions.next, tile.value * 2);
                        merged.mergedFrom = [tile, next];
                        this.insertTile(merged);
                        this.removeTile(tile);
                        tile.updatePosition(positions.next);
                        this.setState((prevState) => ({ score: prevState.score + merged.value }))
                        if (merged.value === 2048) this.setState({ won: true });
                    }
                    else {
                        this.moveTile(tile, positions.farthest);
                    }
                    if (!self.positionsEqual(cell, tile)) {
                        moved = true; // The tile moved from its original cell!
                    }
                }
            });
        });

        if (moved) {
            this.addRandomTile();

            if (!this.movesAvailable()) {
                this.over = true; // Game over!
            }

            this.actuated();
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
        var self = this;
        var tile;
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                tile = this.cellContent({ x: x, y: y });
                if (tile) {
                    for (var direction = 0; direction < 4; direction++) {
                        var vector = self.getVector(direction);
                        var cell = { x: x + vector.x, y: y + vector.y };
                        var other = this.cellContent(cell);
                        if (other) {
                            // something ???
                        }

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
    restarted = () => {
        this.setState({ won: false, over: false });
    };

    // function HTMLActuator() {
    //     this.tileContainer = document.getElementsByClassName("tile-container")[0];
    // }

    actuated = () => {
        const { cells, score, over, won } = this.state;
        const metadata = {score, over, won };
        console.log('===>>>', cells, metadata);
        var self = this;
        this.setState({ tileContainer: []});
        window.requestAnimationFrame(() => {
            // self.clearContainer(self.tileContainer);
            cells.forEach((column) => {
                column.forEach((cell) => {
                    if (cell) {
                        self.addTile(cell);
                    }
                });
            });
            this.setState((prevSate) => ({ score: metadata.score, difference: metadata.score - prevSate.score }));
        });
    };

    // clearContainer = (container) => {
    //     while (container.firstChild) {
    //         container.removeChild(container.firstChild);
    //     }
    // };

    addTile = (tile) => {
        const self = this;
        // const element = document.createElement("div");
        const position = tile.previousPosition || { x: tile.x, y: tile.y };
        const positionClass = this.positionClass(position);
        // We can't use classlist because it somehow glitches when replacing classes
        var classes = ["tile", "tile-" + tile.value, positionClass];
        // this.applyClasses(element, classes);
        // element.textContent = tile.value;

        if (tile.previousPosition) {
            classes[2] = self.positionClass({ x: tile.x, y: tile.y });
        }
        else if (tile.mergedFrom) {
            classes.push("tile-merged");
            // this.applyClasses(element, classes);
            // Render the tiles that merged
            tile.mergedFrom.forEach((merged) => {
                self.addTile(merged);
            });
        }
        else {
            classes.push("tile-new");
            // this.applyClasses(element, classes);
        }

        // Put the tile on the board
        // this.tileContainer.appendChild(element);
        this.setState((prevState) => ({ tileContainer: [
            ...prevState.tileContainer,
            <div key={`tile-${prevState.tileContainer.length+1}`} className={classes.join(' ')}>{tile.value}</div>,
        ]}))
    };

    // applyClasses = (element, classes) => {
    //     element.setAttribute("class", classes.join(" "));
    // };

    normalizePosition = (position) => {
        return { x: position.x + 1, y: position.y + 1 };
    };

    positionClass = (position) => {
        position = this.normalizePosition(position);
        return "tile-position-" + position.x + "-" + position.y;
    };

    render () {
        const { Size } = this.props;
        const { score, difference, tileContainer } = this.state;

        return (
            <div className="container">
                <Header score={score} difference={difference} />
                <Hint />
                <Body Size={Size} tiles={tileContainer} />
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
};

export default KeyboardInputManager(Game);
