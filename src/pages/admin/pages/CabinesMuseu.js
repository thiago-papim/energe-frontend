/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import PaginaUm from '../components/cabineMuseu/PaginaUm';
import PaginaDois from '../components/cabineMuseu/PaginaDois';
import PaginaTres from '../components/cabineMuseu/PaginaTres';

export default function CabinesMuseu() {
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  const finishMuseu = async () => {
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', 'Teste Front');
    formData.append('empresaId', 1);
    formData.append('ac', 'Thiago');
    formData.append('dpto', 'Manutenção');
    formData.append('complete', 'false');
    const dadosObj = { teste: 'oi', testeTwo: 'oi2' };
    formData.append('dados', JSON.stringify(dadosObj));
    formData.append('imgOne', 'dsadadada');
    formData.append('imgTwo', 'Manutençdsadadadadaão');
    try {
      const response = await axios.post(`${localhost}/museu`, formData);
      if (response.status === statusOk) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-10">
      <HeaderAdmin />
      <div className="mt-10 flex flex-col justify-center items-center">
        <p>CABINE MUSEU</p>
        <Button
          variant="contained"
          className="w-[280px]"
          onClick={ finishMuseu }
        >
          Teste
        </Button>
        <PaginaUm />
        <PaginaDois />
        <PaginaTres />
      </div>
    </div>
  );
}
