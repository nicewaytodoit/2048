/* eslint-disable no-undef */
import * as React from 'react';
import Row from './Row';
import Cell from './Cell';
import { getTileSize } from '../Tile';

interface iGrid { GridSize: number; }

const Grid: React.SFC<iGrid> = (props) => {
    const { GridSize } = props;
    const grid = Array(GridSize).fill(1);
    const tileSize = getTileSize(GridSize);
    const getCells = (cells: Array<number>) => {
        const result: JSX.Element[] = cells.map((vv: number, ii: number) => (
            <Cell
                key={`cell-${vv+ii}`}
                tileSize={tileSize} 
            />
        ));
        return result;
    };
    return (
        <div className="grid-container">
            {grid.map((v: number, i: number) => (
                <Row key={`row-${v+i}`}>
                    {getCells(grid)}
                </Row>
            ))}
        </div>
    );
};

export default Grid;
