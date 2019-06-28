import React from 'react';

const Body = (props) => {
    return (
        <div class="game-container">
            <div class="game-message">
                <p></p>
                <div class="lower">
                    <a class="retry-button">Try again</a>
                </div>
            </div>

            <Grid Size={4} />

            <div class="tile-container">

            </div>
        </div>
    );
};

export default Body;
