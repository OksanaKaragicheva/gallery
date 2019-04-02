import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Photos(props) {
    return (
      <Container>
        <Row>
          {props.photos.map((photo) => {
            return (
             <Col xs={6} md={4} key={photo.id}>
              <figure key={photo.id}>
                <Image src={photo.thumbnailUrl} rounded />
                  <figcaption>
                    {photo.title}
                  </figcaption>
              </figure>
             </Col>

        )
      }
      )

      }
        </Row>
      </Container>
    );
}

export default Photos;
