import React, { useState } from 'react'
import '../styles/CardContent.css'

function CardContent(props) {
  const stars = ''

  return (
    <div className="card-content">
      <text className="place-name">{props.name}</text>
      <hr className="name-line" />
      <text className="place-address">{props.address}</text>
      <text className="place-rating">{props.rating}/5</text>
      <text className="place-price">{props.price}</text>
    </div>
  )
}

export default CardContent;