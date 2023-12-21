/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import { empresa, ensaioExample, laudoExample, spdaExample } from '../examples/exemplos';
import AppContext from '../../../context/AppContext';

export default function HomeAdmin() {
  const history = useHistory();
  const { setSpda, setSpdaEdit,
    setLaudoInstalacao, setLaudoInstalacaoEdit,
    setEmpresaSelecionada, setEnsaioEquipamento, setEnsaioEquipamentoEdit } = useContext(AppContext);
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
            setEnsaioEquipamento(ensaioExample);
            setEnsaioEquipamentoEdit(ensaioExample);
            setEmpresaSelecionada(empresa);
            history.push('/spda');
          } }
        >
          SPDA
        </Button>
        <Button
          variant="contained"
          className="w-[250px] mb-4"
          onClick={ () => {
            setSpda(spdaExample);
            setSpdaEdit(spdaExample);
            setLaudoInstalacao(laudoExample);
            setLaudoInstalacaoEdit(laudoExample);
            setEnsaioEquipamento(ensaioExample);
            setEnsaioEquipamentoEdit(ensaioExample);
            setEmpresaSelecionada(empresa);
            history.push('/laudo-de-instalacoes');
          } }
        >
          Laudo de Instalações
        </Button>
        <Button
          variant="contained"
          className="w-[250px] mb-4"
          onClick={ () => {
            setSpda(spdaExample);
            setSpdaEdit(spdaExample);
            setLaudoInstalacao(laudoExample);
            setLaudoInstalacaoEdit(laudoExample);
            setEnsaioEquipamento(ensaioExample);
            setEnsaioEquipamentoEdit(ensaioExample);
            setEmpresaSelecionada(empresa);
            history.push('/ensaio-de-equipamento');
          } }
        >
          Ensaio de Equipamentos
        </Button>
        {/* <Button
          variant="contained"
          className="w-[280px]"
          onClick={ () => {
            setSpda(spdaExample);
            setSpdaEdit(spdaExample);
            setLaudoInstalacao(laudoExample);
            setLaudoInstalacaoEdit(laudoExample);
            setEnsaioEquipamento(ensaioExample);
            setEnsaioEquipamentoEdit(ensaioExample);
            setEmpresaSelecionada(empresa);
            history.push('/cabines-museu');
          } }
        >
          Manutenção Cabines Museu
        </Button> */}
      </div>
    </div>
  );
}
