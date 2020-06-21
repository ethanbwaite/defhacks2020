import React, { useState } from 'react'
import '../styles/ResultAnimation.css'

function ResultAnimation(props) {
  const [iconName, icon] = {
    true: [
      ['heart', '❤'],
      ['thumbs-up', '👍'],
      ['yum', '😋']
    ],
    false: [
      ['cross', '❌'],
      ['thumbs-down', '👎'],
      ['barf', '🤮']
    ]
  }[props.liked]?.[Math.random() * 3 | 0] ?? ['', '']

  return <span role="img" className={`result ${iconName}`}>{icon}</span>;
}

export default ResultAnimation;