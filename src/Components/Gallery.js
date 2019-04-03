import React from 'react';
import AlbumsDropdown from '../Components/AlbumsDropdown';

function Gallery(props) {
  return (
      <AlbumsDropdown api="https://jsonplaceholder.typicode.com/" />
    );
}

export default Gallery;
