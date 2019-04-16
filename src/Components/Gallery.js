import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Filters from '../Components/Filters';
import Photos from '../Components/Photos';

//const numAlbums = 101;

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      photos: [],
      mapOfTags: new Map(),
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

  handleTitleToFilter(e) {
    this.setState({ titleToFilter: e.target.value });
  }

  handleTagToFilter(e) {
    this.setState({ tagToFilter: e.target.value });
  }

  showNewTag(albumId, photoId, inputNewTag) {
    let nm1 = Array.from(this.state.mapOfTags.entries());
      console.log("nm1____" + nm1);
    let nm2 = nm1.map((el) => [el[0], Array.from(el[1].entries())]);
      console.log("nm2____" + nm2);
    let nm3 = nm2.map((el) => [el[0], el[1].map((elem) => [elem[0], [...elem[1]]])]);
      console.log("nm3__" + nm3);
    let nm4 = nm3.map((el) => [el[0], new Map(el[1])]);
      console.log("nm4_" + nm4);
    let newMapOfTags = new Map(nm4);
      console.log("newMapOfTags___" + newMapOfTags);
      if (newMapOfTags.get(albumId) === undefined) {
          newMapOfTags.set(albumId, new Map().set(photoId, ["#" + inputNewTag]));
      }
      else {
          newMapOfTags.get(albumId).set(photoId, [newMapOfTags.get(albumId).get(photoId), "#" + inputNewTag]);
      }
      this.setState({
        mapOfTags: newMapOfTags
      });
      console.log("NEW MAP TAGS " + newMapOfTags.get(albumId).get(photoId));
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
       });
   }

 filterByTag() {
   fetch(this.props.api + 'photos')
     .then(response => {
        return response.json();
     })
     .then(data => {
        const photos = data.filter((photo, index) => {
        const strForFilterByTag = this.state.tagToFilter;
          if (strForFilterByTag === "") {
            return false;
          }
          var tagsArray = this.state.mapOfTags[photo.albumId].get(photo.id);
          console.log("Array Of TAGS " + tagsArray);
          if (tagsArray === undefined) {
              return false;
          }
           if (tagsArray !== undefined) {
            tagsArray.map((tag) => {
              if (tag.search(strForFilterByTag) !== -1) {
                console.log("GOOOOOOOOOOD");
                return photo;

              }
              return null;
            });
          }
         return null;
        });
           this.setState({
             photos: photos,
             tagToFilter: ""
           });
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
          <Dropdown.Toggle variant="warning">
            <Dropdown.Header id="dropdownHeader">
              Albums
            </Dropdown.Header>
          </Dropdown.Toggle>
            <Dropdown.Menu>
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
         />
      </div>
    );
  }
}

export default Gallery;
