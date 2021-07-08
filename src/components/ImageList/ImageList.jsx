import React from 'react'
import {getImageUrl} from "../../utils"
import "./ImageList.css"
const ImageList = ({images, onImageClick}) => {
    return (
        <ul className="imageContainer">
            {images.map(({farm, server, id, secret}, idx)=>
                <li key={id} className="imageItem" onClick={() => onImageClick(idx)}><img src={getImageUrl(farm, server, id, secret)} alt="" width="300px" height="300px"/></li>
                )}
        </ul>
    )
}

export default ImageList
