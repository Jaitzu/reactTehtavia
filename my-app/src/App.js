import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {getAllMedia} from "./utils/MediaAPI";
import Nav from './components/Nav.js'
import Home from './views/Home.js'
import Profile from './views/Profile.js';
import Single from './views/Single';
import Logout from './views/Logout';
import Login from './views/Login';


class App extends Component {
    state = {
        items: [],
        user: null,
    };
    setUser = (user) => {
        //hea profiilikuva ja siitä se user-objektiin
        this.setState({user});
    };

    checkLogin = () => {
        return this.state.user !== null;
    };

    componentDidMount() {
       getAllMedia().then(pics =>{
           this.setState({items:pics})
           console.log(this.state.items)
       })

    }

    render() {
        console.log(this.state.items)
    return (
        <Router basename='/~janneenu/ajaxlogin/build'>
      <div className="App">
          <Nav checkLogin={this.checkLogin}/>
          <Route exact path="/home" render={(props) =>(
          <Home {...props} item={this.state.items}/>
          )}/>
          <Route path="/Profile" component={Profile} />
          <Route path="/Single" render={(props) => (
              <Single {...props} file={this.state}/>
          )}/>
          <Route exact path="/" render={(props) => (
              <Login {...props} setUser={this.setUser}/>
          )}/>
          <Route path="/logout" render={(props) => (
              <Logout {...props} setUser={this.setUser}/>
          )}/>

      </div>
        </Router>
    );
  }
}

export default App;
