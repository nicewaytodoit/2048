import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Message from './Message';

const Body = (props) => {
    const { Size, message, tiles, emit } = props;
    return (
        <div className="game-container">
            <Message message={message} emit={emit} />

            <Grid Size={Size} />

            <div className="tile-container">
                {tiles}    
            </div>
        </div>
    );
};

Body.propTypes = {
    Size: PropTypes.number.isRequired,
    message: PropTypes.shape({ over: PropTypes.bool, won: PropTypes.bool }),
    tiles: PropTypes.node,
    emit: PropTypes.func,
};

export default Body;
