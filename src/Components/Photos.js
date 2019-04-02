import React, { Component } from 'react';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }


  }

  render() {
    return (

          <img src={this.props.url} alt="альтернативный текст" />


    );
  }


}

export default Photos;
