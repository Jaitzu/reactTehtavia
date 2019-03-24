import React, { Component } from 'react';
import Pic from './components/Pic';
import './App.css';



class App extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        fetch("./test.json").then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({items: result})
                    });


    }

    render() {
        console.log(this.state.items)
    return (
      <div className="App">
          <Pic  items={this.state.items}/>
      </div>
    );
  }
}

export default App;
