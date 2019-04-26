import React from 'react';
import Photo from '../Components/Photo';

function Photos(props) {
  return (
    <div className="allPhotos">
       {props.photos.map((photo, index) => {
         var tagsArray = (props.objOfTags.hasOwnProperty(photo.albumId) !== false)
                          ? props.objOfTags[photo.albumId][photo.id]
                          : [];
            return (
              <Photo
               key={photo.id}
               photo={photo}
               tagsArray={tagsArray}
               updateObjOfTagsState={props.updateObjOfTagsState}
               filterByTag={props.filterByTag}
              />
           );
        })
        }
    </div>
  );
}

export default Photos;
