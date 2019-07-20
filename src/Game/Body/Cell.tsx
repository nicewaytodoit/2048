/* eslint-disable react/prop-types */
import * as React from 'react';

interface iCell { tileSize: number; }

const Cell: React.SFC<iCell> = (props) => {
    const { tileSize } = props;
    return (
        <div
            className="grid-cell"
            style={{ width: `${tileSize}px`, height: `${tileSize}px` }} 
        />
    );
};

export default Cell;
