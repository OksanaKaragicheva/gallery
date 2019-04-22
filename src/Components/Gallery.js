import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Filters from '../Components/Filters';
import Photos from '../Components/Photos';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: JSON.parse(localStorage.getItem("_oksanakaragicheva_albums")),
      photos: JSON.parse(localStorage.getItem("_oksanakaragicheva_photos")),
      mapOfTags: JSON.parse(localStorage.getItem("_oksanakaragicheva_tags")) !== null
                 ? new Map(JSON.parse(localStorage.getItem("_oksanakaragicheva_tags")).map((el) => [el[0], new Map(el[1])]))
                 : new Map(),
      titleToFilter: '',
      tagToFilter: ''
    }

    this.request = this.request.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
    this.handleTitleToFilter = this.handleTitleToFilter.bind(this);
    this.handleTagToFilter = this.handleTagToFilter.bind(this);
    this.filterByTitle = this.filterByTitle.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    this.showNewTag = this.showNewTag.bind(this);

  }

  componentWillMount() {
    if (localStorage.getItem("_oksanakaragicheva_photos") === null) {
       localStorage.setItem(
         "_oksanakaragicheva_photos",
         JSON.stringify([])
       );
       this.setState({
         photos: JSON.parse(localStorage.getItem("_oksanakaragicheva_photos"))
       });
    }
    if (localStorage.getItem("_oksanakaragicheva_tags") === null) {
       let nm1 = Array.from(this.state.mapOfTags.entries());
       let nm2 = nm1.map((el) => [el[0], Array.from(el[1].entries())]);
       let nm3 = nm2.map((el) => [el[0], el[1].map((elem) => [elem[0], [...elem[1]]])]);
         localStorage.setItem(
           "_oksanakaragicheva_tags",
           JSON.stringify(nm3)
         );
       let nm4 = JSON.parse(localStorage.getItem("_oksanakaragicheva_tags")).map((el) => [el[0], new Map(el[1])]);
       let newMapOfTags = new Map(nm4);
         this.setState({
           mapOfTags: newMapOfTags
         });
     }
  }

  componentDidMount() {
    if (localStorage.getItem("_oksanakaragicheva_albums") === null) {
      this.request("albums");
    } else {
      console.log(localStorage.getItem("_oksanakaragicheva_albums"));
      console.log("DATA FROM LOCALSTORAGE");
    }
  }

  handleTitleToFilter(e) {
    this.setState({ titleToFilter: e.target.value });
  }

  handleTagToFilter(e) {
    this.setState({ tagToFilter: e.target.value });
  }

  showNewTag(albumId, photoId, inputNewTag) {
    let nm4 = JSON.parse(localStorage.getItem("_oksanakaragicheva_tags")).map((el) => [el[0], new Map(el[1])]);
    let newMapOfTags = new Map(nm4);
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
     let nm1 = Array.from(newMapOfTags.entries());
     let nm2 = nm1.map((el) => [el[0], Array.from(el[1].entries())]);
     let nm3 = nm2.map((el) => [el[0], el[1].map((elem) => [elem[0], [...elem[1]]])]);
       localStorage.setItem(
         "_oksanakaragicheva_tags",
         JSON.stringify(nm3)
       );
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
            localStorage.setItem(
              "_oksanakaragicheva_photos",
              JSON.stringify(this.state.photos)
            );
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
        localStorage.setItem(
          "_oksanakaragicheva_photos",
          JSON.stringify(this.state.photos)
        );
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
        localStorage.setItem(
          "_oksanakaragicheva_photos",
          JSON.stringify(this.state.photos)
        );
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
           <Dropdown.Item eventKey={obj.id} key={obj.id} href="#" onSelect={this.openAlbum}>
              {`${obj.title[0].toUpperCase()}${obj.title.slice(1)}`}
           </Dropdown.Item>
         );
       });
         this.setState({
           albums: albums
         });
         localStorage.setItem(
           "_oksanakaragicheva_albums",
           JSON.stringify(this.state.albums)
         );
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
            <Dropdown.Menu className="super-colors">
              {this.state.albums}
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
           showNewTag={this.showNewTag}
           mapOfTags={this.state.mapOfTags}
           filterByTag={this.filterByTag}
         />
      </div>
    );
  }
}

export default Gallery;
