import React, { useState } from 'react'
import '../styles/CardContent.css'

function CardContent(props) {
  let stars = ''
  for (let i=0; i<props.rating; i++) {
    stars += '⭐';
  }
  let dollars = ''
  for (let i=0; i<props.price; i++) {
    dollars += '$';
  }
  let imageAddress = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${props.imageKey}&key=AIzaSyDRzkag5QmPydb3ipmoYp4p6Ul-dicdGb4`


  return (
    <div className="card-content">
      {props.imageKey ? <img className="place-photo" src={imageAddress} alt="restaurant image" draggable="false"/> : null}
      <text className="place-name">{props.name}</text>
      <text className="place-address">{props.address}</text>
      <text className="place-rating">{stars} {props.reviews || 0} Reviews</text>
      <text className="place-price">{dollars}</text>
    </div>
  )
}

export default CardContent;