import React, { useState, useEffect } from 'react';

import CardStack from './components/CardStack.js';
import Login from './components/Login.js';
import Places from "google-places-web";

function CardsPage() {
  // Places.apiKey = "API_KEY";
  const [number, setNumber] = useState(0);
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=10000&type=restaurant&key=API_KEY`, {mode: 'cors'})
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
  
  function handleLogin(newNumber) {
    setNumber(newNumber);
    const newPostData = {
      Phone: newNumber,
      Left: [], 
      Right:[], 
      LastViewedRestaurant: "", 
      Saved: []
    };
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newPostData),
    };
    let url = 'http://backend.meetyoureat.online/user'
    fetch(url, request)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(() => {
        console.log('New User Posted ' + newNumber);
      })
      .catch(() => {
        console.log('New User Failed');
      });
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="cards-page">
      <header>
        <h1 id="logo" icon="🍴"><b>Meet</b>Your<b>Eat</b></h1>
        <Login submit={handleLogin} number={number}/>
      </header>
      <CardStack places={places} number={number}/>
      <footer>
        <p>Swipe left to pass, swipe right to eat!</p>
      </footer>
    </div>
    
  );
}

export default CardsPage;