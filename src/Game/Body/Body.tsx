/* eslint-disable react/prop-types, no-unused-vars */
import * as React from 'react';
import Grid from './Grid';
import Message, { ioMessage } from './Message';

interface iBody {
    GridSize: number;
    message: ioMessage;
    tiles: Array<React.ReactNode | React.ReactChild | React.ReactElement | React.ElementType>;
    emit(command: string): void;
}

const Body: React.SFC<iBody> = (props) => {
    const { GridSize, message, tiles, emit } = props;
    return (
        <div className="game-container">
            <Message message={message} emit={emit} />

            <Grid GridSize={GridSize} />

            <div className="tile-container">
                {tiles}    
            </div>
        </div>
    );
};

export default Body;
