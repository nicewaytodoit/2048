/* eslint-disable react/prop-types */
import * as React from 'react';
import Row from './Row';
import Cell from './Cell';
import { getTileSize } from '../Tile';

interface iGrid { Size: number; }

const Grid: React.SFC<iGrid> = (props) => {
    const { Size } = props;
    const grid = Array(Size).fill(1);
    const tileSize = getTileSize(Size);
    return (
        <div className="grid-container">
            {grid.map((v, i) => (
                <Row key={`row-${v+i}`}>
                    {grid.map((vv, ii) => (
                        <Cell
                            key={`cell-${vv+ii}`}
                            tileSize={tileSize} 
                        />
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default Grid;
