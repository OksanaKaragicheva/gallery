import React from 'react';
import FilterFotosByTitle from '../Components/FilterFotosByTitle';
import FilterFotosByTag from '../Components/FilterFotosByTag';

function Filters(props) {
  return (
    <div className="allFilter">
      <FilterFotosByTitle
        titleToFilter={props.titleToFilter}
        handleTitleToFilter={props.handleTitleToFilter}
        filterByTitle={props.filterByTitle}
      />
      <FilterFotosByTag
        tagToFilter={props.tagToFilter}
        handleTagToFilter={props.handleTagToFilter}
        filterByTag={props.filterByTag}
      />
    </div>
  );
}

export default Filters;
