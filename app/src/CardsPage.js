import React, { useState, useEffect } from 'react';

import CardStack from './components/CardStack.js';
import Login from './components/Login.js';
import Places from "google-places-web";

function CardsPage() {
  // Places.apiKey = "API_KEY";

  const [pos, setPos] = useState();
  const [places, setPlaces] = useState();

  function getLocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setPos({
          lat: pos.lat,
          lng: pos.lng
        });
        getPlaces(pos);
      });
    } else {
      // Browser doesn't support Geolocation
      alert("You need to allow location services in your browser to use this app.");
    }
  }

  function getPlaces(pos) {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=10000&type=restaurant&key=API_KEY`, {mode: 'cors'})
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data.results);
        console.log('Request successful', data);
      })
      .catch(function(error) {
        console.log('Request failed', error);
    });
    // })); 
    // try {
    //   const response = Places.nearbysearch({
    //     location: `${pos.lat},${pos.lng}`, // LatLon delimited by ,
    //     radius: "10000",  // Radius cannot be used if rankBy set to DISTANCE
    //     type: ["restaurant"], // Undefined type will return all types
    //   });
     
    //   const { status, results, next_page_token, html_attributions } = response;
    // } catch (error) {
    //   console.log(error);
    // }
    
  }
  
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="cards-page">
      <CardStack places={places}/>
    </div>
    
  );
}

export default CardsPage;