import React from 'react';
import FilterFotosByTitle from '../Components/FilterFotosByTitle';
import FilterFotosByTag from '../Components/FilterFotosByTag';

function Filters() {
  return (
    <div className="allFilter">
      <FilterFotosByTitle />
      <FilterFotosByTag />
    </div>
  );
}

export default Filters;
