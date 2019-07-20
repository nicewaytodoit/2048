import * as React from 'react';

const Credits: React.SFC<{}> = () => {
    return (
        <p>
            React variation of 1024 created by 
            {' '}<a href="https://nicewaytodoit.github.io/aleksandar.ristevski.me/" target="_blank" rel="noopener noreferrer">Aleksandar Ristevski</a>
            {' '}based on
            {' '}<a href="https://codepen.io/camsong/pen/wcKrg" target="_blank" rel="noopener noreferrer">2048 by Gabriele Cirulli.</a>
            {' '}which is again based on :) 
            {' '}<a href="https://itunes.apple.com/us/app/1024!/id823499224" target="_blank" rel="noopener noreferrer">1024 by Veewo Studio</a>
            {' '}and conceptually similar to
            {' '}<a href="http://asherv.com/threes/" target="_blank" rel="noopener noreferrer">Threes by Asher Vollmer.</a>
        </p>
    );
};

export default Credits;
