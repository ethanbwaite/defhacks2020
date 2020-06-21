import React, { useState, useEffect } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import '../styles/CardStack.css'

import ResultAnimation from './ResultAnimation.js';
import CardContent from './CardContent.js';
import FinalList from './FinalList';

function CardStack(props) {
  const [placeIndex, setPlaceIndex] = useState(0)// the index in the list of nearby places to show on the current card
  const [swiped, setSwiped] = useState(false);
  const [verdict, setVerdict] = useState(0); // 1 is liked the choice, -1 is did not like
  const [likedPlaces, setLikedPlaces] = useState([])
  const [dislikedPlaces, setDislikedPlaces] = useState([])
  const [showFinalList, setShowFinalList] = useState(false);
  const [{ x, y, rotate }, set] = useSpring(() => ({ x: 0, y: 0, rotate: 0 }))
  const bind = useDrag(({ offset: [x, y], direction: [xDir], velocity }) => {
    const triggered = velocity > 1;
    const dir = xDir < 0 ? -1 : 1

    if (triggered || swiped) {
      x = window.innerWidth * dir;
      setSwiped(true);
      if (verdict === 0) {
        setVerdict(dir);

        //Decision finalized, do business work here
        if (dir === 1) {
          setLikedPlaces(prev => prev.concat(props.places[placeIndex]));
        } else if (dir === -1) {
          setDislikedPlaces(prev => prev.concat(props.places[placeIndex]));
        }
        setTimeout(() => {
          // Reset
          resetCardStack();
        }, 600)
      }
    }

    set({ x, y, rotate: x * 0.1 })
  }, {
    bounds: { left: swiped ? 0 : -50, right: swiped ? 0 :  50, top: swiped ? 0 :  -25, bottom: swiped ? 0 : 25 },
    rubberband: true,
  })

  function resetCardStack() {
    if (placeIndex < props.places.length-1) {
      set({x:0, y:0, rotate:0});
      setVerdict(0);
      setSwiped(false);
      setPlaceIndex(prevPlaceIndex => prevPlaceIndex+1)
    } else {
      //Don't reset, done swiping
      setShowFinalList(true);
      setVerdict(0);
      console.log(likedPlaces.length + " places saved")
    }
  }

  function getNextCard() {
    if (props.places != null && props.places.length > 0) {
      return (
        <animated.div className="card" {...bind()} style={{ x, y, rotate }} >
          <CardContent className="content"
            name={props.places[placeIndex].name} 
            address={props.places[placeIndex].vicinity} 
            rating={props.places[placeIndex].rating} 
            price={props.places[placeIndex].price_level} 
            reviews={props.places[placeIndex].user_ratings_total}
            imageKey={props.places[placeIndex].photos[0].photo_reference}/>
        </animated.div>
      )
    }
  }

  return (
    <>
      <div className="card-container">
        {getNextCard()}
        <FinalList places={likedPlaces} show={showFinalList} />
        <ResultAnimation liked={verdict === 1 ? "true" : verdict === -1 ? "false" : ""} />
      </div>
    </>
  );
}

export default CardStack;
