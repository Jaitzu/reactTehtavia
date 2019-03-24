import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pic extends Component {
    render() {

        return this.props.items.map((items, i) => (
            <div key={i}>
                <h1>{items.title}</h1>
                <img src={items.thumbnails.w160}/>
                <p>{items.description}</p>
                <a href={items.filename}>full size picture</a>
            </div>
        ));
    }
}
Pic.propTypes ={
    items: PropTypes.array
}

export default Pic;