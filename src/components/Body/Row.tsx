/* eslint-disable no-undef */
import * as React from 'react';

interface iRow{
    children: JSX.Element[] | JSX.Element,
}

const Row: React.SFC<iRow>  = (props) => {
    const { children } = props;
    return (
        <div className="grid-row">{children}</div>
    );
};

export default Row;
