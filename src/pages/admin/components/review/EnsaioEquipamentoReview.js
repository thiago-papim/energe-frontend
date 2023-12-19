/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-unused-vars */
import { Badge, Box, Button, CircularProgress,
  FormControlLabel, FormGroup, Switch } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../../../../context/AppContext';
import gerarPdfLaudoInstalacao from '../laudoInstalacao/gerarPdfLaudoInstalacao';
import gerarPdfEnsaioEquipamento from '../ensaioEquipamento/gerarPdfEnsaioEquipamento';

export default function EnsaioEquipamentoReview() {
  const { setEnsaioEquipamentoEdit } = useContext(AppContext);
  const history = useHistory();
  const [ensaioEquipamento, setEnsaioEquipamento] = useState([]);
  const [complete, setComplete] = useState(0);
  const [incluirFinalizados, setIncluirFinalizados] = useState(false);
  const [loading, setLoading] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const url = incluirFinalizados
          ? `${localhost}/ensaio` : `${localhost}/ensaio/search?complete=false`;
        const response = await axios.get(url);
        const sortedLaudos = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setEnsaioEquipamento(sortedLaudos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [complete, incluirFinalizados, localhost]);

  const formatDate = (date) => {
    const data = new Date(date);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    return `${dia < 10 ? `0${dia}` : dia}/${mes}/${ano}`;
  };

  const handleEdit = async (ensaioEquipamentoId) => {
    const response = await axios.get(`${localhost}/ensaio/${ensaioEquipamentoId}`);
    const { data: { nome, empresa, pontosEnsaioEquipamento, id: ensaioId } } = response;
    setEnsaioEquipamentoEdit({
      nome,
      empresa,
      pontosEnsaioEquipamento: [...pontosEnsaioEquipamento],
      ensaioId,
    });
    history.push('/ensaio-edit');
  };

  const deleteEnsaio = async (ensaioId) => {
    axios.delete(`${localhost}/ensaio/${ensaioId}`);
    setEnsaioEquipamento(ensaioEquipamento.filter((e) => e.id !== ensaioId));
  };

  const finalizar = async (ensaioId) => {
    try {
      await axios.put(`${localhost}/ensaio/complete/${ensaioId}`);
      setComplete((prevComplete) => prevComplete + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const baixarPdf = (ensaio) => {
    gerarPdfEnsaioEquipamento(ensaio);
  };

  return (
    <div className="App flex flex-col">
      { loading ? (
        <Box className="flex w-full justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <FormGroup>
            <FormControlLabel
              control={ <Switch checked={ incluirFinalizados } /> }
              label="Incluir Finalizados"
              onChange={ () => setIncluirFinalizados(!incluirFinalizados) }
            />
          </FormGroup>
          <div>
            <table className="border-2 border-gray-300 w-full">
              <thead>
                <tr>
                  <th>Status</th>
                  <th className="border-x-2 border-gray-300">Nome</th>
                  <th className="border-x-2 border-gray-300">Empresa</th>
                  <th className="border-x-2 border-gray-300">Data</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {ensaioEquipamento.map((ensaioEquipamentoo, i) => (
                  <tr
                    key={ i }
                    className={
                      `border-y-2 ${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`
                    }
                  >
                    <td>
                      {ensaioEquipamentoo.complete ? (
                        <div className="flex justify-center items-center">
                          <Badge
                            color="success"
                            variant="dot"
                            className="mr-2"
                          />
                          <p>
                            Finalizado
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <Badge
                            color="error"
                            variant="dot"
                            className="mr-2"
                          />
                          <p>
                            Em Aberto
                          </p>
                        </div>
                      )}
                    </td>
                    <td
                      className="border-x-2 border-gray-300"
                    >
                      {ensaioEquipamentoo.nome}
                    </td>
                    <td
                      className="border-x-2 border-gray-300"
                    >
                      {ensaioEquipamentoo.empresa.nome}
                    </td>
                    <td
                      className="border-x-2 border-gray-300"
                    >
                      {formatDate(ensaioEquipamentoo.createdAt)}
                    </td>
                    <td>
                      <div>
                        <Button
                          className="m-1"
                          variant="contained"
                          onClick={ () => handleEdit(ensaioEquipamentoo.id) }
                        >
                          Editar

                        </Button>
                        <Button
                          className="m-1"
                          variant="contained"
                          onClick={ () => deleteEnsaio(ensaioEquipamentoo.id) }
                        >
                          Deletar

                        </Button>
                        <Button
                          className="m-1"
                          variant="contained"
                          onClick={ () => finalizar(ensaioEquipamentoo.id) }
                        >
                          Finalizar

                        </Button>
                        <Button
                          className="m-1"
                          variant="contained"
                          onClick={ () => baixarPdf(ensaioEquipamentoo) }
                        >
                          Baixar PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) }
    </div>
  );
}
