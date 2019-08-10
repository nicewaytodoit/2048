import * as React from 'react';

interface iSVGTest { tileStyles: any; tile: any; }

const SVGTest: React.SFC<iSVGTest> = ({ tileStyles, tile }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${tileStyles.tileSize}px`}
        height={`${tileStyles.tileSize}px`}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMinYMin"
    >
        <text
            xmlns="http://www.w3.org/2000/svg"
            x="50"
            y="50"
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize="2em"
            fontFamily="Arial"
            fontWeight="bold"
        >
            {tile.value}
        </text>
    </svg>
);

export default SVGTest;
