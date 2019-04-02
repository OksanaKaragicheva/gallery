import React from 'react';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import Photo from '../Components/Photo';

function Photos(props) {
    return (

          <Photo photos={props.photos} />

    );
}

export default Photos;
