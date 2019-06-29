import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
    const { children } = props;
    return (
        <div className="grid-row">{children}</div>
    );
};

Row.propTypes = {
    children: PropTypes.node,
};

export default Row;
