/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-unused-vars */
import { Badge, Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../../../../context/AppContext';
import gerarPdfSpda from '../spda/gerarPdfSpda';

export default function SpdaReview() {
  const { spdaEdit, setSpdaEdit } = useContext(AppContext);
  const [spdas, setSpdas] = useState([]);
  const history = useHistory();
  const [complete, setComplete] = useState(0);
  const [incluirFinalizados, setIncluirFinalizados] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = incluirFinalizados
          ? `${localhost}/spda` : `${localhost}/spda/search?complete=false`;
        const response = await axios.get(url);
        const sortedSpdas = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setSpdas(sortedSpdas);
      } catch (error) {
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

  const handleEdit = async (spdaId) => {
    const response = await axios.get(`${localhost}/spda/${spdaId}`);
    const { data: { ac, dpto, empresa, nome, pontosSpda, resume } } = response;
    console.log(response);
    setSpdaEdit({
      ac, dpto, empresa, nome, pontosSpda: [...pontosSpda], edit: true, spdaId, resume,
    });
    history.push('/spda-edit');
  };

  const deleteSpda = async (spdaId) => {
    axios.delete(`${localhost}/spda/${spdaId}`);
    setSpdas(spdas.filter((e) => e.id !== spdaId));
  };

  const finalizar = async (spdaId) => {
    try {
      await axios.put(`${localhost}/spda/complete/${spdaId}`);
      setComplete((prevComplete) => prevComplete + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const baixarPdf = (spda) => {
    gerarPdfSpda(spda);
  };

  return (
    <div className="App">
      <FormGroup>
        <FormControlLabel
          control={ <Switch /> }
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
            {spdas.map((spdaa, i) => (
              <tr
                key={ i }
                className={
                  `border-y-2 ${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`
                }
              >
                <td>
                  {spdaa.complete ? (
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
                <td className="border-x-2 border-gray-300">{spdaa.nome}</td>
                <td className="border-x-2 border-gray-300">{spdaa.empresa?.nome}</td>
                <td
                  className="border-x-2 border-gray-300"
                >
                  {formatDate(spdaa.createdAt)}
                </td>
                <td>
                  <div>
                    <Button
                      className="m-1"
                      variant="contained"
                      onClick={ () => handleEdit(spdaa.id) }
                    >
                      Editar

                    </Button>
                    <Button
                      className="m-1"
                      variant="contained"
                      onClick={ () => deleteSpda(spdaa.id) }
                    >
                      Deletar

                    </Button>
                    <Button
                      className="m-1"
                      variant="contained"
                      onClick={ () => finalizar(spdaa.id) }
                    >
                      Finalizar

                    </Button>
                    <Button
                      className="m-1"
                      variant="contained"
                      onClick={ () => baixarPdf(spdaa) }
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
  );
}
