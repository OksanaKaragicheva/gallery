import React from 'react';
//import Image from 'react-bootstrap/Image';
//import Col from 'react-bootstrap/Col';
//import Photo from '../Components/Photo';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
//import Dropdown from 'react-bootstrap/Dropdown';

function Photos(props) {
    return (
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        {props.photos.map((photo, index) => {
            return (
              <Card className="card" key={photo.id} style={{ width: "150px", marginTop: "10px", marginRight: "10px" }}>
  <Card.Img variant="top" src={photo.thumbnailUrl} />
  <Card.Body style={{display: "flex", flexFlow: "column wrap", justifyContent: "space-between"}}>
    <Card.Title className="photoTitle">{photo.title}</Card.Title>
    <Card.Text className="tagsList">{props.listOfTags[photo.albumId][photo.id]}</Card.Text>
    <InputGroup className="inputTags">
    <FormControl
      value={props.addTag}
      className="inputTagField"
      placeholder="Enter tag"
      aria-label="Enter tag"
      aria-describedby="basic-addon2"
      onChange={props.handleAddTag}
    />
    <Button className="addTagButton" variant="secondary" onClick={() => props.showNewTag(photo.albumId, photo.id)}>Add</Button>

  </InputGroup>
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
