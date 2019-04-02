import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Photo from '../Components/Photo';

function Photos(props) {
    return (
      <Container>
        <Row>
          <Photo />
        </Row>
      </Container>
    );
}

export default Photos;
