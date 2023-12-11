/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Backdrop, Button, CircularProgress, FormControl,
  FormLabel,
  InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderAdmin from '../components/HeaderAdmin';
import AutoCompleteEmpresa from '../components/AutoCompleteEmpresa';
import AppContext from '../../../context/AppContext';
import { laudoExample, empresa } from '../examples/exemplos';
import PontosLaudo from '../components/laudoInstalacao/PontosLaudo';

export default function LaudoInstalacao() {
  const {
    laudoInstalacao,
    setLaudoInstalacao,
    setEmpresaSelecionada,
  } = useContext(AppContext);
  const [dpto, setDpto] = useState('Manutenção');
  const [ac, setAc] = useState('');
  const [nomeLaudo, setNomeLaudo] = useState('');
  const [completeInitial, setCompleteInitial] = useState(false);
  const [conclusao, setConclusao] = useState('');
  const [open, setOpen] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;
  const history = useHistory();

  const validButton = !ac || !dpto || !laudoInstalacao.empresa.nome || !nomeLaudo;

  useEffect(() => {
    setDpto(laudoInstalacao.dpto);
    setAc(laudoInstalacao.ac);
  }, [laudoInstalacao]);

  const handleAc = ({ target: { value } }) => {
    setAc(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    setLaudoInstalacao((prev) => {
      return {
        ...prev,
        ac: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      };
    });
  };

  const handleDpto = ({ target: { value } }) => {
    setDpto(value);
    setLaudoInstalacao((prev) => {
      return {
        ...prev,
        dpto: value,
      };
    });
  };

  const handleNameLaudo = ({ target: { value } }) => {
    setNomeLaudo(value);
    setLaudoInstalacao((prev) => {
      return {
        ...prev,
        nome: value,
      };
    });
  };

  const handleConclusao = ({ target: { value } }) => {
    setConclusao(value);
    setLaudoInstalacao((prev) => {
      return {
        ...prev,
        resume: value,
      };
    });
  };

  const finishPontoLaudo = async (laudoId) => {
    const responsePontos = await laudoInstalacao.pontos.map(async (ponto) => {
      const formData = new FormData();
      formData.append('laudoId', laudoId);
      formData.append('nome', ponto.nome);
      formData.append('respostas', ponto.respostas);
      formData.append('obs', ponto.obs);
      formData.append('risco', ponto.risco);
      if (ponto.imagens) {
        ponto.imagens.forEach((imagem) => {
          formData.append('image', imagem[0]);
        });
      }
      try {
        await axios.post(`${localhost}/laudo/ponto`, formData);
      } catch (error) {
        console.error(error);
      }
    });
    return Promise.all(responsePontos);
  };

  const finishLaudoInstalacao = async () => {
    setOpen(true);
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', nomeLaudo);
    formData.append('empresaId', laudoInstalacao.empresa.id);
    formData.append('ac', ac);
    formData.append('dpto', dpto);
    formData.append('complete', 'false');
    formData.append('resume', conclusao);
    try {
      const response = await axios.post(`${localhost}/laudo`, formData);
      if (response.status === statusOk) {
        await finishPontoLaudo(response.data.id);
      }
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    setLaudoInstalacao(laudoExample);
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
        <p className="mb-4">Laudo de Instalações</p>
        <TextField
          value={ nomeLaudo }
          disabled={ completeInitial }
          className="mb-3 w-[250px]"
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          onChange={ handleNameLaudo }
        />
        <AutoCompleteEmpresa
          disabled={ completeInitial }
          report={ setLaudoInstalacao }
        />
        <TextField
          value={ ac }
          disabled={ completeInitial }
          className="mt-3 w-[250px]"
          id="outlined-basic"
          label="A/C Sr(a)"
          variant="outlined"
          onChange={ handleAc }
        />
        <FormControl className="w-[250px] my-3">
          <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            disabled={ completeInitial }
            id="demo-simple-select"
            value={ dpto }
            label="Departamento"
            onChange={ handleDpto }
          >
            <MenuItem value="Manutenção">Manutenção</MenuItem>
            <MenuItem value="Operação">Operação</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </Select>
        </FormControl>
        {
          !completeInitial ? (
            <Button
              disabled={ validButton }
              variant="contained"
              onClick={ () => setCompleteInitial(true) }
            >
              Continuar
            </Button>
          ) : (
            <Button
              disabled={ validButton }
              variant="contained"
              onClick={ () => setCompleteInitial(false) }
            >
              Editar Acima
            </Button>
          )
        }
        <PontosLaudo
          disabledButton={ completeInitial }
          pontos={ laudoInstalacao.pontosLaudo }
        />
        <div className="flex justify-center w-[450px]">
          <FormControl
            className="rounded-xl w-full flex justify-center items-center border-2 p-2"
          >
            <FormLabel>Conclusão</FormLabel>
            <TextareaAutosize
              onChange={ (e) => handleConclusao(e) }
              value={ conclusao }
              aria-label="minimum height"
              minRows={ 1 }
              placeholder="  Escreva Aqui"
              className="bg-gray-100 rounded-xl max-w-[500px] border-2
              border-gray-300 p-2"
            />
          </FormControl>
        </div>
        <Button
          className="my-4"
          disabled={
            validButton
            || !laudoInstalacao.pontos.length
            || laudoInstalacao.pontos.some((e) => e.edit)
          }
          variant="contained"
          onClick={ () => finishLaudoInstalacao() }
        >
          confirmar e enviar
        </Button>
      </div>
    </div>
  );
}
