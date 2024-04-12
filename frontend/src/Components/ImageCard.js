import React from 'react';
import '../style/ImageCard.css'

const ImageCard = (props) => {
    const handleImageClick = (imageName) => {
        console.log(imageName);
    };

  return (
    <div className="image-gallery">
      {props.imageFiles.map((avatar, index) => (
        <div key={index} className="image-card">
          <img 
          src={`http://localhost:5269/Images/${avatar}`} 
          alt={`avatar utilizator`} 
          onClick={() => {
            handleImageClick(avatar);
            props.setAvatar(avatar);
            }}/>
        </div>
      ))}
    </div>
  );
}

export default ImageCard;
