import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



class Div extends Component {

    render() {

        return this.props.item.map((item, i) => (

            <div key={i}>
                <h1>{item.title}</h1>
                <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + item.thumbnails.w160} alt={"kuva"}/>
                <p>{item.description}</p>
                <Link to={{
                    pathname: "/Single",
                    state: {
                        id: item.file_id
                    }
                }}>View</Link>
                <p>/</p>
                <a href={'http://media.mw.metropolia.fi/wbma/uploads/' + item.filename}>full size picture</a>

            </div>
        ));
    }
}
Div.propTypes ={
    item: PropTypes.array
}

export default Div;