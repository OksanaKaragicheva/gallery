import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Photos(props) {
  return (
    <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
       {props.photos.map((photo, index) => {
         var tagString = props.listOfTags[photo.albumId][photo.id];
         tagString = (tagString != null) ? tagString : '';
         var tagInputString = props.listOfInputValues[photo.albumId][photo.id];
         tagInputString = (tagInputString != null) ? tagInputString : '';
          return (
              <Card className="card" key={photo.id} style={{ width: "150px", marginTop: "10px", marginRight: "10px" }}>
                <Card.Img variant="top" src={photo.thumbnailUrl} />
                  <Card.Body style={{display: "flex", flexFlow: "column wrap", justifyContent: "space-between"}}>
                    <Card.Title className="photoTitle">{photo.title}</Card.Title>
                      <Card.Text className="tagsList">{tagString}</Card.Text>
                        <InputGroup className="inputTags">
                          <FormControl
                            value={tagInputString}
                            className="inputTagField"
                            placeholder="Enter tag"
                            aria-label="Enter tag"
                            aria-describedby="basic-addon2"
                            onChange={(e) => props.handleNewTagInput(e, photo.albumId, photo.id)}
                           />
                             <Button className="addTagButton" variant="secondary" onClick={() => props.showNewTag(photo.albumId, photo.id)}>Add</Button>
                        </InputGroup>
                  </Card.Body>
              </Card>
           )
        })
        }
    </div>
  );
}

export default Photos;
