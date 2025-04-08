import React, { useState, useEffect } from 'react';
import './GalleryGrid.css';

function Filter({ galleryData = [], onFilter }) {
  const [activeFilter, setActiveFilter] = useState('');

  const filters = Array.isArray(galleryData)
    ? [...new Set(galleryData.map(item => item.teamName))]
    : [];

  useEffect(() => {
    filterData();
  }, [activeFilter, galleryData]);

  const handleFilterClick = (filter) => {
    setActiveFilter(prev => (prev === filter ? '' : filter));
  };

  const filterData = () => {
    const filtered = galleryData.filter(item =>
      activeFilter === '' || item.teamName === activeFilter
    );
    onFilter(filtered);
  };

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        {filters.length > 0 ? (
          filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`filter-button styled-button ${filter === activeFilter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))
        ) : (
          <p>No filters available</p>
        )}
      </div>
    </div>
  );
}

export default Filter;
