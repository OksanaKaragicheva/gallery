import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Photos from '../Components/Photos';

class AlbumsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      query: 'albums',
      photos: []
    }

    this.request = this.request.bind(this);
    this.openAlbum = this.openAlbum.bind(this);
  }
 openAlbum(e) {
   this.setState({query: 'photos'}, function() {
     fetch(this.props.api + this.state.query)
       .then(response => {
         return response.json();
       })
       .then(data => {
         const photos = data.map((photo, index) => {

           if (e === photo.albumId) {
             console.log(photo);
             return <Photos id={photo.id} url={photo.url} title={photo.title} photos={this.state.photos} />;
           }

           });
           this.setState({
             photos: photos
           });
       });
   });
   console.log(e);
   console.log(this.state.query);


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
    <div>
{this.state.photos}
</div>
</div>
    );
  }
}

export default AlbumsDropdown;
