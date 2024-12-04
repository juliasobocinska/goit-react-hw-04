import React from "react";
import ImageCard from "./ImageCard.jsx";
import styles from './app.module.css';

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {photos.map((photo) => (
        <li className={styles.picture} key={photo.id}>
          <ImageCard photo={photo} onClick={() => onImageClick(photo.urls.regular)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
