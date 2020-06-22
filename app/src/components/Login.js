import React, { useState } from 'react'
import '../styles/Login.css'

function Login(props) {
  const [numberText, setNumberText] = useState();

  function updateNumberText(event) {
    setNumberText(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault();
    props.submit(numberText)
  }

  return (
    <div className="header">
      {props.number === 0 ? <form action="/" onSubmit={submitHandler}>
        <input className="login-field" type="text" placeholder="Enter Phone Number" onChange={updateNumberText}/>
        <input className="login-button" type="submit" value="Login" />
      </form> : null}
    </div>
  )
}

export default Login;