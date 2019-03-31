import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {getAllMedia} from "./utils/MediaAPI";
import Nav from './components/Nav.js'
import Home from './views/Home.js'
import Profile from './views/Profile.js';
import Single from './views/Single';


class App extends Component {
    state = {
        items: []
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
        <Router>
      <div className="App">
          <Route exact path="./" render={props =>(
          <React.Fragment>
          <Nav/>
          <Home item={this.state.items}/>
          </React.Fragment>
          )}/>
          <Route path="./Profile" component={Profile} />
          <Route path="./Single" render={(props) => (
              <Single {...props} file={this.state}/>
          )}/>

      </div>
        </Router>
    );
  }
}

export default App;
