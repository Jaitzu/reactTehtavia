import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Pic extends Component {


    render() {
        console.log(this.props.pic);

        return this.props.pic.map((pic, i)=>(
            <div key={i}>
            <h1>{pic.title}</h1>
                <img src={pic.thumbnails.w160}/>
            <p>{pic.description}</p>
                <a href={pic.filename}>full size picture</a>
            </div>
        ));
    }
}
Pic.propTypes ={
    pic: PropTypes.array
}
export default Pic;