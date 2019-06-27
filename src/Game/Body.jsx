import React from 'react';

const Cell = (props) => {
    return (
        <div class="grid-cell"></div>
    );
};

const Row = (props) => {
    const { children } = props;
    return (
        <div class="grid-row">{children}</div>
    );
};

const Grid = (props) => {
    const { GridSize } = props;
    const grid = Array(GridSize).fill(1);
    return (
        <div class="grid-container">
            {grid.map(() => (
                <Row>
                    {grid.map(() => <Cell />)}
                </Row>
            ))}
        </div>
    );
};

const Body = (props) => {
    return (
        <div class="game-container">
            <div class="game-message">
                <p></p>
                <div class="lower">
                    <a class="retry-button">Try again</a>
                </div>
            </div>

            <Grid GridSize={4} />

            <div class="tile-container">

            </div>
        </div>
    );
};

export {
    Body as default,
    Grid,
    Row,
    Cell,
};
