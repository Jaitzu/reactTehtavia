import React from 'react';
import PropTypes from 'prop-types';
import Div from '../components/Div.js';

const Home = (props) => {
    return (
        <React.Fragment>
            <h1>Home</h1>
            <Div item={props.item}/>
        </React.Fragment>
    );
};

Home.propTypes = {
    item: PropTypes.array,
};

export default Home;