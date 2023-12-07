/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
import { Alert, Backdrop, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import React, { useState } from 'react';
// import styled from '@emotion/styled';
import isCNPJFormatValid from '../../../../services/cnpjValid';

export default function AddCompany() {
  const [imagemup, setImagemup] = useState(null);
  const [cep, setCep] = useState('');
  const [enderecoCompleto, setEnderecoCompĺeto] = useState(null);
  const [cnpj, setCnpj] = useState('');
  const [name, setName] = useState('');
  const [numero, setNumero] = useState('');
  const [disableSend, setDisableSend] = useState(false);
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [imagem, setImagem] = useState(null);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  const envio = async () => {
    setDisableSend(true);
    setOpen(true);
    const formData = new FormData();
    formData.append('image', imagemup ? imagemup[0] : null);
    formData.append('nome', name);
    formData.append('rua', enderecoCompleto.logradouro);
    formData.append('numero', numero);
    formData.append('cidade', enderecoCompleto.localidade);
    formData.append('estado', enderecoCompleto.uf);
    formData.append('cnpj', cnpj);

    try {
      const response = await axios.post(`${localhost}/companies`, formData);
      if (response.data.data) {
        setComplete(true);
      }
    } catch (error) {
      if (error.response) {
        console.log('Erro na requisição:', error.response.data);
      } else {
        console.log('Erro:', error.message);
      }
    }
    setDisableSend(false);
    setOpen(false);
  };

  const newCompany = () => {
    setComplete(false);
    setCnpj('');
    setName('');
    setNumero('');
    setImagemup(null);
    setCep('');
    setEnderecoCompĺeto(null);
  };

  const handleCepChange = async (event) => {
    if (event.target.value.length <= 8) {
      setCep(event.target.value);
      setEnderecoCompĺeto(null);
    }
    if (event.target.value.length === 8) {
      const cep2 = event.target.value;
      const url = `https://viacep.com.br/ws/${cep2}/json/`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const endereco = await response.json();
          setEnderecoCompĺeto(endereco);
        } else {
          console.error('Erro ao buscar o endereço');
        }
      } catch (error) {
        console.error(`Erro na solicitação: ${error}`);
      }
    } else {
      setEnderecoCompĺeto(null);
    }
  };

  const handleCnpj = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const formattedCnpj = numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    setCnpj(formattedCnpj);
  };

  const handleName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleNumero = (e) => {
    const { value } = e.target;
    setNumero(value);
  };

  const handleImagem = (file) => {
    console.log('oi');
    if (file.length) {
      setImagemup(file);
      const imageUrl = URL.createObjectURL(file[0]);
      setImagem(imageUrl);
    }
  };

  const disabledSend = !cnpj || !name || !numero || !enderecoCompleto || !isCNPJFormatValid(cnpj);

  return (
    <div className="flex flex-col items-center">
      { complete ? (
        <div className="flex flex-col items-center">
          <Stack sx={ { width: '100%' } } spacing={ 2 }>
            <Alert>Empresa Adicionada com Sucesso!</Alert>
          </Stack>
          <Button
            variant="contained"
            className="w-[230px] my-2"
            onClick={ () => newCompany() }
          >
            Adicionar Nova Empresa
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '18px', fontWeight: 'bold' } }>
            Adicionar Empresa
          </Typography>
          <TextField
            value={ name }
            onChange={ handleName }
            className="my-2"
            id="outlined-basic"
            label="Nome da Empresa"
            variant="outlined"
            disabled={ disableSend }
          />
          <TextField
            onChange={ handleCnpj }
            value={ cnpj }
            className="my-2"
            id="outlined-basic"
            label="CNPJ"
            variant="outlined"
            inputProps={ { maxLength: 18 } }
            disabled={ disableSend }
          />
          <p
            className="my-2"
          >
            Endereço
          </p>
          <TextField
            className="my-2"
            id="outlined-basic"
            label="Insira o CEP"
            variant="outlined"
            value={ cep }
            onChange={ (e) => {
              if (cep.length <= 8) {
                handleCepChange(e);
              }
            } }
            disabled={ disableSend }
          />
          {enderecoCompleto && enderecoCompleto.erro ? (
            <Alert severity="warning">CEP inválido!</Alert>
          ) : ''}
          {enderecoCompleto && enderecoCompleto.uf ? (
            <div className="flex flex-col">
              <TextField
                className="my-2"
                id="outlined-basic"
                label="Rua"
                value={ enderecoCompleto.logradouro }
                disabled
                variant="outlined"
              />
              <TextField
                value={ numero }
                onChange={ handleNumero }
                className="my-2"
                id="outlined-basic"
                label="Numero"
                variant="outlined"
                disabled={ disableSend }
              />
              <TextField
                className="my-2"
                id="outlined-basic"
                label="Bairro"
                value={ enderecoCompleto.bairro }
                disabled
                variant="outlined"
              />
              <TextField
                className="my-2"
                id="outlined-basic"
                label="Cidade"
                value={ enderecoCompleto.localidade }
                disabled
                variant="outlined"
              />
              <TextField
                className="my-2"
                id="outlined-basic"
                label="Cidade"
                value={ enderecoCompleto.uf }
                disabled
                variant="outlined"
              />
            </div>) : ''}
          { imagemup ? (
            <div>
              <img
                src={ imagem }
                alt="Imagem empresa"
                className="w-[200px] h-[200px]"
              />
              <Button
                variant="contained"
                className="w-[200px] my-2"
                onClick={ () => {
                  setImagemup(null);
                  setImagem(null);
                  document.getElementById('sendImage').value = '';
                } }
              >
                Remover Imagem
              </Button>
            </div>
          ) : ''}
          <Button
            disabled={ disableSend || imagemup !== null }
            className="my-4"
            component="label"
            variant="contained"
            startIcon={ <CloudUploadIcon /> }
          >
            Adicionar Imagem
            <input
              id="sendImage"
              type="file"
              accept=".jpg, .jpeg, .png"
              style={ { display: 'none' } }
              onChange={ (e) => {
                handleImagem(e.target.files);
              } }
            />
          </Button>
          <Button
            variant="contained"
            className="w-[150px] my-2"
            onClick={ () => envio() }
            disabled={ disabledSend }
          >
            Enviar
          </Button>
        </div>
      )}
      <div>
        <Backdrop
          sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
          open={ open }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}
