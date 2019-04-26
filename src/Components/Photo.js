import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Photo(props) {
  const [inputNewTag, setInputNewTag] = useState('');
  return (
     <Card className="card">
      <Card.Img variant="top" src={props.photo.thumbnailUrl} />
       <Card.Body className="cardBodyStyle">
        <Card.Title className="photoTitle">{props.photo.title}</Card.Title>
         <Card.Text>
         {
          props.tagsArray !== undefined
          ? (props.tagsArray.map((el, index) => {
             return (
               <Button
                className="tagLink"
                variant="link"
                size="sm"
                title="Filter by tag..."
                key={index}
                onClick={() => props.filterByTag(el)}>
                  {el}
               </Button>
             );
            }))
          : []
          }
          </Card.Text>
          <InputGroup>
           <FormControl
            value={inputNewTag}
            className="inputTagField"
            placeholder="Enter tag"
            aria-label="enterTag"
            aria-describedby="enterNewTagForCurrentPhoto"
            onChange={(e) => setInputNewTag(e.target.value)}
           />
             <Button
              className="addTagButton"
              variant="secondary"
              onClick={() => props.updateObjOfTagsState(props.photo.albumId, props.photo.id, inputNewTag)}
             >Add</Button>
            </InputGroup>
           </Card.Body>
          </Card>
   );
}

export default Photo;
