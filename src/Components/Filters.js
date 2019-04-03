import React from 'react';
import FilterFotosByTitle from '../Components/FilterFotosByTitle';
import FilterFotosByTag from '../Components/FilterFotosByTag';

function Filters(props) {
  return (
    <div className="allFilter">
      <FilterFotosByTitle
        title={props.title}
        handleTitle={props.handleTitle}
        filterByTitle={props.filterByTitle}
      />
      <FilterFotosByTag
        tag={props.tag}
        handleTag={props.handleTag}
        filterByTag={props.filterByTag}
      />
    </div>
  );
}

export default Filters;
