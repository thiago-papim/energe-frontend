/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderAdmin from '../components/HeaderAdmin';

export default function QrClientes() {
  const [validPage, setValidPage] = useState(false);
  const history = useHistory();
  const localhost = process.env.REACT_APP_LOCAL_HOST;
  useEffect(() => {
    const urlAtual = window.location.href;
    const partesDaUrl = urlAtual.split('/');
    const cnpj = partesDaUrl[partesDaUrl.length - 1];
    const getEmpresa = async () => {
      const response = await axios.get(`${localhost}/companies/${cnpj}`);
      if (response.data.id) {
        setValidPage(response.data);
      } else {
        history.push('/pagina-nao-encontrada');
      }
    };
    getEmpresa();
  }, [localhost, history]);
  return (
    <div>
      <HeaderAdmin />
      {validPage ? (
        <p>{`Empresa: ${validPage.nome}`}</p>
      ) : ''}
    </div>
  );
}
