import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class FilterFotosByTag extends Component {
  constructor(props) {
    super(props);

    this.filterByTag = this.filterByTag.bind(this);

  }
  filterByTag(){

  }
  render() {
    return (
      <InputGroup className="filter">
    <FormControl
      value={this.props.tag}
      placeholder="Enter the tag..."
      aria-label="Tag"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="info" className="filterButton" onClick={this.filterByTag}>Filter by tag</Button>
    </InputGroup.Append>
  </InputGroup>
    );
  }
}

export default FilterFotosByTag;
