import React from 'react';

const Header = ({ score = 0 }) => {
    return (
        <div class="heading">
            <h1 class="title">2048</h1>
            <div class="score-container">{score}</div>
        </div>
    );
};

export default Header;