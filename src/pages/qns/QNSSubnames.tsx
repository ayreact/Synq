import React from 'react';
import './QNSSubnames.css';

const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronDownIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const QNSSubnames = () => {
    return (
        <div className="qns-subnames-page">
            <div className="subnames-controls">
                <button className="filter-btn">
                    Creation Date
                    <ChevronDownIcon />
                </button>
                <div className="subnames-search-bar">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="no-subnames-card">
                <p>No subname have been added</p>
            </div>
        </div>
    );
};

export default QNSSubnames;