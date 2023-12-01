/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Backdrop, Button, CircularProgress, FormControl,
  FormLabel,
  InputLabel, MenuItem, Select, TextField, TextareaAutosize,
  useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderAdmin from '../components/HeaderAdmin';
import AutoCompleteEmpresa from '../components/AutoCompleteEmpresa';
import AppContext from '../../../context/AppContext';
import PontosSpda from '../components/spda/PontosSpda';
import { spdaExample, empresa } from '../examples/exemplos';

export default function Spda() {
  const isSmallScreen = useMediaQuery('(max-width:472px)');
  const { spda, setSpda, setEmpresaSelecionada } = useContext(AppContext);
  const [dpto, setDpto] = useState('Manutenção');
  const [ac, setAc] = useState('');
  const [nomeSpda, setNomeSpda] = useState('');
  const [completeInitial, setCompleteInitial] = useState(false);
  const [conclusao, setConclusao] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  const validButton = !ac || !dpto || !spda.empresa.nome || !nomeSpda;

  useEffect(() => {
    setDpto(spda.dpto);
    setAc(spda.ac);
  }, [spda]);

  const handleAc = ({ target: { value } }) => {
    setAc(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    setSpda((prev) => {
      return {
        ...prev,
        ac: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      };
    });
  };

  const handleDpto = ({ target: { value } }) => {
    setDpto(value);
    setSpda((prev) => {
      return {
        ...prev,
        dpto: value,
      };
    });
  };

  const handleNameSpda = ({ target: { value } }) => {
    setNomeSpda(value);
    setSpda((prev) => {
      return {
        ...prev,
        nome: value,
      };
    });
  };

  const handleConclusao = ({ target: { value } }) => {
    setConclusao(value);
    setSpda((prev) => {
      return {
        ...prev,
        resume: value,
      };
    });
  };

  const finishPontoSpda = async (spdaId) => {
    const statusOk = 200;
    const responsePontos = await spda.pontos.map(async (ponto) => {
      const formData = new FormData();
      formData.append('spdaId', spdaId);
      formData.append('nome', ponto.nome);
      formData.append('respostas', ponto.respostas);
      formData.append('obs', ponto.obs);
      if (ponto.imagens) {
        ponto.imagens.forEach((imagem) => {
          formData.append('imagens', imagem[0]);
        });
      }
      try {
        const response = await axios.post(`${localhost}/spda/ponto`, formData);
        if (response.status === statusOk) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return Promise.all(responsePontos);
  };

  const finishSpda = async () => {
    setOpen(true);
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', nomeSpda);
    formData.append('empresaId', spda.empresa.id);
    formData.append('ac', ac);
    formData.append('dpto', dpto);
    formData.append('complete', 'false');
    formData.append('resume', conclusao);
    try {
      const response = await axios.post(`${localhost}/spda`, formData);
      if (response.status === statusOk) {
        await finishPontoSpda(response.data.id);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setSpda(spdaExample);
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
        <p className="mb-4">Modelo SPDA</p>
        <TextField
          value={ nomeSpda }
          disabled={ completeInitial }
          className="mb-3 w-[250px]"
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          onChange={ handleNameSpda }
        />
        <AutoCompleteEmpresa
          disabled={ completeInitial }
          report={ setSpda }
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
        <PontosSpda disabledButton={ completeInitial } pontos={ spda.pontosSpda } />
        <div className="flex justify-center min-w-[400px] w-full">
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
              className={ `bg-gray-100 rounded-xl border-2 
              ${isSmallScreen ? 'w-full' : 'w-[450px]'}
              border-gray-300 p-2` }
            />
          </FormControl>
        </div>
        <Button
          className="my-4"
          disabled={
            validButton || !spda.pontos.length || spda.pontos.some((e) => e.edit)
          }
          variant="contained"
          onClick={ () => finishSpda() }
        >
          confirmar e enviar
        </Button>
      </div>
    </div>
  );
}
