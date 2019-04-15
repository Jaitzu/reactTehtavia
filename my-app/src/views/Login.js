import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser, checkUser} from '../utils/MediaAPI';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Login extends Component {
  state = {
    user:{    username: '',
      password: '',
      repeatPassword:'',
      email: '',
      full_name: '',
    },
    toggleForm: true,
    validUser: true,

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

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }
  showRegister=()=>{
    const reg =document.getElementById('register');
   let log =document.getElementById('login');
      reg.style.display='block';
      log.style.display='none';
  }

  showLogin=()=>{
    const reg =document.getElementById('register');
    let log =document.getElementById('login');
    reg.style.display='none';
    log.style.display='block';
  }

  blurCheck=()=>{
    const name = this.state.user.username;
    checkUser(name).then(response =>{
      console.log(response)
      if(response.available === false){
        alert("Username: " + response.username + " is unavailable")
      }
        })
  }

  render() {
    return (
        <React.Fragment>
          <div id='login'>
          <h1>Login</h1>
          <ValidatorForm onSubmit={this.handleLoginSubmit}>
            <TextValidator type="text" name="username" placeholder="username"
                           validators={['required']}
                           errorMessages={['this field is required']}
                   value={this.state.user.username}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextValidator type="password" name="password" placeholder="password"
                           validators={['required']}
                           errorMessages={['this field is required']}
                   value={this.state.user.password}
                   onChange={this.handleInputChange}/>
            <br/>
            <br/>
            <Button variant="contained" color="primary" type="submit">Login</Button>
          </ValidatorForm>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={this.showRegister}>Register</Button>
          </div>
          <div id='register'>
          <h1>Register</h1>
          <ValidatorForm onSubmit={this.handleRegisterSubmit}>
            <TextValidator type="text" name="username" placeholder="username"
                   value={this.state.user.username}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={['this field is required','min length 3 characters']}
                       onBlur={this.blurCheck}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextValidator type="password" name="password" placeholder="password"
                           validators={['isPasswordMatch', 'required','minStringLength:5']}
                           errorMessages={['password mismatch', 'this field is required','min length 5 characters']}
                   value={this.state.user.password}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextValidator type="password" name="repeatPassword" placeholder="Repeat password"
                           validators={['isPasswordMatch', 'required','minStringLength:5']}
                           errorMessages={['password mismatch', 'this field is required','min length 5 characters']}
                           value={this.state.user.repeatPassword}
                           onChange={this.handleInputChange}/>
            <br/>
            <TextValidator type="email" name="email" placeholder="email"
                           validators={['required', 'isEmail']}
                           errorMessages={['this field is required', 'email is not valid']}
                   value={this.state.user.email}
                   onChange={this.handleInputChange}/>
            <br/>
            <TextValidator type="text" name="full_name" placeholder="full name"
                   value={this.state.user.full_name}
                           validators={['required']}
                   errorMessages={['this field is required']}
                   onChange={this.handleInputChange}/>
            <br/>
            <br/>
            <Button variant="contained" color="primary" type="submit">Register</Button>
          </ValidatorForm>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={this.showLogin}>Back to login</Button>
          </div>
        </React.Fragment>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.object,
};

export default Login;