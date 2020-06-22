import React, { useState, useEffect } from 'react'
import CardContent from './CardContent.js';

import '../styles/FinalList.css'

function FinalList(props) {
  const [places, setPlaces] = useState();

  function getPicks(){
    const request = {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json', },
    };
    let url = `http://backend.meetyoureat.online/restaurant/get_right_swipes/${props.number}`;

    fetch(url, request)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((data) => {
        setPlaces(data);
      })
      .then(() => {
        console.log('Get successful for ' + props.number);
      })
      .catch(() => {
        console.log('Get failed for ' + props.number);
      });
  }

  useEffect(() => {
    if (props.number !== 0) {
      getPicks();
    }
  }, [props.show])

  if (props.show) {
    let listOfPlaces = places !== undefined ? places : props.places;
    return (
      <div>
        <h1>Here are all your picks!</h1>
        <div className="picks-container">
          {listOfPlaces.map((e, i) => {
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