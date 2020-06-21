import React, { useState } from 'react'
import '../styles/CardContent.css'

function CardContent({name, rating, reviews, price, address, imageKey}) {
  const imageAddress = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${imageKey}&key=AIzaSyDRzkag5QmPydb3ipmoYp4p6Ul-dicdGb4`

  return (
    <div className="card-content">
      {imageKey ? <img className="place-photo" src={imageAddress} alt="restaurant image" draggable="false"/> : null}

      <h2 className="place-name">{name}</h2>
      <hr/>
      <div>
        <span className="place-rating">{'⭐'.repeat(rating)}</span>
        <span className="place-reviews">{reviews == 1 ? '1 Review' : `${reviews || 0} Reviews`}</span>
        <span className="place-price">{'$'.repeat(price)}</span>
      </div>
      <span className="place-address">{address}</span>
    </div>
  )
}

export default CardContent;