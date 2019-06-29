import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ score = 0 }) => {
    return (
        <div className="heading">
            <h1 className="title">2048</h1>
            <div className="score-container">{score}</div>
        </div>
    );
};

Header.propTypes = {
    score: PropTypes.number,
};

export default Header;
