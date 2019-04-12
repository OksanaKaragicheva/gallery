import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Filters from '../Components/Filters';
import Photos from '../Components/Photos';

const numAlbums = 101;

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      photos: [],
      listOfTags: Array.from(Array(numAlbums), () => []),
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
    let listOfTagsNew = JSON.parse(JSON.stringify(this.state.listOfTags));
    listOfTagsNew[albumId][photoId] = inputNewTag;
    this.setState({
      listOfTags: listOfTagsNew
    });
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
          var tagString = this.state.listOfTags[photo.albumId][photo.id];
          if (tagString == null) {
              return false;
          }
          if (tagString.search(strForFilterByTag) !== -1) {
              return photo;
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
           listOfTags={this.state.listOfTags}
         />
      </div>
    );
  }
}

export default Gallery;
