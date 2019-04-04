import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function FilterFotosByTag(props) {
   return (
      <InputGroup className="filter">
        <FormControl
          value={props.tagToFilter}
          placeholder="Enter the tag..."
          aria-label="Tag"
          aria-describedby="basic-addon2"
          onChange={props.handleTagToFilter}
        />
          <InputGroup.Append>
            <Button variant="info" className="filterButton" onClick={props.filterByTag}>Filter by tag</Button>
          </InputGroup.Append>
      </InputGroup>
    );
}

export default FilterFotosByTag;
