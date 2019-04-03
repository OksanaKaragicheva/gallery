import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class FilterFotosByTitle extends Component {
  render() {
    return (
      <InputGroup className="filter">
    <FormControl
      placeholder="Enter the title..."
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="info" className="filterButton">Filter by title</Button>
    </InputGroup.Append>
  </InputGroup>
    );
  }
}

export default FilterFotosByTitle;
