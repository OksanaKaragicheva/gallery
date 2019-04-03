import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Filters from '../Components/Filters';
import Photos from '../Components/Photos';

class AlbumsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      query: 'albums',
      photos: [],
      title: '',
      tag: ''
    }

    this.request = this.request.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleTag(e) {
    this.setState({ tag: e.target.value });
  }

  filterByTitle(){

  }

  filterByTag(){
    console.log();
  }

 openAlbum(e) {
   this.setState({query: 'photos'}, function() {
     fetch(this.props.api + this.state.query)
       .then(response => {
         return response.json();
       })
       .then(data => {
      //   console.log(data);
         const photos = data.filter((photo, index) => {
           if (photo.albumId.toString() === e) {
            return photo;
           }

           });
           console.log(photos);
           this.setState({
             photos: photos
           });
       });
   });
   console.log(e);
   console.log(this.state.query);
   //console.log(this.state.photos);


}
  request(query) {
    fetch(this.props.api + query)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const albums = data.map((obj, index) => {
          return (
            <Dropdown.Item eventKey={obj.id} key={obj.id} href="#/action-1" onSelect={this.openAlbum}>
              {`${obj.title[0].toUpperCase()}${obj.title.slice(1)}`}
            </Dropdown.Item>
          );
          });
          this.setState({
            albums: albums
          });
      });

  }

  componentDidMount() {
    this.request(this.state.query);
  }
  render() {
    return (
      <div>
      <Dropdown id="dropdownButton">
        <Dropdown.Toggle variant="warning" id="firstDropdownToggle">
        <Dropdown.Header id="dropdownHeader">
          Albums
          </Dropdown.Header>
        </Dropdown.Toggle>
          <Dropdown.Menu>
           {this.state.albums}
          </Dropdown.Menu>
    </Dropdown>
    <Filters
    title={this.state.title}
    tag={this.state.tag}
    handleTitle={this.handleTitle}
    handleTag={this.handleTag}
    filterByTag={this.filterByTag}
    filterByTitle={this.filterByTitle}/>
    <Photos photos={this.state.photos} />
    </div>
    );
  }
}

export default AlbumsDropdown;
