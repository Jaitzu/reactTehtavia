import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pic extends Component {

    render() {

        return this.props.item.map((item, i) => (

            <div key={i}>
                <h1>{item.title}</h1>
                <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + item.thumbnails.w160}/>
                <p>{item.description}</p>
                <a href={'http://media.mw.metropolia.fi/wbma/uploads/' + item.filename}>full size picture</a>
            </div>
        ));
    }
}
Pic.propTypes ={
    item: PropTypes.array
}

export default Pic;