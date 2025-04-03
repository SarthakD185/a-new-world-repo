import React, { useState, useEffect } from 'react';
import './GalleryGrid.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function GalleryGrid() {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const slideProperties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  };

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://bs9mr54c86.execute-api.us-east-1.amazonaws.com/prod/getGallery', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data) || data.length === 0) {
          setError('No images available');
          setGalleryData([]);
          return;
        }

        const formattedData = data.map(item => ({
          src: item.Src,
          title: item.CollegeID,
          description: item.Description,
          teamName: `Team Name: ${item.CollegeID}`
        })).filter(item => item.src && item.title); // Only keep items with required data
        
        if (formattedData.length === 0) {
          setError('No valid images available');
          return;
        }

        setGalleryData(formattedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        setError(err.message);
        setGalleryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Don't render anything if we're loading or have no data
  if (loading || error || !galleryData || galleryData.length === 0) {
    return null;
  }

  // Only render if we actually have data
  return galleryData.length > 0 ? (
    <div className="gallery-container">
      {selectedImage ? (
        <div className="slideshow-container">
          <button className="back-button" onClick={() => setSelectedImage(null)}>
            Back to Gallery
          </button>
          <Slide {...slideProperties}>
            {galleryData.map((item, index) => (
              <div className="each-slide" key={index}>
                <div style={{ backgroundImage: `url(${item.src})` }}>
                  <div className="slide-caption">{item.teamName}</div>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      ) : (
        <div className="gallery-grid">
          {galleryData.map((item, index) => (
            <div 
              key={index} 
              className="gallery-item" 
              onClick={() => setSelectedImage(item)}
              role="button"
              tabIndex={0}
            >
              <img src={item.src} alt={item.description || item.title} />
              <div className="team-name">{item.teamName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
}

export default GalleryGrid; 