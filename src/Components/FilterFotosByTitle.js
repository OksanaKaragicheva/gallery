import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class FilterFotosByTitle extends Component {


  render() {
    return (
      <InputGroup className="filter">
    <FormControl
      value={this.props.title}
      placeholder="Enter the title..."
      aria-label="Title"
      aria-describedby="basic-addon2"
      onChange={this.props.handleTitle}
    />
    <InputGroup.Append>
      <Button variant="info" className="filterButton" onClick={this.props.filterByTitle}>Filter by title</Button>
    </InputGroup.Append>
  </InputGroup>
    );
  }
}

export default FilterFotosByTitle;
