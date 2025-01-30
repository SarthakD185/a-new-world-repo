// image gallery taken from https://github.com/candraKriswinarto/react-images-gallery
// I refactored the code to from TypeScript to JavaScript
// Removed relevant tsx things. 

// This is an image gallery taht displays images in a grid and allows the user to click on them and view them in a lightbox. 
// When in the lightbox users have the ability to view the image in full screen, download the image, and zoom in on the image, view the image description and navigate through the images using arrow buttons. 


import * as React from 'react';
import GalleryGrid from './gallery/GalleryGrid.jsx';
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import '../App.css';

function GalleryPage() {
    return (
        <div>
            <p className='center'>
                <img className='centerImagePadding' src={logo} alt="Aardvark Games Logo"></img>
            </p>

            <div className="box" style={{ backgroundColor: '#e1f3f4' }}>
                <GalleryGrid />
            </div>

            {/* <div className="wideColumnContainer">
                <div className='box'>
                    <h2>Gallery</h2>
                    
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="https://placehold.co/200" alt="Meeple City" />
                            <h3>Meeple City</h3>
                            <p>Build and manage your own city of meeples!</p>
                        </div>

                        <div className="gallery-item">
                            <img src="https://placehold.co/200" alt="Meeple City" />
                            <h3>Meeple City</h3>
                            <p>Build and manage your own city of meeples!</p>
                        </div>

                        <div className="gallery-item">
                            <img src="https://placehold.co/200" alt="Meeple City" />
                            <h3>Meeple City</h3>
                            <p>Build and manage your own city of meeples!</p>
                        </div>

                        <div className="gallery-item">
                            <img src="https://placehold.co/200" alt="Meeple City" />
                            <h3>Meeple City</h3>
                            <p>Build and manage your own city of meeples!</p>
                        </div>

                        <div className="gallery-item">
                            <img src="https://placehold.co/200" alt="Meeple City" />
                            <h3>Meeple City</h3>
                            <p>Build and manage your own city of meeples!</p>
                        </div>

                        <div className="gallery-item">
                            <img src="https://placehold.co/200" alt="Meeple City" />
                            <h3>Meeple City</h3>
                            <p>Build and manage your own city of meeples!</p>
                        </div>
                    </div>
                </div>
            </div>  */}
        </div>
    );
}

export default GalleryPage;