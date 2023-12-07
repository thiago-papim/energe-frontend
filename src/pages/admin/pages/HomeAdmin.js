/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import { empresa, laudoExample, spdaExample } from '../examples/exemplos';
import AppContext from '../../../context/AppContext';
import getDirectImageURL from '../../../services/pdfImage';

export default function HomeAdmin() {
  const history = useHistory();
  const { setSpda, setSpdaEdit, setLaudoInstalacao, setLaudoInstalacaoEdit, setEmpresaSelecionada } = useContext(AppContext);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = token;
    const checkAuthentication = async () => {
      try {
        await axios.get(`${localhost}/login/token`);
      } catch (error) {
        console.log(error);
        history.push('/login');
      }
    };

    checkAuthentication();
  }, [history, localhost]);

  return (
    <div>
      <HeaderAdmin />
      <div className="mt-8 flex flex-col items-center">
        <Button
          variant="contained"
          className="w-[250px] mb-4"
          onClick={ () => {
            setSpda(spdaExample);
            setSpdaEdit(spdaExample);
            setLaudoInstalacao(laudoExample);
            setLaudoInstalacaoEdit(laudoExample);
            setEmpresaSelecionada(empresa);
            history.push('/spda');
          } }
        >
          SPDA
        </Button>
        <Button
          variant="contained"
          className="w-[250px]"
          onClick={ () => {
            setSpda(spdaExample);
            setEmpresaSelecionada(empresa);
            history.push('/laudo-de-instalacoes');
          } }
        >
          Laudo de Instalações
        </Button>
      </div>
    </div>
  );
}
