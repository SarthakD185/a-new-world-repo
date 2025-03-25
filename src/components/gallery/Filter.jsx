// https://refine.dev/blog/react-search-bar-and-filtering/#implementing-the-logic
// A filter component that allows the user to search for items and filter them by status, 
// used to filter and search images in the gallery grid

import React, { useState } from 'react';
import "./GalleryGrid.css";
import galleryData from "../../assets/data/gallery.json";

function Filter({ onClick }) {
    const [inputValue, setInputValue] = useState("");
    const [activeFilter, setActiveFilter] = useState("");
    const filters = [...new Set(galleryData.map(item => item.teamName))];

    const handleFilterClick = (filter) => {
        // If clicking the same filter, toggle it off
        if (filter === activeFilter) {
            setActiveFilter("");
        } else {
            setActiveFilter(filter);
        }
    };

    const handleSearch = (e) => {
        setInputValue(e.target.value.toLowerCase());
    };

    // Handle image click to open lightbox
    const handleClickImage = (item) => {
        // Find the index of the clicked image in the galleryData array
        const index = galleryData.findIndex(data => data.id === item.id);
        if (index !== -1) {
            onClick(index);
        }
    };

    return (
        <div className="filter-container">
            {/* Search Bar */}
            <div className="search-section">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search by team name..."
                    className="search-input"
                />
            </div>
 
            {/* Filter Buttons */}
            <div className="filter-buttons">
                
                {filters.map((filter) => (
                    <button
                        key={filter} 
                        onClick={() => handleFilterClick(filter)}
                        // Base class 'filter-button' is always applied, then conditionally adds 'active' class
                        // If this button's filter state is 'activeFilter' status...
                        // the logic adds 'active' css class, otherwise adds empty string
                        className={`filter-button ${filter === activeFilter ? 'active' : ''}`}
                    >
                        {/* Actual button action - capitalize first letter of filter + display the rest of the filter word */}
                        {/* filter.slice(1) returns all characters after index 0, e.g.:
                            "published" -> "ublished"
                            "draft" -> "raft" 
                            "rejected" -> "ejected"
                        */}
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
                {/* end of mapping */}
            </div>

            {/* Filtered Items */}
            <div className="items-grid">
                {/* gallery is an array of objects, each with properties: 
                    - id
                    - teamName
                    - src
                    - description
                    This array is first filtered based on search/filter criteria,
                    then mapped to JSX elements */}

                {/* First filters items by checking if the lowercase title includes the 
                    search input value
                    Then checks if either no filter is selected (activeFilter="") OR if item 
                    teamName matches the selected filter    */}
                {galleryData
                    .filter(item => 
                        item.teamName.toLowerCase().includes(inputValue) &&
                        (activeFilter === "" || item.teamName === activeFilter)
                    )

                    // .map() creates a new array by applying a function to each element of the original array
                    // For each element, it returns a new value that replaces the original element
                    .map(item => (
                        <div 
                            key={item.id} 
                            className="item-card"
                            onClick={() => handleClickImage(item)}
                        >
                            <div className="item-card-img-container">
                                <img src={item.src} alt={item.description} style={{ width: '100%', height: '100%' }} />
                            </div>
                            <p>Team Name: {item.teamName}</p>
                        </div>
                    ))}
                {/* end of items array */}
            </div>
            {/* items grid */}
        </div>
    );
}

export default Filter;
