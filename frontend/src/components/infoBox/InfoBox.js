import React from 'react'
import "./InfoBox.scss"

const InfoBox = ({bgcolor , title , count , icon}) => {
  return (
    <div className={`info-box ${bgcolor}`}>
        <spann className='ingo-icon --color-white'>{icon}</spann>
        <span className='info-text'>
            <p>{title}</p>
            <h4>{count}</h4>
        </span>
    </div>
  )
}

export default InfoBox