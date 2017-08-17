import React from 'react';

export function Search({ onSearch }) {
    return (
        <form onSubmit={e => {
            e.preventDefault();
            const form = e.target;
            onSearch(form.elements.search.value);
        }}>
            <input name="search" placeholder="Search a movie title..." />
            <button type="submit">Search</button>
        </form>
    );
}