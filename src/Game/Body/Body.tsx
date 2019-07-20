/* eslint-disable react/prop-types */
import * as React from 'react';
import Grid from './Grid';
import Message, { ioMessage } from './Message';

interface iBody {
    GridSize: number;
    message: ioMessage;
    tiles: Element[];
    emit(command: string): void;
}

const Body: React.SFC<iBody> = (props) => {
    const { GridSize, message, tiles, emit } = props;
    return (
        <div className="game-container">
            <Message message={message} emit={emit} />

            <Grid Size={GridSize} />

            <div className="tile-container">
                {tiles}    
            </div>
        </div>
    );
};

export default Body;
