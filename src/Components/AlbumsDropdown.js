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
      title: '',
      tag: '',
      addTag: ""
    }

    this.request = this.request.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
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

  handleAddTag(e) {
   this.setState({ addTag: e.target.value });
  }

  showNewTag(albumId, photoId) {
//    const addedTag =
  this.setState({
     listOfTags:  this.state.listOfTags[albumId][photoId] = this.state.addTag
  });
  }

  filterByTitle(){
    console.log(this.state.title);
    console.log("FUNC filterByTitle");

      fetch(this.props.api + 'photos')
        .then(response => {
          return response.json();
        })
        .then(data => {
       //   console.log(data);
          const photos = data.filter((photo, index) => {
            const strForFilterByTitle = this.state.title;
   console.log(this.state.title);
          if (strForFilterByTitle === "") {
            return false;
          }
              if (photo.title.search(strForFilterByTitle) !== -1) {
             return photo;
            }

            });
            console.log(photos);
            this.setState({
              photos: photos,
              title: ""
            });
        });
    //  console.log(e);
  }



  filterByTag(){

    console.log(this.state.tag);
  }

 openAlbum(e) {
   console.log("FUNC openAlbum");
   console.log(typeof this.state.listOfTags);
  // this.setState({query: 'photos'}, function() {
     fetch(this.props.api + 'photos')
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
             photos: photos,
             title: ""
           });
       });
  // });
   console.log(e);
   //console.log(this.state.query);
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
    handleAddTag={this.handleAddTag}
    addTag={this.state.addTag}
    showNewTag={this.showNewTag}
    listOfTags={this.state.listOfTags}
    />
    </div>
    );
  }
}

export default AlbumsDropdown;
