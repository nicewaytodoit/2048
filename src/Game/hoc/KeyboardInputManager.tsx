import * as React from 'react';
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

// interface iHOCKeyboard { extraProp: string };

export interface InjectedCounterProps {
    on(name: string, obj: any): void;
    emit(command: string): void;
}

type myState = {
    events: any;
}

// ComponentType = React.FunctionComponent<P> | React.ClassComponent<P>,
const KeyboardInputManager = <P extends InjectedCounterProps>(WrappedComponent: React.ComponentClass<P>)
    : React.ComponentClass<P> => {
    // type State = {
    //     username: string,
    //     password: string
    // };
    // type StateKeys = keyof State;
    return class HOCKeyboard extends React.Component<P, myState> {
        state = {
            events: {},
        };
        on = (event, callback) => {
            const cb = callback;
            this.setState((prevState) => {
                const { events: prevEvents } = prevState;
                const res = {
                    events: {
                        ...prevEvents,
                        [event]: [
                            ...(prevEvents[event] ? prevEvents[event] : []),
                            cb,
                        ],
                    },
                };
                return res;
            });
        };

        // dynSetState = (key: StateKeys, value: string) => this.setState({ [key]: value } as Pick<State, keyof State>);

        emit = (event, data) => {
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
            handler.on('swipe', (event) => {
                event.gesture.preventDefault();
                const mapped = gestures.indexOf(event.gesture.direction);
                if (mapped !== -1) {
                    this.emit('move', mapped);
                }
            });
        }
        keyHandling = (event) => {
            const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
            const mapped = map[event.which];
            if (!modifiers) {
                if (mapped !== undefined) {
                    event.preventDefault();
                    this.emit('move', mapped);
                }
                if (event.which === 32) {
                    console.log(32, 'restart');
                    this.emit('restart', event);
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
            // const { extraProp, ...passThroughProps } = this.props;
            return (<WrappedComponent {...this.props} on={this.on} emit={this.emit} />);
        }
    };
}
// return HOCKeyboard;
// };

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
// problem statement 
// - I need to add extra property I can omit in HOC some text, comment, calculation
// 

export default KeyboardInputManager;
