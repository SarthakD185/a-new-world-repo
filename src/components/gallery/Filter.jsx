// https://refine.dev/blog/react-search-bar-and-filtering/#implementing-the-logic


import React, { useState } from 'react';
import "./GalleryGrid.css";

function Filter() {
    const [inputValue, setInputValue] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    // Mock data - replace with your actual data source
    const items = [
        { id: 1, title: "Image 1", status: "published" },
        { id: 2, title: "Image 2", status: "draft" },
        { id: 3, title: "Image 3", status: "rejected" }
    ];

    const filters = ["published", "draft", "rejected"];

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

    return (
        <div className="filter-container">
            {/* Search Bar */}
            <div className="search-section">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search by title..."
                    className="search-input"
                />
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleFilterClick(filter)}
                        className={`filter-button ${filter === activeFilter ? 'active' : ''}`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            {/* Filtered Items */}
            <div className="items-grid">
                {items
                    .filter(item => 
                        item.title.toLowerCase().includes(inputValue) &&
                        (activeFilter === "" || item.status === activeFilter)
                    )
                    .map(item => (
                        <div key={item.id} className="item-card">
                            <h3>{item.title}</h3>
                            <p>Status: {item.status}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Filter;
