import React from 'react';
import Axios from 'axios';
import  { fromJS } from 'immutable';
import{ createBrowserHistory }from 'history';
const history = createBrowserHistory();


    const appState = () => {

        let cacheState = null;

        let initialAppState = {
            isLoggedIn: false,
            user: {
            id:null,
            auth_token: null,
            email: null,
            email_verified_at: null,
            name: null,
            timestamp: null,
            }
        }
    }


    const processStorage = (data, isLoggedIn = true) => {
        let initialAppState = {
          isLoggedIn: false,
          user: {
          id:null,
          auth_token: null,
          email: null,
          email_verified_at: null,
          name: null,
          timestamp: null,
          }
      }
        initialAppState = fromJS(initialAppState);
        let userData = fromJS(data);
    
        userData = userData.set('timestamp', new Date().toString())
      
        initialAppState = initialAppState.set('user', userData)
        initialAppState = initialAppState.set('isLoggedIn', isLoggedIn)
        localStorage.setItem("appState", JSON.stringify(initialAppState));
    }
    // console.log('path',process.env.REACT_APP_API_PATH);
    let baseURL = 'http://localhost:8000/api';
    const api = Axios.create({
        baseURL: baseURL
    });

    // api.interceptors.request.use(cors());
    api.interceptors.request.use(function(config) {
      let state = localStorage["appState"];
      //  localStorage.clear();
      let appData = appState();
      if (state) {
        let AppState = JSON.parse(state);
          appData = AppState;
      }
      if ( appData && appData.user.auth_token ) {
          const token = appData.user.auth_token
          config.headers.Authorization = 'Bearer '+token;
       
        }
      
        return config;
      }, function(err) {
        return Promise.reject(err);
    });

    api.interceptors.response.use(response => response, function (error) {
        // this will handle the logout if the token is already expired / for some instance, user change to port
        if (error.response.status === 207) {
          localStorage.clear();
          history.push('#/login');
          window.location.reload();
        }
      
        return Promise.reject(error);
      
      });
      
      export {
        api,
        appState,
        processStorage,
        history
      }
      


    