import * as React from 'react';
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import '../App.css';

function GalleryPage() {
    return (
        <div>
            <p className='center'>
                <img className='centerImagePadding' src={logo} alt="Aardvark Games Logo"></img>
            </p>

            <div className="wideColumnContainer">
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
            </div>
        </div>
    );
}

export default GalleryPage;