import React, { Component } from 'react';
import AlbumsDropdown from '../Components/AlbumsDropdown';

class Gallery extends Component {
  render() {
    return (
      <AlbumsDropdown api="https://jsonplaceholder.typicode.com/" />
    );
  }
}

export default Gallery;
