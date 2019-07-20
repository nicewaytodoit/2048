/* eslint-disable react/prop-types */
import * as React from 'react';

interface iRow{
    children: Element[] | Element,
}

const Row: React.SFC<iRow>  = (props) => {
    const { children } = props;
    return (
        <div className="grid-row">{children}</div>
    );
};

export default Row;
