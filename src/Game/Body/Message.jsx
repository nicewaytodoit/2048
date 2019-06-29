import React from 'react';
import PropTypes from 'prop-types';

const emptyFn = () => ({});
const Body = ({ message = '', emit = emptyFn }) => {

    const restart = (event) => {
        event.preventDefault();
        emit("restart");
    };

    return (
        <div className="game-message">
            <p>{message}</p>
            <div className="lower">
                <a
                    className="retry-button"
                    onClick={restart}
                    onKeyPress={restart}
                    role="button"
                    tabIndex="0"
                    href="#retry"
                >
                    Try again
                </a>
            </div>
        </div>
    );
};

Body.propTypes = {
    emit: PropTypes.func,
    message: PropTypes.string,
};

export default Body;
