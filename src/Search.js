import React from 'react';


export function SearchForm({onSearch}) {

    return (

      <form onSubmit={ e => {
        e.preventDefault();
        const form = e.target;
        onSearch(form.elements.search.value);
        }}>
        <input type="text" name="search"/>
        <button type="submit">Search</button>
      </form>

    )

  }