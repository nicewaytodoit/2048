import * as React from 'react';

interface iHint {
    emit(command: string): void;
    target: number;
}

const Hint: React.SFC<iHint> = (props) => {
    const { emit, target } = props;
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
                tabIndex={0}
                href="#retry"
            >
                New Game
            </a>
        </p>
    );
};

export default Hint;
