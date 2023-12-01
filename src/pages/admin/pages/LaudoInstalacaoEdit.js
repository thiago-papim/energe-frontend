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
import PontosLaudoEdit from '../components/laudoInstalacao/PontosLaudoEdit';
import { empresa } from '../examples/exemplos';

export default function LaudoInstalacaoEdit() {
  const { setEmpresaSelecionada, empresaSelecionada,
    laudoInstalacaoEdit, setLaudoInstalacaoEdit,
  } = useContext(AppContext);
  const [dpto, setDpto] = useState('Manutenção');
  const [ac, setAc] = useState('');
  const [laudoInstalacao, setLaudoInstalacao] = useState('');
  const [completeInitial, setCompleteInitial] = useState(false);
  const [open, setOpen] = useState(false);
  const [conclusao, setConclusao] = useState('');
  const localhost = process.env.REACT_APP_LOCAL_HOST;
  const history = useHistory();

  console.log(laudoInstalacaoEdit);

  const validButton = !ac
  || !dpto || !laudoInstalacaoEdit.empresa.nome || !laudoInstalacao;

  useEffect(() => {
    setDpto(laudoInstalacaoEdit.dpto);
    setAc(laudoInstalacaoEdit.ac);
    setLaudoInstalacao(laudoInstalacaoEdit.nome);
    setConclusao(laudoInstalacaoEdit.resume || '');
    setEmpresaSelecionada(laudoInstalacaoEdit.empresa);
  }, [laudoInstalacaoEdit, setEmpresaSelecionada]);

  useEffect(() => {
    setCompleteInitial(true);
  }, []);

  const handleAc = ({ target: { value } }) => {
    setAc(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    setLaudoInstalacaoEdit((prev) => {
      return {
        ...prev,
        ac: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      };
    });
  };

  const handleDpto = ({ target: { value } }) => {
    setDpto(value);
    setLaudoInstalacaoEdit((prev) => {
      return {
        ...prev,
        dpto: value,
      };
    });
  };

  const handleNameLaudo = ({ target: { value } }) => {
    setLaudoInstalacao(value);
    setLaudoInstalacaoEdit((prev) => {
      return {
        ...prev,
        nome: value,
      };
    });
  };

  const handleConclusao = ({ target: { value } }) => {
    setConclusao(value);
    setLaudoInstalacaoEdit((prev) => {
      return {
        ...prev,
        resume: value,
      };
    });
  };

  const finishNewPontoLaudo = async (laudoId) => {
    const statusOk = 200;
    const novosPontos = laudoInstalacaoEdit.pontos.filter((ponto) => ponto.novo === true);
    const responsePontos = await novosPontos.map(async (ponto) => {
      if (ponto.novo) {
        const formData = new FormData();
        formData.append('laudoId', laudoId);
        formData.append('nome', ponto.nome);
        formData.append('respostas', ponto.respostas);
        formData.append('obs', ponto.obs);
        formData.append('risco', ponto.risco || 'Baixo');
        if (ponto.imagens) {
          ponto.imagens.forEach((imagem) => {
            formData.append('imagens', imagem[0]);
          });
        }
        try {
          const response = await axios.post(`${localhost}/laudo/ponto`, formData);
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

  const finishPontoLaudo = async (laudoId) => {
    const statusOk = 200;
    const responsePontos = await laudoInstalacaoEdit.pontos.map(async (ponto, i) => {
      if (ponto.id) {
        const pontoLaudoId = laudoInstalacaoEdit.pontosLaudoInstalacao[i].id;
        const formData = new FormData();
        formData.append('laudoId', laudoId);
        formData.append('nome', ponto.nome);
        formData.append('respostas', ponto.respostas);
        formData.append('obs', ponto.obs);
        formData.append('risco', ponto.risco);
        if (ponto.imagens) {
          ponto.imagens.forEach((imagem) => {
            formData.append('imagens', imagem[0]);
          });
        }
        try {
          const response = await axios
            .put(`${localhost}/laudo/ponto/${pontoLaudoId}`, formData);
          if (response.status === statusOk) {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
    const novosPontos = laudoInstalacaoEdit.pontos.filter((ponto) => ponto.novo === true);
    if (novosPontos.length) {
      console.log('teeeem pontoss');
      await finishNewPontoLaudo(laudoId);
    } else {
      console.log('nao tem pontos');
    }
    await Promise.all(responsePontos);
    setOpen(false);
  };

  const finishLaudo = async () => {
    setOpen(true);
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', laudoInstalacao);
    formData.append('ac', ac);
    formData.append('dpto', dpto);
    formData.append('complete', 'false');
    formData.append('resume', conclusao);
    formData.append('empresaId', empresaSelecionada.id);
    formData.append('imagensDelete', laudoInstalacaoEdit.imagensDelete);
    formData.append('laudoDelete', laudoInstalacaoEdit.laudoDelete);
    try {
      const response = await axios
        .put(`${localhost}/laudo/${laudoInstalacaoEdit.laudoInstalacaoId}`, formData);
      if (response.status === statusOk) {
        console.log(response);
        await finishPontoLaudo(laudoInstalacaoEdit.laudoInstalacaoId);
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
        <p className="mb-4">Laudo de Instalação</p>
        <TextField
          value={ laudoInstalacao }
          disabled={ completeInitial }
          className="mb-3 w-[250px]"
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          onChange={ handleNameLaudo }
        />
        <AutoCompleteEmpresa
          disabled={ completeInitial }
          report={ setLaudoInstalacaoEdit }
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
        <PontosLaudoEdit
          disabledButton={ completeInitial }
          pontos={ laudoInstalacaoEdit.pontosLaudoInstalacao }
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
          // disabled={
          //   validButton
          //   || !laudoInstalacaoEdit.pontos?.length
          //   || laudoInstalacaoEdit.pontos?.some((e) => e.edit)
          // }
          variant="contained"
          onClick={ () => finishLaudo() }
        >
          confirmar e enviar
        </Button>
      </div>
    </div>
  );
}
