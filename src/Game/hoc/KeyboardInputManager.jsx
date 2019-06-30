import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';

const map = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // vim keybindings
    76: 1,
    74: 2,
    72: 3,
};

const KeyboardInputManager = (WrappedComponent) => {
    class HOCKeyboard extends React.Component {
        state = {
            events: {},
        };
        // this.listen();

        // adding or seeting Event listeners
        on = (event, callback) => {
            const cb = callback;
            this.setState((prevState) => {
                const { events: prevEvents } = prevState;
                const res = { 
                    events: {
                        ...prevEvents,
                        [event]: [
                            ...(prevEvents[event] ? prevEvents[event]: []),
                            cb,
                        ],
                    },
                };
                console.log('set evetns::: ', event, res, cb);
                return res;
            })
        };
        
        emit = (event, data) => {
            console.log('=============>', event, data);
            const { events } = this.state;
            const callbacks = events[event];
            if (callbacks) {
                callbacks.forEach((callback) => {
                    callback(data);
                });
            }
        };

        gesture = () => {
            const gestures = [Hammer.DIRECTION_UP, Hammer.DIRECTION_RIGHT, Hammer.DIRECTION_DOWN, Hammer.DIRECTION_LEFT];
            const gameContainer = document.getElementsByClassName("game-container")[0];
            const handler = Hammer(gameContainer, { drag_block_horizontal: true, drag_block_vertical: true });
        
            handler.on("swipe", (event) => {
                event.gesture.preventDefault();
                const mapped = gestures.indexOf(event.gesture.direction);
                if (mapped !== -1) {
                    this.emit("move", mapped);
                }
            });
        }

        keyHandling = (event) => {
            const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
            const mapped = map[event.which];

            if (!modifiers) {
                if (mapped !== undefined) {
                    event.preventDefault();
                    this.emit("move", mapped);
                }
                if (event.which === 32) {
                    this.restart.bind(this)(event);
                }
            }
        };

        componentDidMount = () => {
            document.addEventListener('keydown', this.keyHandling);
        }

        componentWillUnmount = () => {
            window.removeEventListener('keydown', this.keyHandling);
        }

        render() {
            const { extraProp, ...passThroughProps } = this.props;
            return <WrappedComponent {...passThroughProps} on={this.on} />;
        }
    }

    HOCKeyboard.propTypes = {
        extraProp: PropTypes.string,
    };

    return HOCKeyboard;
};

export default KeyboardInputManager;

// componentDidMount() {
//     this.hammer = new Hammer(this.domElement);
//     updateHammer(this.hammer, this.props);
// }

// componentDidUpdate() {
//     if (this.hammer) {
//         updateHammer(this.hammer, this.props);
//     }
// }

// componentWillUnmount() {
//     if (this.hammer) {
//         this.hammer.stop();
//         this.hammer.destroy();
//     }
//     this.hammer = null;
// }
