import React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

function Photo(props) {
    return (
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

    );
}

export default Photo;
