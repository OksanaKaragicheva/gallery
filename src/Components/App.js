import React, { Component } from 'react';
import '../App.sass';
import Gallery from '../Components/Gallery';

class App extends Component {
  render() {
    return (
      <Gallery api="https://jsonplaceholder.typicode.com/" />
    );
  }
}

export default App;
