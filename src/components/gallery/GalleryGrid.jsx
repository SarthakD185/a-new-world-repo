import React from 'react';
import { useState } from 'react';
import './GalleryGrid.css';
import Lightbox from 'yet-another-react-lightbox';
import { slides } from '../../assets/images/sample gallery data/data.js';
import 'yet-another-react-lightbox/styles.css';
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Images from './Images.jsx';
import Filter from './Filter.jsx';
function GalleryGrid() {
  const [index, setIndex] = useState(-1);

    return (
        <>
        <div className="page-wrapper">
          <div className="box" id="filter-imgs-box">
            <Filter/>
            <Images
              data={slides}
              onClick={(currentIndex) => setIndex(currentIndex)}
            /> {/* end of images */}
          </div>
        </div>  {/* end of page wrapper */}
  
          <Lightbox
            plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
            captions={{
              showToggle: false,
              descriptionTextAlign: 'end',
            }}
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={slides}
          /> {/* end of lightbox */}
      </> //end of return()
    );
}

export default GalleryGrid; 