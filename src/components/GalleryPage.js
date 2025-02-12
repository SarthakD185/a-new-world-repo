// image gallery taken from https://github.com/candraKriswinarto/react-images-gallery
// I refactored the code to from TypeScript to JavaScript
// Removed relevant tsx things. 

// This is an image gallery that displays images in a grid and allows the user to click on them and view them in a lightbox. 
// When in the lightbox, users have the ability to view the image in full screen, download the image, and zoom in on the image, view the image description and navigate through the images using arrow buttons. 


import * as React from 'react';
import GalleryGrid from './gallery/GalleryGrid.jsx';
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import FileUploader from './gallery/FileUploader.jsx';
import '../App.css';

function GalleryPage() {
    return (
        <div>
            <p className='center'>
                <img className='centerImagePadding' src={logo} alt="Aardvark Games Logo"></img>
                <h1>Gallery</h1>
            </p>

            <div>
                
                <FileUploader />
            </div>


            <div>
                <GalleryGrid />
            </div>
        </div>
    );
}

export default GalleryPage;