/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';
import { Alert, Button, TextField } from '@mui/material';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AutoCompleteEmpresa from './admin/components/AutoCompleteEmpresa';
import AppContext from '../context/AppContext';
import { empresa } from './admin/examples/exemplos';

export default function Clientes() {
  const history = useHistory();
  const { setEmpresaSelecionada, empresaSelecionada } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const lengthEmpresa = empresaSelecionada.nome.length;

  const inputPasswordChange = ({ target: { value } }) => {
    setPassword(value);
    setPasswordValid(false);
  };

  const btnSubmit = () => {
    const cnpjLimpo = empresaSelecionada.cnpj.replace(/\D/g, '');
    if (password === cnpjLimpo) {
      history.push(`/clientes/${cnpjLimpo}`);
    } else {
      setPasswordValid(true);
    }
  };

  useEffect(() => {
    setEmpresaSelecionada(empresa);
  }, [setEmpresaSelecionada]);

  return (
    <div className="App flex flex-col h-screen justify-between">
      <Header />
      <div className="flex flex-col justify-center items-center mt-40">
        <p
          className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl
           font-custom text-center pb-4"
        >
          Clientes
        </p>
        <AutoCompleteEmpresa />
        <div
          className="py-4"
        >
          <TextField
            onChange={ inputPasswordChange }
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            style={ { width: '250px', height: '40px' } }
          />
        </div>
        <Button
          onClick={ btnSubmit }
          className="py-4"
          variant="contained"
          disabled={ password.length < 6 || lengthEmpresa < 1 }
          style={ { width: '250px', height: '50px' } }
        >
          Login
        </Button>
        { passwordValid
          ? <Alert className="my-3" severity="error">Usuário ou Senha inválido</Alert>
          : ''}
      </div>
      <Footer />
    </div>
  );
}
