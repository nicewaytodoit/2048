import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Cell from './Cell';


const Grid = (props) => {
    const { Size } = props;
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

Grid.propTypes = {
    Size: PropTypes.number.isRequired,
};

export default Grid;
