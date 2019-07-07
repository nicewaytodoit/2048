import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Cell from './Cell';


const Grid = (props) => {
    const { Size } = props;
    const grid = Array(Size).fill(1);
    const tileDimensions = {
        fieldWidth: 500,
        gridSpacing: 15,
        gridRowCells: Size,
        tileBorderRadius: 3,
    };

    const tileSize = (tileDimensions.fieldWidth - tileDimensions.gridSpacing * (tileDimensions.gridRowCells + 1)) / tileDimensions.gridRowCells;

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
}

Grid.propTypes = {
    Size: PropTypes.number.isRequired,
};

export default Grid;
