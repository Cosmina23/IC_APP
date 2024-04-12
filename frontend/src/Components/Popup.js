import React from 'react'
import '../style/Popup.css'
import ImageCard from './ImageCard'

function Popup(props) {
  return ( props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
        <p style={{ fontSize: '24px', textAlign: 'center' }}>Alege poza de profil</p>
        <ImageCard imageFiles={props.avatars} setAvatar={props.setAvatarFunction}/>
      </div>
    </div>
  ) : ""
}

export default Popup
