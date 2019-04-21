import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {getAllMedia, getProfilePic, getUser} from "./utils/MediaAPI";
import Nav from './components/Nav.js'
import Home from './views/Home.js'
import Profile from './views/Profile.js';
import Single from './views/Single.js';
import Logout from './views/Logout.js';
import Login from './views/Login.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Upload from './views/Uploads.js';
import MyFiles from './views/MyFiles.js';
import Modify from './views/Modify.js';

class App extends Component {
    state = {
        items: [],
      user: null,
    };
  setUser = (user) => {
            this.setState({
                user: {
                    info:user
                }

            });
            console.log(this.state);

    const profId = this.state.user.info.user_id;
      //hea profiilikuva ja siitä se user-objektiin
            getProfilePic(profId).then(profPic => {

                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        profPic: profPic
                    }
                }))
            })

  };
    setUserLogout = (user) => {
        this.setState({user});
    };

  checkLogin = () => {
    return this.state.user !== null;
  };
getMedia=()=>{
  getAllMedia().then(pics =>{
    this.setState({
      items:pics})

  })
}
    componentDidMount() {
this.getMedia();
        if (this.state.user === null && localStorage.getItem('token') !== null) {
            getUser(localStorage.getItem('token')).then(response => {
                this.setUser(response);
                console.log(this.state.user)
            });
        }


    }


    render() {
    return (
        <Router basename='/~janneenu/ajaxPlayer/build'>
      <div className="App">
        <CssBaseline />
        <Nav checkLogin={this.checkLogin}/>
          <Route exact path="/home" render={(props) =>(

          <Home {...props} item={this.state.items}/>

          )}/>
          <Route path="/Profile" render={(props) => (
              <Profile {...props} user={this.state.user}/>
          )}/>
          <Route path="/Single" render={(props) => (
              <Single {...props} file={this.state}/>
          )}/>
        <Route exact path="/" render={(props) => (
            <Login {...props} setUser={this.setUser}/>
        )}/>

        <Route exact path="/Uploads" render={(props) => (
            <Upload{...props} getMedia={this.getMedia}/>
        )}/>

        <Route path="/Logout" render={(props) => (
            <Logout {...props} setUserLogout={this.setUserLogout}/>
        )}/>

          <Route path="/MyFiles" render={() => (
              <MyFiles/>
          )}/>
        <Route exact path="/Modify" render={(props) => (
            <Modify{...props} file={this.state} />
        )}/>
      </div>
        </Router>
    );
  }
}

export default App;



