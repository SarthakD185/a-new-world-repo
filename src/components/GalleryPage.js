// image gallery taken from https://github.com/candraKriswinarto/react-images-gallery
// I refactored the code to from TypeScript to JavaScript
// Removed relevant tsx things. 

// This is an image gallery that displays images in a grid and allows the user to click on them and view them in a lightbox. 
// When in the lightbox, users have the ability to view the image in full screen, download the image, and zoom in on the image, view the image description and navigate through the images using arrow buttons. 

import * as React from 'react';
import GalleryGrid from './gallery/GalleryGrid.jsx';
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import FileUploader from './gallery/FileUploader.jsx';
import Filter from './gallery/Filter.jsx';
import '../App.css';
import { AccountContext } from '../Account';


function GalleryPage() {
    const { user } = React.useContext(AccountContext);
    const isAdmin = user?.role === 'admin';
    const isModerator = user?.role === 'moderator';
    const isCaptain = user?.role === 'captain';

    return (
        <div >
            <div className='center'>
                <img className='logo' src={logo} alt="Aardvark Games Logo" />
                <h1>Gallery</h1>
            </div>

            <div className="gallery-content">
                <div className="gallery-card">
                    <Filter />
                    <GalleryGrid />
                </div>
            </div>

            {isAdmin || isModerator || isCaptain && (
                <div className="upload-section">
                    <FileUploader />
                </div>
            )}
        </div>
    );
}

export default GalleryPage;