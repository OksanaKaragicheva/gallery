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
      mapOfTags: this.parseTagsFromLocalStorage() !== null
                 ? new Map(this.parseTagsFromLocalStorage().map((el) => [el[0], new Map(el[1])]))
                 : new Map(),
      titleToFilter: '',
      tagToFilter: ''
    }

    this.storeAlbumsInState = this.storeAlbumsInState.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
    this.handleTitleToFilter = this.handleTitleToFilter.bind(this);
    this.handleTagToFilter = this.handleTagToFilter.bind(this);
    this.filterByTitle = this.filterByTitle.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    this.updateMapOfTagsState = this.updateMapOfTagsState.bind(this);
    this.transformMapOfTagsToArray = this.transformMapOfTagsToArray.bind(this);
    this.parseAlbumsFromLocalStorage = this.parseAlbumsFromLocalStorage.bind(this);
    this.albumsToStringToLocalStorage = this.albumsToStringToLocalStorage.bind(this);
    this.parsePhotosFromLocalStorage = this.parsePhotosFromLocalStorage.bind(this);
    this.photosToStringToLocalStorage = this.photosToStringToLocalStorage.bind(this);
    this.parseTagsFromLocalStorage = this.parseTagsFromLocalStorage.bind(this);
    this.tagsToStringToLocalStorage = this.tagsToStringToLocalStorage.bind(this);
  }

  componentWillMount() {
    console.log("componentWillMount");
    if (this.parsePhotosFromLocalStorage() === null) {
       this.photosToStringToLocalStorage([]);
       this.setState({
         photos: this.parsePhotosFromLocalStorage()
       });
    }
    if (this.parseTagsFromLocalStorage() === null) {
       this.tagsToStringToLocalStorage(this.transformMapOfTagsToArray(this.state.mapOfTags));
       let newMapOfTags = new Map(this.parseTagsFromLocalStorage().map((el) => [el[0], new Map(el[1])]));
         this.setState({
           mapOfTags: newMapOfTags
         });
     }
  }

  componentDidMount() {
    if (this.parseAlbumsFromLocalStorage() === null) {
       this.storeAlbumsInState();
         console.log("DATA FROM SERVER");
    } else {
        console.log("DATA FROM LOCALSTORAGE");
    }
  }

  handleTitleToFilter(e) {
    this.setState({ titleToFilter: e.target.value });
  }

  handleTagToFilter(e) {
    this.setState({ tagToFilter: e.target.value });
  }

  transformMapOfTagsToArray(mapOfTags) {
    let nm1 = Array.from(mapOfTags.entries());
    let nm2 = nm1.map((el) => [el[0], Array.from(el[1].entries())]);
    let nm3 = nm2.map((el) => [el[0], el[1].map((elem) => [elem[0], [...elem[1]]])]);
    return nm3;
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

  updateMapOfTagsState(albumId, photoId, inputNewTag) {
    let newMapOfTags = new Map(this.parseTagsFromLocalStorage().map((el) => [el[0], new Map(el[1])]));
    if (inputNewTag !== '') {
      if (newMapOfTags.get(albumId) === undefined) {
          newMapOfTags.set(albumId, new Map().set(photoId, [`#${inputNewTag}`]));
      }
      else {
          newMapOfTags.get(albumId).set(photoId, newMapOfTags.get(albumId).get(photoId) === undefined
                                                 ? [`#${inputNewTag}`]
                                                 : [...newMapOfTags.get(albumId).get(photoId), `#${inputNewTag}`]);
      }
     }
      this.setState({
        mapOfTags: newMapOfTags
      });
      this.tagsToStringToLocalStorage(this.transformMapOfTagsToArray(newMapOfTags));
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
          if (this.state.mapOfTags.has(photo.albumId)) {
             var tagsArray = this.state.mapOfTags.get(photo.albumId).get(photo.id);
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
      console.log("this.state.albumsINFETCH", this.state.albums);
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
           updateMapOfTagsState={this.updateMapOfTagsState}
           mapOfTags={this.state.mapOfTags}
           filterByTag={this.filterByTag}
         />
      </div>
    );
  }
}

export default Gallery;
