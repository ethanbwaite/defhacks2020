import React, { useState } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import '../styles/CardStack.css'

import ResultAnimation from './ResultAnimation.js';
import CardContent from './CardContent.js';

function CardStack() {
  const [position, setPosition] = useState(0)
  const [swiped, setSwiped] = useState(false);
  const [verdict, setVerdict] = useState(0); //1 is liked the choice, -1 is did not like
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
        setTimeout(() => {


          // Reset
          set({ x: 0, y: 0, rotate: 0 });
          setVerdict(0);
          setSwiped(false);
        }, 600)
      }
    }

    set({ x, y, rotate: x * 0.1 })
  }, {
    bounds: { left: swiped ? 0 : -50, right: swiped ? 0 :  50, top: swiped ? 0 :  -25, bottom: swiped ? 0 : 25 },
    rubberband: true,
  })

  return (
    <div className="card-container">
      <animated.div {...bind()} style={{ x, y, rotate }} className="card" >
        <CardContent name="Restaurant Name" address="123 Mission St, San Francisco, 93401" rating="5/5" price="$$$"/>
      </animated.div>
      <ResultAnimation liked={verdict === 1 ? "true" : verdict === -1 ? "false" : ""} />
    </div>
  );
}

export default CardStack;
