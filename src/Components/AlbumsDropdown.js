import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Filters from '../Components/Filters';
import Photos from '../Components/Photos';

const numAlbums = 100;
const numPhotos = 50;

class AlbumsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      photos: [],
      listOfTags: Array(numAlbums).fill(null).map(() => Array(numPhotos).fill('')),
      listOfInputValues: Array(numAlbums).fill(null).map(() => Array(numPhotos).fill('')),
      title: '',
      tag: ''
    }

    this.request = this.request.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleNewTagInput = this.handleNewTagInput.bind(this);
    this.filterByTitle = this.filterByTitle.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    this.showNewTag = this.showNewTag.bind(this);

  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleTag(e) {
    this.setState({ tag: e.target.value });
  }

  handleNewTagInput(e, albumId, photoId) { // not worked yet!!!
    this.setState({
      listOfInputValues: [...this.state.listOfInputValues.slice(0, albumId), [...this.state.listOfInputValues[albumId].slice(0, photoId), e.target.value, ...this.state.listOfInputValues[albumId].slice(photoId + 1)], ...this.state.listOfInputValues.slice(albumId + 1)]
    });
  }

  showNewTag(albumId, photoId) { // not worked yet!!!
    this.setState({
      listOfTags: [...this.state.listOfTags.slice(0, albumId), [...this.state.listOfTags[albumId].slice(0, photoId), this.state.listOfInputValues[albumId][photoId], ...this.state.listOfTags[albumId].slice(photoId + 1)], ...this.state.listOfTags.slice(albumId + 1)]
    });
  }

  filterByTitle(){
    fetch(this.props.api + 'photos')
      .then(response => {
         return response.json();
      })
      .then(data => {
         const photos = data.filter((photo, index) => {
         const strForFilterByTitle = this.state.title;
           if (strForFilterByTitle === "") {
             return false;
           }
             if (photo.title.search(strForFilterByTitle) !== -1) {
               return photo;
             }
         });
            this.setState({
              photos: photos,
              title: ""
            });
       });
   }

 filterByTag() { // not implemented!!!!!!!!!!!
   //console.log(this.state.tag);
 }

 openAlbum(e) {
   fetch(this.props.api + 'photos')
     .then(response => {
        return response.json();
     })
     .then(data => {
        const photos = data.filter((photo, index) => {
          if (photo.albumId.toString() === e) {
             return photo;
          }
        });
          this.setState({
            photos: photos,
            title: ""
          });
       });
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
  this.request("albums");
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
           filterByTitle={this.filterByTitle}
         />
         <Photos
           photos={this.state.photos}
           handleNewTagInput={this.handleNewTagInput}
           listOfInputValues={this.state.listOfInputValues}
           showNewTag={this.showNewTag}
           listOfTags={this.state.listOfTags}
         />
      </div>
    );
  }
}

export default AlbumsDropdown;
