import * as React from 'react';
import {Button, Modal, Carousel} from 'react-bootstrap';
import * as assets from '../../assets';
import * as helpImgs from '../../assets/help';
import SvgButton from '../App/SvgButton';
import './Help.scss';

interface iHelp { title: string; show: boolean; onClose: () => void; }

const helpData = [
    {
        text: <p>There are some numbers on the board.</p>,
        image: helpImgs.help_1,
        alt: 'First slide',
    },
    {
        text: <p>Swipe any direction (Up, Down, Left, Right) to move all tiles.</p>,
        image: helpImgs.help_2,
        alt: 'Second slide',
    },
    {
        text: <p>A new tile of 2 or 4 will appear on the board after each move.</p>,
        image: helpImgs.help_3,
        alt: 'Third slide',
    },
    {
        text: <p>When two tiles with the same number touch, they merge into one!</p>,
        image: helpImgs.help_4,
        alt: 'Forth slide',
    },
    {
        text: <p>When the board is filled up, you lose.</p>,
        image: helpImgs.help_5,
        alt: 'Fifth slide',
    },
    {
        text: <p>When a 2048 tile is created, <br />you WIN!</p>,
        image: helpImgs.help_6,
        alt: 'Sixth slide',
    },
];

const Help: React.SFC<iHelp> = (props) => {
    const [carouselIndex, setCarouselIndex] = React.useState<number>(0);
    const [animationOn, setAnimationOn] = React.useState<boolean>(false);
    const noOfCarouselItems = 6;
    const { title, show, onClose } = props;
    const keyB = true;
    const move = (goToIndex) => {
        if (!animationOn) {
            if (goToIndex!==carouselIndex) {
                setAnimationOn(true);
                setCarouselIndex(goToIndex);
            }
        } 
    };
    const moveRight = () => move((carouselIndex < noOfCarouselItems - 1 ? carouselIndex + 1: carouselIndex));
    const moveLeft = () => move((carouselIndex > 0 ? carouselIndex - 1: carouselIndex));
    const turnOffAnimation = () => setAnimationOn(false);
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
                <Carousel activeIndex={carouselIndex} keyboard={keyB} controls={false} interval={null} onSlideEnd={turnOffAnimation}>
                    {helpData.map((help) => (
                        <Carousel.Item key={help.alt.replace(' ','')}>
                            <div className="slide-header">
                                {help.text}
                            </div>
                            <img
                                className="d-block w-100"
                                src={help.image}
                                alt={help.alt}
                            />
                            <div className="spacer" />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <SvgButton url={assets.trianglecircle} text="left" onClick={moveLeft} />
                </div>
                <div>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
                <div>
                    <SvgButton url={assets.trianglecircle} text="Right" onClick={moveRight} />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default Help;
