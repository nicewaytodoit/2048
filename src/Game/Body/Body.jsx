import React from 'react';
import Grid from './Grid';
import Message from './Message';

const Body = () => {
    return (
        <div className="game-container">
            <Message />

            <Grid Size={4} />

            <div className="tile-container" />
        </div>
    );
};

export default Body;
