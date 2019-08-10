import * as React from 'react';
// const emptyFn = () => ({});

export interface ioMessage {
    over: Boolean;
    won: Boolean;
}
interface iMessage {
    emit(command: string): void;
    message: ioMessage;
}

const Message: React.SFC<iMessage> = (props) => {
    const { message, emit} = props;
    const restart = (event) => {
        event.preventDefault();
        emit("restart");
    };

    const setMessage = (won) => {
        return {
            type: won ? "game-won" : "game-over",
            text: won ? "You win!" : "Game over!",
        };
    };

    // clearMessage = () => { // TODO: just set state };

    let result = { type: '', text: '' }; 
    result = (message.over) ? setMessage(false) : result; // You lose
    result =  (message.won) ? setMessage(true) : result; // You win!

    const gameClasses = ['game-message', result.type];

    return (
        <div className={gameClasses.join(' ')}>
            <p>{result.text}</p>
            <div className="lower">
                <a
                    className="retry-button"
                    onClick={restart}
                    onKeyPress={restart}
                    role="button"
                    tabIndex={0}
                    href="#retry"
                >
                    Try again
                </a>
            </div>
        </div>
    );
};

export default Message;
