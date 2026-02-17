import React, { useState } from 'react'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp';

const LoginSignUp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      {isLoggedIn ? <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> : <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
    </>
  )
}

export default LoginSignUp