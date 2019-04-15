import React from 'react';
import PropTypes from 'prop-types';
import Div from '../components/Div.js';
import Grid from '@material-ui/core/Grid';
const Home = (props) => {
    return (
        <React.Fragment>
            <h1>Home</h1>
            <Grid container spacing={0}>
            <Div item={props.item}/>
            </Grid>

        </React.Fragment>
    );
};

Home.propTypes = {
    item: PropTypes.array,
};

export default Home;