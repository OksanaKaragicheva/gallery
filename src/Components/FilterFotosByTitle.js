import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function FilterFotosByTitle(props) {
   return (
      <InputGroup className="filter">
        <FormControl
          value={props.titleToFilter}
          placeholder="Enter the title..."
          aria-label="Title"
          aria-describedby="basic-addon2"
          onChange={props.handleTitleToFilter}
        />
          <InputGroup.Append>
            <Button variant="info" className="filterButton" onClick={props.filterByTitle}>Filter by title</Button>
          </InputGroup.Append>
       </InputGroup>
    );
}

export default FilterFotosByTitle;
