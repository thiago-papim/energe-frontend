/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
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
import PontosSpdaEdit from '../components/spda/PontosSpdaEdit';
import { spdaExample, empresa } from '../examples/exemplos';

export default function SpdaEdit() {
  const { setEmpresaSelecionada, empresaSelecionada,
    setSpdaEdit, spdaEdit } = useContext(AppContext);
  const [dpto, setDpto] = useState('Manutenção');
  const [ac, setAc] = useState('');
  const [nomeSpda, setNomeSpda] = useState('');
  const [completeInitial, setCompleteInitial] = useState(false);
  const [open, setOpen] = useState(false);
  const [conclusao, setConclusao] = useState('');
  const localhost = process.env.REACT_APP_LOCAL_HOST;
  const history = useHistory();

  console.log(spdaEdit);

  const validButton = !ac || !dpto || !spdaEdit.empresa.nome || !nomeSpda;

  useEffect(() => {
    setDpto(spdaEdit.dpto);
    setAc(spdaEdit.ac);
    setNomeSpda(spdaEdit.nome);
    setConclusao(spdaEdit.resume);
    setEmpresaSelecionada(spdaEdit.empresa);
  }, [spdaEdit, setEmpresaSelecionada]);

  useEffect(() => {
    setCompleteInitial(true);
  }, []);

  const handleAc = ({ target: { value } }) => {
    setAc(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    setSpdaEdit((prev) => {
      return {
        ...prev,
        ac: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      };
    });
  };

  const handleDpto = ({ target: { value } }) => {
    setDpto(value);
    setSpdaEdit((prev) => {
      return {
        ...prev,
        dpto: value,
      };
    });
  };

  const handleNameSpda = ({ target: { value } }) => {
    setNomeSpda(value);
    setSpdaEdit((prev) => {
      return {
        ...prev,
        nome: value,
      };
    });
  };

  const handleConclusao = ({ target: { value } }) => {
    setConclusao(value);
    setSpdaEdit((prev) => {
      return {
        ...prev,
        resume: value,
      };
    });
  };

  const finishNewPontoSpda = async (spdaId) => {
    const statusOk = 200;
    const novosPontos = spdaEdit.pontos.filter((ponto) => ponto.novo === true);
    const responsePontos = await novosPontos.map(async (ponto) => {
      if (ponto.novo) {
        const formData = new FormData();
        formData.append('spdaId', spdaId);
        formData.append('nome', ponto.nome);
        formData.append('respostas', ponto.respostas);
        formData.append('obs', ponto.obs);
        if (ponto.imagens) {
          ponto.imagens.forEach((imagem) => {
            formData.append('image', imagem[0]);
          });
        }
        try {
          const response = await axios.post(`${localhost}/spda/ponto`, formData);
          if (response.status === statusOk) {
            console.log(response);
            setOpen(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
    await Promise.all(responsePontos);
  };

  const finishPontoSpda = async (spdaId) => {
    const statusOk = 200;
    const responsePontos = await spdaEdit.pontos.map(async (ponto, i) => {
      if (ponto.id) {
        const pontoSpdaId = spdaEdit.pontosSpda[i].id;
        const formData = new FormData();
        formData.append('spdaId', spdaId);
        formData.append('nome', ponto.nome);
        formData.append('respostas', ponto.respostas);
        formData.append('obs', ponto.obs);
        if (ponto.imagens) {
          ponto.imagens.forEach((imagem) => {
            formData.append('image', imagem[0]);
          });
        }
        try {
          const response = await axios
            .put(`${localhost}/spda/ponto/${pontoSpdaId}`, formData);
          if (response.status === statusOk) {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
    const novosPontos = spdaEdit.pontos.filter((ponto) => ponto.novo === true);
    if (novosPontos.length) {
      console.log('teeeem pontoss');
      await finishNewPontoSpda(spdaId);
    } else {
      console.log('nao tem pontos');
    }
    await Promise.all(responsePontos);
    setOpen(false);
  };

  const finishSpda = async () => {
    setOpen(true);
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', nomeSpda);
    formData.append('ac', ac);
    formData.append('dpto', dpto);
    formData.append('complete', 'false');
    formData.append('resume', conclusao);
    formData.append('empresaId', empresaSelecionada.id);
    formData.append('imagensDelete', spdaEdit.imagensDelete);
    formData.append('spdaDelete', spdaEdit.spdaDelete);
    try {
      const response = await axios.put(`${localhost}/spda/${spdaEdit.spdaId}`, formData);
      if (response.status === statusOk) {
        await finishPontoSpda(spdaEdit.spdaId);
      }
    } catch (error) {
      console.log(error);
    }
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
          report={ setSpdaEdit }
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
        <PontosSpdaEdit
          disabledButton={ completeInitial }
          pontos={ spdaEdit.pontosSpda }
        />
        <div className="flex justify-center w-[450px]">
          <FormControl
            className="rounded-xl w-full border-2 p-2"
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
            || !spdaEdit.pontos?.length || spdaEdit.pontos?.some((e) => e.edit)
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
