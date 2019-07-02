import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ score = 0, topscore = 0, difference = 0 }) => {
    return (
        <div className="heading">
            <h1 className="title">2048</h1>
            <div className="best-container">
                {topscore}
            </div>
            <div className="score-container">
                {score}
                {(difference > 0) && <div className="score-addition">+{difference}</div>} 
            </div>
        </div>
    );
};

Header.propTypes = {
    score: PropTypes.number,
    topscore: PropTypes.number,
    difference: PropTypes.number,
};

export default Header;
