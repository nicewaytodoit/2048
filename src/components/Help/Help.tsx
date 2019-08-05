import * as React from 'react';
import {Button, Modal, Carousel} from 'react-bootstrap';
import * as assets from '../../assets';
import * as testImgs from '../../assets/chooser';
import SvgButton from '../../App/SvgButton';
import './Help.scss';

interface iHelp { title: string; show: boolean; onClose: () => void; }

const Help: React.SFC<iHelp> = (props) => {
    const { title, show, onClose } = props;
    return (
        <Modal
            show={show}
            onHide={onClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Carousel keyboard controls={false} interval={null}>
                    <Carousel.Item>
                        <div className="slide-header">
                            <p>just a test</p>
                        </div>
                        <img
                            className="d-block w-100"
                            src={testImgs.img5x5}
                            alt="First slide"
                        />
                        <div className="spacer" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="slide-header 2">
                            <p>just a test</p>
                        </div>
                        <img
                            className="d-block w-100"
                            src={testImgs.img8x8}
                            alt="Third slide"
                        />
                        <div className="spacer" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="slide-header">
                            <p>just a test 3</p>
                        </div>
                        <img
                            className="d-block w-100"
                            src={testImgs.img11x11}
                            alt="Third slide"
                        />
                        <div className="spacer" />
                    </Carousel.Item>
                </Carousel>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <SvgButton url={assets.trianglecircle} text="left" />
                </div>
                <div>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
                <div>
                    <SvgButton url={assets.trianglecircle} text="Right" />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default Help;
