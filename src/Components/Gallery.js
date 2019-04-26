import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Filters from '../Components/Filters';
import Photos from '../Components/Photos';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: this.parseAlbumsFromLocalStorage() !== null
              ? this.parseAlbumsFromLocalStorage()
              : [],
      photos: this.parsePhotosFromLocalStorage(),
      objOfTags: this.parseTagsFromLocalStorage() !== null
                 ? this.parseTagsFromLocalStorage()
                 : {},
      titleToFilter: '',
      tagToFilter: ''
    }

    this.storeAlbumsInState = this.storeAlbumsInState.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
    this.handleTitleToFilter = this.handleTitleToFilter.bind(this);
    this.handleTagToFilter = this.handleTagToFilter.bind(this);
    this.filterByTitle = this.filterByTitle.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    this.updateObjOfTagsState = this.updateObjOfTagsState.bind(this);
    this.parseAlbumsFromLocalStorage = this.parseAlbumsFromLocalStorage.bind(this);
    this.albumsToStringToLocalStorage = this.albumsToStringToLocalStorage.bind(this);
    this.parsePhotosFromLocalStorage = this.parsePhotosFromLocalStorage.bind(this);
    this.photosToStringToLocalStorage = this.photosToStringToLocalStorage.bind(this);
    this.parseTagsFromLocalStorage = this.parseTagsFromLocalStorage.bind(this);
    this.tagsToStringToLocalStorage = this.tagsToStringToLocalStorage.bind(this);
  }

  componentWillMount() {
    if (this.parsePhotosFromLocalStorage() === null) {
       this.photosToStringToLocalStorage([]);
       this.setState({
         photos: this.parsePhotosFromLocalStorage()
       });
    }
    if (this.parseTagsFromLocalStorage() === null) {
       this.tagsToStringToLocalStorage({});
         this.setState({
           objOfTags: this.parseTagsFromLocalStorage()
         });
     }
  }

  componentDidMount() {
    if (this.parseAlbumsFromLocalStorage() === null) {
       this.storeAlbumsInState();
    }
  }

  handleTitleToFilter(e) {
    this.setState({ titleToFilter: e.target.value });
  }

  handleTagToFilter(e) {
    this.setState({ tagToFilter: e.target.value });
  }

  parseAlbumsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("_oksanakaragicheva_albums"));
  }
  albumsToStringToLocalStorage(albums) {
    return localStorage.setItem("_oksanakaragicheva_albums", JSON.stringify(albums));
  }
  parsePhotosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("_oksanakaragicheva_photos"));
  }
  photosToStringToLocalStorage(photos) {
    return localStorage.setItem("_oksanakaragicheva_photos", JSON.stringify(photos));
  }
  parseTagsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("_oksanakaragicheva_tags"));
  }
  tagsToStringToLocalStorage(tags) {
    return localStorage.setItem("_oksanakaragicheva_tags", JSON.stringify(tags));
  }

  updateObjOfTagsState(albumId, photoId, inputNewTag) {
    let newObjOfTags = Object.assign({}, this.state.objOfTags);
    if (inputNewTag !== '') {
      if (newObjOfTags.hasOwnProperty(albumId) === false) {
         newObjOfTags[albumId] = {[photoId]: []};
         newObjOfTags[albumId][photoId] = [`#${inputNewTag}`];
      }
      else {
        if (newObjOfTags[albumId][photoId] === undefined) {
           newObjOfTags[albumId][photoId] = [];
        }
           newObjOfTags[albumId][photoId].push(`#${inputNewTag}`);
      }
    }
      this.setState({
        objOfTags: newObjOfTags
      });
      this.tagsToStringToLocalStorage(newObjOfTags);
  }

  filterByTitle(){
    fetch(this.props.api + 'photos')
      .then(response => {
         return response.json();
      })
      .then(data => {
         const photos = data.filter((photo, index) => {
         const strForFilterByTitle = this.state.titleToFilter;
           if (strForFilterByTitle === "") {
             return false;
           }
             if (photo.title.search(strForFilterByTitle) !== -1) {
               return photo;
             }
           return null;
         });
            this.setState({
              photos: photos,
              titleToFilter: ""
            });
            this.photosToStringToLocalStorage(this.state.photos);
       });
   }

 filterByTag(t) {
   fetch(this.props.api + 'photos')
     .then(response => {
        return response.json();
     })
     .then(data => {
        const photos = data.filter((photo, index) => {
        const strForFilterByTag = this.state.tagToFilter || t;
          if (this.state.objOfTags.hasOwnProperty(photo.albumId)) {
             var tagsArray = this.state.objOfTags[photo.albumId][photo.id];
               if (tagsArray !== undefined ) {
                  if (tagsArray.some((tag) => tag.search(strForFilterByTag) !== -1)){
                     return photo;
                  }
               }
           }
          return null;
       });
        this.setState({
          photos: photos,
          tagToFilter: ""
        });
        this.photosToStringToLocalStorage(this.state.photos);
    });
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
        return null;
      });
        this.setState({
          photos: photos,
          titleToFilter: ""
        });
        this.photosToStringToLocalStorage(this.state.photos);
    });
 }

storeAlbumsInState() {
  fetch(this.props.api + "albums")
    .then(response => {
       return response.json();
    })
    .then(data => {
       this.setState({
         albums: data
       });
         this.albumsToStringToLocalStorage(data);
      });
}

render() {
    return (
      <div>
        <Dropdown id="dropdownButton">
          <Dropdown.Toggle variant="warning">
            <Dropdown.Header id="dropdownHeader">
              Albums
            </Dropdown.Header>
          </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.albums.map(album => {
                return (
                  <Dropdown.Item eventKey={album.id} key={album.id} href="#" onSelect={this.openAlbum}>
                    {`${album.title[0].toUpperCase()}${album.title.slice(1)}`}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
       </Dropdown>
         <Filters
           titleToFilter={this.state.titleToFilter}
           tagToFilter={this.state.tagToFilter}
           handleTitleToFilter={this.handleTitleToFilter}
           handleTagToFilter={this.handleTagToFilter}
           filterByTag={this.filterByTag}
           filterByTitle={this.filterByTitle}
         />
         <Photos
           photos={this.state.photos}
           updateObjOfTagsState={this.updateObjOfTagsState}
           objOfTags={this.state.objOfTags}
           filterByTag={this.filterByTag}
         />
      </div>
    );
  }
}

export default Gallery;
