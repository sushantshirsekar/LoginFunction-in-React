import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const stroedUserInfo = localStorage.setItem('loggedIn', '1');
  // if(stroedUserInfo === '1')
  // {
  //   setIsLoggedIn(true);
  // }
  useEffect(()=>{
    const stroedUserInfo = localStorage.getItem('loggedIn');

    if(stroedUserInfo === '1')
    {
      setIsLoggedIn(true);
    }
  },[])

  const loginHandler = (email, password , college) => {
    localStorage.setItem('loggedIn', '1');
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
