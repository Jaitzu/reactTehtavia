import React, { Component } from 'react';
import Pic from './components/Pic';
import './App.css';



class App extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        fetch("http://media.mw.metropolia.fi/wbma/media").then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
            Promise.all(result.map(item => {
                return fetch("http://media.mw.metropolia.fi/wbma/media/" + item.file_id).
                then(response => {
                    return response.json();
                });
            })).then(items => {
                console.log(items);
                this.setState({items: items})
                // save items to state
            });

        });


    }

    render() {
        console.log(this.state.items)
    return (
      <div className="App">
          <Pic  item={this.state.items}/>
      </div>
    );
  }
}

export default App;
