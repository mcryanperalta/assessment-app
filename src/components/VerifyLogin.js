import React,{ useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function VerifyLogin(){
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [user,setUser] = useState([]);
  const [state,setState] = useState(localStorage["appState"]);
  
  useEffect(() => {
        
        if (state) {
          let AppState = JSON.parse(state);
          let isTrue= AppState.isLoggedIn;
          setIsLoggedIn(isTrue);
          setUser(AppState);
          
        }
    },[state])

  
        return(
          user  ? <Redirect to="/users" /> :<Redirect to="/login" />
        );
    
}

export default VerifyLogin;