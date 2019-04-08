import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser} from '../utils/MediaAPI';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  state = {
    user:{    username: '',
      password: '',
      email: '',
      full_name: '',
    },
    toggleForm: true,

  };

  handleLoginSubmit = (evt) => {
    evt.preventDefault();
    this.doLogin();
  };

  handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    register(this.state.user).then(user => {
      console.log(user);
      this.doLogin();
    });
  };



  doLogin = () => {
    login(this.state.user.username, this.state.user.password).then(response => {
      console.log(response);
      if(!response.token) {
        alert(response.message)
      }else{
        this.props.setUser(response.user);
        localStorage.setItem('token', response.token);
        this.props.history.push('/home');
      }
    });
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState(prevState => ({
      user:{
          ...prevState.user, [name]: value,
    },}));
  };

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      getUser(localStorage.getItem('token')).then(response => {
        this.props.setUser(response);
        this.props.history.push('/home');
      });
    }
  }

  render() {
    return (
        <React.Fragment>
          <h1>Login</h1>
          <form onSubmit={this.handleLoginSubmit}>
            <TextField type="text" name="username" placeholder="username"
                   value={this.state.user.username}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextField type="password" name="password" placeholder="password"
                   value={this.state.user.password}
                   onChange={this.handleInputChange}/>
            <br/>
            <br/>
            <Button variant="contained" color="primary" type="submit">Login</Button>
          </form>
          <h1>Register</h1>
          <form onSubmit={this.handleRegisterSubmit}>
            <TextField type="text" name="username" placeholder="username"
                   value={this.state.user.username}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextField type="password" name="password" placeholder="password"
                   value={this.state.user.password}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextField type="email" name="email" placeholder="email"
                   value={this.state.user.email}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextField type="text" name="full_name" placeholder="full name"
                   value={this.state.user.full_name}
                   onChange={this.handleInputChange}/>
            <br/>
            <br/>
            <Button variant="contained" color="primary" type="submit">Register</Button>
          </form>
        </React.Fragment>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.object,
};

export default Login;