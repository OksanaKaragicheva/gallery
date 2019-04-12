import React from 'react';
import Photo from '../Components/Photo';

function Photos(props) {
  return (
    <div className="allPhotos">
       {props.photos.map((photo, index) => {
         var tagString = props.listOfTags[photo.albumId][photo.id];
         tagString = (tagString != null) ? tagString : '';
           return (
              <Photo
               key={photo.id}
               photo={photo}
               tagString={tagString}
               showNewTag={props.showNewTag}
              />
           );
        })
        }
    </div>
  );
}

export default Photos;
