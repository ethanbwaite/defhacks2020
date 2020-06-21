import React, { useState } from 'react'
import '../styles/ResultAnimation.css'

function ResultAnimation(props) {
    if (props.liked === 'true') {
      return <text role="img" className="result heart">❤️</text>; 
    } else if (props.liked === 'false') {
      return <text role="img" className="result cross">❌</text>;
    }
    return null;
}

export default ResultAnimation;