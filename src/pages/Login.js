/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Backdrop,
  Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import axios from 'axios';
import Header from '../components/header/Header';

export default function Login() {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [loginValid, setLoginValid] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    const checkAuthentication = async () => {
      try {
        await axios.get(`${localhost}/login/token`);
        history.push('/admin');
      } catch (error) {
        setLoading(false);
        return 0;
      }
    };
    checkAuthentication();
  }, [history, localhost]);

  const inputPasswordChange = ({ target: { value } }) => {
    setPassword(value);
    setLoginValid(false);
  };

  const inputUserChange = ({ target: { value } }) => {
    setUser(value);
    setLoginValid(false);
  };

  const btnLogin = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', password);
    try {
      const response = await axios.post(`${localhost}/login`, formData);
      console.log(response);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/admin');
      }
    } catch (error) {
      console.log(error);
      setLoginValid(true);
    }
  };

  return (
    <div className="App">
      <Backdrop
        sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
        open={ loading }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />
      <div
        className="flex justify-center mt-32"
      >
        <div
          className="flex flex-col w-[400px] h-96
        items-center justify-center mb-36"
        >
          <Avatar sx={ { m: 1, bgcolor: '' } }>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6" className="mb-5">
            Login
          </Typography>
          <div
            className="pb-8"
          >
            <TextField
              onChange={ inputUserChange }
              id="outlined-basic"
              label="Usuário"
              variant="outlined"
              style={ { width: '300px', height: '40px' } }
            />
          </div>
          <div
            className="pb-8"
          >
            <TextField
              onChange={ inputPasswordChange }
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
              style={ { width: '300px', height: '40px' } }
            />
          </div>
          <Button
            onClick={ btnLogin }
            className="p-10"
            variant="contained"
            disabled={ user.length < 4 || password.length < 6 }
            style={ { width: '300px', height: '50px' } }
          >
            Login
          </Button>
          { loginValid
            ? <Alert className="my-3" severity="error">Usuário ou Senha inválido</Alert>
            : ''}
        </div>
      </div>
    </div>
  );
}
