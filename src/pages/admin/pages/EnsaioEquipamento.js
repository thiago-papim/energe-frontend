/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import AppContext from '../../../context/AppContext';
import AutoCompleteEmpresa from '../components/AutoCompleteEmpresa';
import PontosEnsaio from '../components/ensaioEquipamento/PontosEnsaio';
import { empresa, ensaioExample } from '../examples/exemplos';

export default function EnsaioEquipamento() {
  const {
    ensaioEquipamento,
    setEnsaioEquipamento,
    setEmpresaSelecionada,
  } = useContext(AppContext);
  const [completeInitial, setCompleteInitial] = useState(false);
  const [nomeEnsaio, setNomeEnsaio] = useState('');
  const [open, setOpen] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;
  const history = useHistory();

  const validButton = !nomeEnsaio || !ensaioEquipamento.empresa.nome;

  console.log(ensaioEquipamento);

  const handleNameEnsaio = ({ target: { value } }) => {
    setNomeEnsaio(value);
    setEnsaioEquipamento((prev) => {
      return {
        ...prev,
        nome: value,
      };
    });
  };

  const finishPontoEnsaio = async (ensaioId) => {
    const responsePontos = await ensaioEquipamento.pontos.map(async (ponto) => {
      const formData = new FormData();
      formData.append('ensaioId', ensaioId);
      formData.append('nome', ponto.nome);
      formData.append('ladoEsquerdo', ponto.ladoEsquerdo);
      formData.append('ladoDireito', ponto.ladoDireito);
      formData.append('obs', ponto.obs);
      formData.append('image', ponto.imgFile[0]);
      try {
        await axios.post(`${localhost}/ensaio/ponto`, formData);
      } catch (error) {
        console.error(error);
      }
    });
    return Promise.all(responsePontos);
  };

  const finishEnsaioEquipamento = async () => {
    setOpen(true);
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', nomeEnsaio);
    formData.append('empresaId', ensaioEquipamento.empresa.id);
    formData.append('complete', 'false');
    try {
      const response = await axios.post(`${localhost}/ensaio`, formData);
      if (response.status === statusOk) {
        console.log(response.data);
        await finishPontoEnsaio(response.data.id);
      }
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    setEnsaioEquipamento(ensaioExample);
    setEmpresaSelecionada(empresa);
    history.push('admin');
  };

  return (
    <div className="mb-10">
      <HeaderAdmin />
      <div
        className="mt-8 flex flex-col items-center"
      >
        <Backdrop
          sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
          open={ open }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <TextField
          value={ nomeEnsaio }
          disabled={ completeInitial }
          className="m-3 w-[250px]"
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          onChange={ handleNameEnsaio }
        />
        <AutoCompleteEmpresa
          report={ setEnsaioEquipamento }
          disabled={ completeInitial }
        />
        {
          !completeInitial ? (
            <Button
              disabled={ validButton }
              className="mt-3"
              variant="contained"
              onClick={ () => setCompleteInitial(true) }
            >
              Continuar
            </Button>
          ) : (
            <div className="flex flex-col items-center">
              <Button
                disabled={ validButton || ensaioEquipamento.pontos.some((e) => e.edit) }
                className="mt-3"
                variant="contained"
                onClick={ () => setCompleteInitial(false) }
              >
                Editar Acima
              </Button>
              <PontosEnsaio disabledBtn={ completeInitial } />
              <Button
                disabled={ ensaioEquipamento.pontos.some((e) => e.edit)
                  || ensaioEquipamento.pontos.length === 0 }
                className="mt-3"
                variant="contained"
                onClick={ () => finishEnsaioEquipamento() }
              >
                Confirmar e Enviar
              </Button>
            </div>
          )
        }
      </div>
    </div>
  );
}
