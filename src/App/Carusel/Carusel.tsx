/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import './Carusel.scss';
import * as chooserImages from '../../assets/chooser';

interface GameType { text: string, value: number, url: string }

interface iCarusel {
    GameTypes: Array<GameType>;
    HandleChange(e): void;
}

const Carusel: React.SFC<iCarusel> = (props) => {
    const [rotation, setRotation] = React.useState<number>(0);
    const slice = 360 / props.GameTypes.length;
    const rotate = (direction) => { 
        setRotation((rotation + (direction * slice))); // % 360
        props.HandleChange({ target: { value: ((rotation + (direction * slice)) / slice) }});
    };
    const rotateNext = () => rotate(-1);
    const rotatePrev = () => rotate(1);

    const barerelStyle = {
        "-webkit-transform": "rotateY(" + rotation + "deg)",
        "-moz-transform": "rotateY(" + rotation + "deg)",
        "-o-transform": "rotateY(" + rotation + "deg)",
        "transform": "rotateY(" + rotation + "deg)",
    };

    return (
        <div className="Carusel">
            <div className="container">
                <div className="barrel" style={barerelStyle}>
                    {props.GameTypes.map((item, index) => {
                        const itemStyle = { transform: `rotateY(${(index * slice).toString()}deg)` };
                        console.log(itemStyle);
                        return (
                            <div key={`k-${item.value}-${item.value}`} className="item" style={itemStyle}>
                                <div>
                                    <img style={{height:"200px"}} src={chooserImages[item.url]} alt={`Grid ${item.value} x ${item.value}`} />
                                </div>
                                <div>{item.text} <br /> {item.value} x {item.value}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <nav>
                <div>
                    <div className="next" onClick={rotateNext} onKeyDown={rotateNext} role="button" tabIndex={0}>Next</div>
                </div>
                <div />
                <div>
                    <div className="prev" onClick={rotatePrev} onKeyDown={rotateNext} role="button" tabIndex={-1}>Prev</div>
                </div>
            </nav>
        </div>
    );
};

export default Carusel;
