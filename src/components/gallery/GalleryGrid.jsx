import React, { useState, useEffect } from 'react';
import './GalleryGrid.css';
import Filter from './Filter';

function GalleryGrid() {
  const [galleryData, setGalleryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://bs9mr54c86.execute-api.us-east-1.amazonaws.com/prod/getGallery');
        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        const formattedData = data.map(item => ({
          src: item.s3Url || item.imageUrl || item.src || item.image_path,
          title: item.CollegeID || "Unknown",
          description: item.description || "",
          teamName: item.teamName || "No Team Name"
        }));

        setGalleryData(formattedData);
        setFilteredData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const handleFilter = (filtered) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const searched = filtered.filter(item =>
      item.teamName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(searched);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const lowerCaseQuery = query.toLowerCase();
    const filtered = galleryData.filter(item =>
      item.teamName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="gallery-container">
      {selectedImageIndex !== null && (
        <div className="modal-overlay" onClick={() => setSelectedImageIndex(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImageIndex(null)}>&times;</button>
            <img
              src={filteredData[selectedImageIndex].src}
              alt={filteredData[selectedImageIndex].description || filteredData[selectedImageIndex].title}
            />
            <div className="slide-caption">{filteredData[selectedImageIndex].teamName}</div>
            {selectedImageIndex > 0 && (
              <button className="modal-arrow left" onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}>
                &#8592;
              </button>
            )}
            {selectedImageIndex < filteredData.length - 1 && (
              <button className="modal-arrow right" onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}>
                &#8594;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by team name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <Filter
        galleryData={galleryData}
        onFilter={handleFilter}
        onClick={(item) => {
          const index = filteredData.findIndex(i => i.src === item.src);
          setSelectedImageIndex(index);
        }}
      />

      <div className="gallery-grid">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setSelectedImageIndex(index)}
            role="button"
            tabIndex={0}
          >
            <div className="image-container">
              <img src={item.src} alt={item.description || item.title} />
            </div>
            <div className="team-name">{item.teamName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryGrid;
