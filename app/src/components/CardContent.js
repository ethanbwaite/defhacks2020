import React, { useState } from 'react'
import '../styles/CardContent.css'

function CardContent(props) {
  const stars = ''

  return (
    <div className="card-content">
      <h2 className="place-name">{props.name}</h2>
      <hr/>
      <div>
        <span className="place-rating">{props.rating}</span>
        <span className="place-price">{props.price}</span>
      </div>
      <span className="place-address">{props.address}</span>
    </div>
  )
}

export default CardContent;