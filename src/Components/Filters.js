import React from 'react';
import FilterFotosByTitle from '../Components/FilterFotosByTitle';
import FilterFotosByTag from '../Components/FilterFotosByTag';

function Filters(props) {
  return (
    <div className="allFilter">
      <FilterFotosByTitle title={props.title} />
      <FilterFotosByTag tag={props.tag} />
    </div>
  );
}

export default Filters;
