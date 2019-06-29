import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Cell from './Cell';

class Grid extends Component {
    constructor(props) {
        super(props);
        const { Size } = props;
        const init = (size) => Array(size).fill(null).map(() => Array(size).fill(null));
        this.state = {
            cells: init(Size),
        };
    }
   
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

    withinBounds = (position) => position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;

    cellContent = (cell) => (this.withinBounds(cell)) ? this.cells[cell.x][cell.y] : null;
    
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

    render() {
        const { Size } = this.props;
        const grid = Array(Size).fill(1);
        return (
            <div className="grid-container">
                {grid.map((v, i) => (
                    <Row key={`row-${v+i}`}>
                        {grid.map((vv, ii) => <Cell key={`cell-${vv+ii}`} />)}
                    </Row>
                ))}
            </div>
        );
    }
}

Grid.propTypes = {
    Size: PropTypes.number.isRequired,
};

export default Grid;
