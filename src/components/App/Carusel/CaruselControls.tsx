/* global document */
import * as React from 'react';
import * as assets from '../../../assets';
import SvgButton from '../SvgButton';

interface Props {
    moveLeft: (e:any) => void,
    moveRight: (e:any) => void,
}
interface State { }

class CaruselControls extends React.Component<Props, State> {
    state = {}
    componentDidMount() {
        document.addEventListener("keydown", this.keyPress, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyPress, false);
    }
    keyPress = (e: any): void => {
        const { moveLeft, moveRight } = this.props;
        const { keyCode } = e;
        switch (keyCode) {
            case 39:
                return moveRight(e);
            case 37:
                return moveLeft(e);
            default:
                return;
        }
    };
    render() {
        const { moveLeft, moveRight } = this.props;
        return (
            <nav>
                <div>
                    <SvgButton url={assets.triangleround} text="Next" onClick={moveLeft} />
                </div>
                <div />
                <div>
                    <SvgButton url={assets.triangleround} text="Previous" onClick={moveRight} />
                </div>
            </nav>
        );
    }
}

export default CaruselControls;
