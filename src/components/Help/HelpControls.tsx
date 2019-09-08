/* global document */
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import * as assets from '../../assets';
import SvgButton from '../App/SvgButton';

interface Props {
    moveLeft: () => void,
    moveRight: () => void,
    onClose: (e: object) => void,
}
interface State {

}

class HelpControls extends React.Component<Props, State> {
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
                return moveRight();
            case 37:
                return moveLeft();
            default:
                return;
        }
    };
    render() {
        const { moveLeft, moveRight, onClose } = this.props;
        return (
            <>
                <div>
                    <SvgButton url={assets.trianglecircle} text="left" onClick={moveLeft} />
                </div>
                <div>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
                <div>
                    <SvgButton url={assets.trianglecircle} text="Right" onClick={moveRight} />
                </div>
            </>
        );
    }
}

export default HelpControls;
