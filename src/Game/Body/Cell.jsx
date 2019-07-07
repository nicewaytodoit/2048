import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({tileSize}) => {
    return (
        <div
            className="grid-cell"
            style={{ width: `${tileSize}px`, height: `${tileSize}px` }} 
        />
    );
};

Cell.propTypes = {
    tileSize: PropTypes.number.isRequired,
};

export default Cell;
