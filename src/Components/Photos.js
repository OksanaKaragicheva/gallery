import React from 'react';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

function Photos(props) {
    return (
      <div>
      {props.photos.map(photo =>
         <img src={photo.thumbnailUrl} key={photo.id} alt={`Pic ${photo.id}`} />)}
      </div>
    );
}

export default Photos;
