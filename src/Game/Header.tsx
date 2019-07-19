/* eslint-disable react/prop-types, react/destructuring-assignment */
import * as React from 'react';

interface HeaderParams {
    score: number,
    topscore: number,
    difference: number,
}

const Header: React.SFC<HeaderParams> = (props) => {
    return (
        <div className="heading">
            <h1 className="title">r1024</h1>
            <div className="best-container">
                {props.topscore}
            </div>
            <div className="score-container">
                {props.score}
                {(props.difference > 0) && <div className="score-addition">+{props.difference}</div>} 
            </div>
        </div>
    );
};

Header.defaultProps = {
    score: 0,
    topscore: 0,
    difference: 0,
};

export default Header;
