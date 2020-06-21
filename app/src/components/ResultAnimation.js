import React, { useState } from 'react'
import '../styles/ResultAnimation.css'

function ResultAnimation(props) {
    if (props.liked === 'true') {
      return <span role="img" className="result heart">❤️</span>;
    } else if (props.liked === 'false') {
      return <span role="img" className="result cross">❌</span>;
    }
    return null;
}

export default ResultAnimation;