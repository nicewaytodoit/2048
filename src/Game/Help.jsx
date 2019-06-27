import React from 'react';

const Help = () => {
    return (
        <p class="game-explanation">
            <strong class="important">How to play:</strong> Use your <strong>arrow keys</strong>
            {' '}to move the tiles. When two
            tiles with the same number touch, they <strong>merge into one!</strong>
        </p>
    );
};

export default Help;
