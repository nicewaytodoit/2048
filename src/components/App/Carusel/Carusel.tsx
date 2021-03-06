/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import './Carusel.scss';
import * as chooserImages from '../../../assets/chooser';
import CaruselControls from './CaruselControls';


interface GameType { text: string, value: number, url: string }

interface iCarusel {
    GameTypes: Array<GameType>;
    HandleChange(e): void;
}

const Carusel: React.SFC<iCarusel> = (props) => {
    const [rotation, setRotation] = React.useState<number>(0);
    const slice = 360 / props.GameTypes.length;
    const rotate = (e, direction) => {
        e.preventDefault();
        console.log('XXXXX', direction);
        const totalRotation = rotation + (direction * slice);
        setRotation(totalRotation);
        // const rollLeft = (size, i) => (size + i) % size;
        const rollRight = (size, i) => i % size;
        const indexRaw = direction > 0 ? ((360 - (totalRotation % 360)) % 360) / slice : Math.abs(totalRotation / slice);
        const index = rollRight(props.GameTypes.length, indexRaw);
        const position = props.GameTypes[index].value;
        props.HandleChange(position);
    };
    const rotateNext = (e) => rotate(e,1);
    const rotatePrev = (e) => rotate(e,-1);

    const barerelStyle = {
        "WebkitTransform": "rotateY(" + rotation + "deg)",
        "MozTransform": "rotateY(" + rotation + "deg)",
        "OTransform": "rotateY(" + rotation + "deg)",
        "transform": "rotateY(" + rotation + "deg)",
    };

    return (
        <div className="Carusel">
            <div className="container">
                <div className="barrel" style={barerelStyle}>
                    {props.GameTypes.map((item, index) => {
                        const itemStyle = { transform: `rotateY(${(index * slice).toString()}deg)` };
                        return (
                            <div key={`k-${item.value}-${item.value}`} className="item" style={itemStyle}>
                                <div>
                                    <img style={{height:"200px"}} src={chooserImages[item.url]} alt={`Grid ${item.value} x ${item.value}`} />
                                </div>
                                <div className="text">
                                    {item.text}
                                    <br />
                                    {item.value} x {item.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <CaruselControls moveLeft={rotateNext} moveRight={rotatePrev} />
        </div>
    );
};

export default Carusel;
