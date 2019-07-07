import React from 'react';
import PropTypes from 'prop-types';

const Hint = ({ emit, target }) => {
    const restart = (event) => {
        event.preventDefault();
        emit("restart");
    };
    return (
        <p className="game-intro">
            Join the numbers and get to the <strong>{target} tile!</strong>
            <a
                className="restart-button"
                onClick={restart}
                onKeyPress={restart}
                role="button"
                tabIndex="0"
                href="#retry"
            >
                New Game
            </a>
        </p>
    );
};

Hint.propTypes = {
    emit: PropTypes.func.isRequired,
    target: PropTypes.number.isRequired,
}

export default Hint;
