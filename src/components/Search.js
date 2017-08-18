import React from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
  onSearch: PropTypes.func
};

export function Search({ onSearch }) {
  return (
    <div>
      <input name="searchInput" onChange={({target}) => onSearch(target.value)}/>
    </div>
  );
}
