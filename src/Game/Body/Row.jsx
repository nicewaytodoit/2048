import React from 'react';

const Row = (props) => {
    const { children } = props;
    return (
        <div class="grid-row">{children}</div>
    );
};

export default Row;
