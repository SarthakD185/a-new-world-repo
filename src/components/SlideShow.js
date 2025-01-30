import * as React from 'react';
import image1 from "../assets/images/GamePiecesOnIslandsBoardSquare.png";
import image2 from "../assets/images/GamePiecesOnDesertBoardSquare.png";
import image3 from "../assets/images/GamingAardvarkForestsOfLegendSquare.png";
import image4 from "../assets/images/GamePiecesOnJungleBoardSquare.png";
import image5 from "../assets/images/GameBoardUnderseaSquare.png";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../assets/css/SlideShow.css';

{/* https://react-slideshow-image.netlify.app/?path=/story/introduction--page */}

const buttonStyle = {
    width: "30px",
    background: 'none',
    border: '0px'
};

const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></button>,
    nextArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></button>
}

function SlideShow() {

    return (
    
        <div>

            <div id='slideContainer'>
                <Slide {...properties}>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${image1})` }}>
                            <span>Islands</span>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${image2})` }}>
                            <span>Desert</span>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${image3})` }}>
                            <span>Forest</span>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${image4})` }}>
                            <span>Jungle</span>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${image5})` }}>
                            <span>Undersea</span>
                        </div>
                    </div>
                </Slide>
            </div>
            
            <i><caption>Possible Environments in A New World</caption></i>

        </div>

    );
}

export default SlideShow;