/* eslint-disable no-alert */
/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import emailjs from '@emailjs/browser';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function Contact() {
  const [info, setInfo] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });
  const onGenericChange = (e) => {
    const { target: { value, name } } = e;
    setInfo({ ...info, [name]: value });
  };

  const enviar = async () => {
    const templeteParams = {
      name: info.nome,
      message: info.mensagem,
      telefone: info.telefone,
      email: info.email,
    };
    const response = await emailjs.send(
      'service_dl4nema',
      'template_w3iekgk',
      templeteParams,
      'OSuuCWBO6Qc2by8bB',
    );
    if (response.status === 200) {
      setInfo({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
      });
    }
  };
  return (
    <div className="App flex flex-col h-screen justify-between">
      <div className="mt-36 mb-10 flex flex-col items-center">
        <Header />
        <p>
          Contato
        </p>
        <div className="m-3">
          <TextField
            onChange={ onGenericChange }
            value={ info.nome }
            name="nome"
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            style={ { width: '300px', height: '40px' } }
          />
        </div>
        <div className="m-3">
          <TextField
            onChange={ onGenericChange }
            value={ info.email }
            name="email"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            style={ { width: '300px', height: '40px' } }
          />
        </div>
        <div className="m-3">
          <TextField
            onChange={ onGenericChange }
            value={ info.telefone }
            name="telefone"
            id="outlined-basic"
            label="Telefone"
            variant="outlined"
            style={ { width: '300px', height: '40px' } }
          />
        </div>
        <div className="w-full items-center justify-center flex flex-col mt-4">
          <p>Mensagem:</p>
          <TextareaAutosize
            onChange={ onGenericChange }
            value={ info.mensagem }
            name="mensagem"
            className="border-2 w-[70%] lg:w-[50%]"
            minRows={ 3 }
            placeholder="Digite aqui"
          />
        </div>
        <div className="m-3">
          <Button
            onClick={ enviar }
            className="p-10"
            variant="contained"
            style={ { width: '300px', height: '50px' } }
          >
            Enviar
          </Button>
        </div>
      </div>
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
}
