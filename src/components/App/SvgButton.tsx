import * as React from 'react';

interface iSvgButton {
    url: string;
    text: string;
    onClick?: (e: object) => void;
}

const SvgButton: React.SFC<iSvgButton> = (props) => {
    const { url, text, onClick } = props;
    const btnStyles = {
        "WebkitMask": `url(${url}) no-repeat center`,
        mask: `url(${url}) no-repeat center`,
    };
    return (
        <div
            style={btnStyles}
            role="button"
            onClick={onClick}
            onKeyDown={onClick}
            tabIndex={0}
            title={text}
        />
    );
};

export default SvgButton;
