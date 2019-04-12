import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputNewTag: ''
    };

    this.handleNewTagInput = this.handleNewTagInput.bind(this);
  }

  handleNewTagInput(e) {
    this.setState({
      inputNewTag: e.target.value
    });
  }

 render() {
   return (
     <Card className="card">
      <Card.Img variant="top" src={this.props.photo.thumbnailUrl} />
       <Card.Body className="cardBodyStyle">
        <Card.Title className="photoTitle">{this.props.photo.title}</Card.Title>
         <Card.Text className="tagsList">{this.props.tagString}</Card.Text>
          <InputGroup>
           <FormControl
            value={this.state.inputNewTag}
            className="inputTagField"
            placeholder="Enter tag"
            aria-label="enterTag"
            aria-describedby="enterNewTagForCurrentPhoto"
            onChange={this.handleNewTagInput}
           />
             <Button
              className="addTagButton"
              variant="secondary"
              onClick={() => this.props.showNewTag(this.props.photo.albumId, this.props.photo.id, this.state.inputNewTag)}
             >Add</Button>
            </InputGroup>
           </Card.Body>
          </Card>
   );
  }
}

export default Photo;
