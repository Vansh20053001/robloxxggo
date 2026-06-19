import React from 'react';
import '../styles/style.css';

export default function SearchBar({ value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" style={{ fontSize: '12px', padding: '4px 12px' }}>Search</button>
    </form>
  );
}
