import * as React from 'react';
import GalleryGrid from './gallery/GalleryGrid.jsx';
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import FileUploader from './gallery/FileUploader.jsx';
// 🚫 Removed extra Filter import
import '../App.css';
import { AccountContext } from '../Account';


function GalleryPage() {
    const { user } = React.useContext(AccountContext);
    const isAdmin = user?.role === 'admin';
    const isModerator = user?.role === 'moderator';
    const isCaptain = user?.role === 'captain';

    return (
        <div>
            <div className='center'>
                <img className='logo' src={logo} alt="Aardvark Games Logo" />
                <h1>Gallery</h1>
            </div>

            <div className="gallery-content">
                <div className="gallery-card">
                    {/* 🚫 Removed this line: <Filter /> */}
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
