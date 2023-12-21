/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import AppContext from '../../../context/AppContext';
import AutoCompleteEmpresa from '../components/AutoCompleteEmpresa';
import { empresa, ensaioExample } from '../examples/exemplos';
import PontosEnsaioEdit from '../components/ensaioEquipamento/PontosEnsaioEdit';

export default function EnsaioEquipamentoEdit() {
  const {
    ensaioEquipamentoEdit,
    setEnsaioEquipamentoEdit,
    setEmpresaSelecionada,
  } = useContext(AppContext);
  const [completeInitial, setCompleteInitial] = useState(false);
  const [nomeEnsaio, setNomeEnsaio] = useState('');
  const [open, setOpen] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;
  const history = useHistory();

  useEffect(() => {
    setNomeEnsaio(ensaioEquipamentoEdit.nome);
    setEmpresaSelecionada(ensaioEquipamentoEdit.empresa);
  }, [ensaioEquipamentoEdit, setEmpresaSelecionada]);

  useEffect(() => {
    setCompleteInitial(true);
  }, []);

  const validButton = !nomeEnsaio || !ensaioEquipamentoEdit.empresa.nome;

  const handleNameEnsaio = ({ target: { value } }) => {
    setNomeEnsaio(value);
    setEnsaioEquipamentoEdit((prev) => {
      return {
        ...prev,
        nome: value,
      };
    });
  };

  const finishNewPontoEnsaio = async (ensaioId) => {
    const statusOk = 200;
    const novosPontos = ensaioEquipamentoEdit.pontos
      .filter((ponto) => ponto.novo === true);
    const responsePontos = await novosPontos.map(async (ponto) => {
      if (ponto.novo) {
        const formData = new FormData();
        formData.append('nome', ponto.nome);
        formData.append('ensaioId', ensaioId);
        formData.append('ladoEsquerdo', ponto.ladoEsquerdo);
        formData.append('ladoDireito', ponto.ladoDireito);
        formData.append('obs', ponto.obs);
        if (ponto.imgFile) {
          formData.append('image', ponto.imgFile[0]);
        }
        try {
          const response = await axios.post(`${localhost}/ensaio/ponto`, formData);
          if (response.status === statusOk) {
            setOpen(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
    await Promise.all(responsePontos);
  };

  const finishPontoEnsaio = async (ensaioId) => {
    const responsePontos = await ensaioEquipamentoEdit.pontos.map(async (ponto, i) => {
      if (ponto.id) {
        const pontoEnsaioId = ensaioEquipamentoEdit.pontosEnsaioEquipamento[i].id;
        const formData = new FormData();
        formData.append('nome', ponto.nome);
        formData.append('ensaioEquipamentoId', ensaioId);
        formData.append('ladoEsquerdo', ponto.ladoEsquerdo);
        formData.append('ladoDireito', ponto.ladoDireito);
        formData.append('obs', ponto.obs);
        if (ponto.imgFile) {
          console.log(ponto.imgFile);
          formData.append('image', ponto.imgFile[0]);
        }
        try {
          const teste = await axios
            .put(`${localhost}/ensaio/ponto/${pontoEnsaioId}`, formData);
          console.log(teste);
        } catch (error) {
          console.error(error);
        }
      }
    });
    const novosPontos = ensaioEquipamentoEdit.pontos
      .filter((ponto) => ponto.novo === true);
    if (novosPontos.length) {
      await finishNewPontoEnsaio(ensaioId);
    }
    await Promise.all(responsePontos);
    setOpen(false);
  };

  const finishEnsaioEquipamento = async () => {
    setOpen(true);
    const statusOk = 200;
    const formData = new FormData();
    formData.append('nome', nomeEnsaio);
    formData.append('empresaId', ensaioEquipamentoEdit.empresa.id);
    formData.append('complete', 'false');
    formData.append('pontoDelete', ensaioEquipamentoEdit.ensaioDelete);
    try {
      const response = await axios
        .put(`${localhost}/ensaio/${ensaioEquipamentoEdit.ensaioId}`, formData);
      if (response.status === statusOk) {
        console.log(response.data);
        await finishPontoEnsaio(ensaioEquipamentoEdit.ensaioId);
      }
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    setEnsaioEquipamentoEdit(ensaioExample);
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
          report={ setEnsaioEquipamentoEdit }
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
                disabled={ validButton
                  || ensaioEquipamentoEdit?.pontosEnsaioEquipamento.some((e) => e.edit) }
                className="mt-3"
                variant="contained"
                onClick={ () => setCompleteInitial(false) }
              >
                Editar Acima
              </Button>
              <PontosEnsaioEdit
                disabledBtn={ completeInitial }
                pontos={ ensaioEquipamentoEdit.pontosEnsaioEquipamento }
              />
              <Button
                disabled={ !ensaioEquipamentoEdit.pontos?.length
                  || ensaioEquipamentoEdit.pontos?.some((e) => e.edit) }
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
