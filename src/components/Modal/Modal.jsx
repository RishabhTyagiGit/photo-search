import React from 'react'
import {getImageUrl} from "../../utils"

import "./Modal.css"

const Modal = ({image, onHide}) => {
    const {  farm, server, id, secret } = image;
    return (
        <div className="image-popup-container" onClick={onHide}>
            <img
                className="popup-image"
                src={getImageUrl(farm, server, id, secret)}
                alt=""
                style={{ marginTop: "25vh", marginLeft: "35vw"}}
            />   
        </div>
    )
}

export default Modal
