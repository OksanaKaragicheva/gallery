import React from 'react';
import Photo from '../Components/Photo';

function Photos(props) {
  return (
    <div className="allPhotos">
       {props.photos.map((photo, index) => {
         var tagsArray = (props.mapOfTags.get(photo.albumId) !== undefined)
                          ? props.mapOfTags.get(photo.albumId).get(photo.id)
                          : '';
            return (
              <Photo
               key={photo.id}
               photo={photo}
               tagsArray={tagsArray}
               showNewTag={props.showNewTag}
              />
           );
        })
        }
    </div>
  );
}

export default Photos;
