import React from 'react';
//import Image from 'react-bootstrap/Image';
//import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function Photos(props) {
    return (
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        {props.photos.map((photo) => {
            return (
              <Card key={photo.id} style={{ width: "150px", marginTop: "10px", marginRight: "10px" }}>
  <Card.Img variant="top" src={photo.thumbnailUrl} />
  <Card.Body style={{display: "flex", flexFlow: "column wrap", justifyContent: "space-between"}}>
    <Card.Title>{photo.title}</Card.Title>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="firstDropdownToggle">

        Mark tag

      </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item eventKey={"Awesome!"} href="#" onSelect={props.handleSelectedTag}>Awesome!</Dropdown.Item>
        <Dropdown.Item eventKey={"Cool!"} href="#" onSelect={props.handleSelectedTag}>Cool!</Dropdown.Item>
        <Dropdown.Item eventKey={"Not bad..."} href="#" onSelect={props.handleSelectedTag}>Not bad...</Dropdown.Item>
        </Dropdown.Menu>
  </Dropdown>


  </Card.Body>
</Card>


        )
      }
      )

      }
</div>
    );
}

export default Photos;
