import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';

class VerifyLogin extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          isLoggedIn: false,
          user: {}
        }
      }

      componentWillMount(){
        let state = localStorage["appState"];
        if (state) {
          let AppState = JSON.parse(state);
          console.log('this test',AppState);
          this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }

    render(){
        return(
            this.state.isLoggedIn === true ? <Redirect to="/users" /> :<Redirect to="/login" />
        );
    }
}

export default VerifyLogin;