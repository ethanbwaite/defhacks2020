import React, { useState, useEffect } from 'react'
import CardContent from './CardContent.js';

import '../styles/FinalList.css'

function FinalList(props) {
  if (props.show) {
    return (
      <div>
        <h1>Here are your picks!</h1>
        <div className="picks-container">
          {props.places.map((e, i) => {
            return <div className="pick"><CardContent
            name={e.name} 
            address={e.vicinity} 
            rating={e.rating} 
            price={e.price_level} 
            reviews={e.user_ratings_total}/></div>
          })}
        </div>
      </div>
    )
  }
  return null;
}

export default FinalList;