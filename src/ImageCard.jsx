import React from "react";

const ImageCard = ({ photo, onClick }) => {
    return(
        <div>
            <img 
            src={photo.urls.small} 
            alt={photo.alt_description} 
            onClick={onClick}/>
        </div>

    )
}

export default ImageCard;