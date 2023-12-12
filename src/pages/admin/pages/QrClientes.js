/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import pdfPng from '../../../imagens/pdf.png';
import Header from '../../../components/header/Header';

export default function QrClientes() {
  const [company, setCompany] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const localhost = process.env.REACT_APP_LOCAL_HOST;
  const urlAtual = window.location.href;
  const partesDaUrl = urlAtual.split('/');
  const cnpj = partesDaUrl[partesDaUrl.length - 1];

  useEffect(() => {
    setLoading(true);
    const getEmpresa = async () => {
      const response = await axios.get(`${localhost}/companies/${cnpj}`);
      if (response.data.id) {
        setCompany(response.data);
      } else {
        history.push('/pagina-nao-encontrada');
      }
    };
    const getPdfs = async () => {
      const response = await axios.get(`${localhost}/pdf/${cnpj}`);
      setPdfs(response.data);
      setLoading(false);
    };
    getEmpresa();
    getPdfs();
  }, [localhost, history, cnpj]);

  const baixarPdf = async (pdf) => {
    console.log(pdf);
    setLoading(true);
    try {
      const response = await fetch(`https://energe.s3.amazonaws.com/${pdf.awsKey}`);
      console.log(response);
      const blob = await response.blob();
      const urlBlob = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = `${pdf.nome}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlBlob);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao baixar o PDF:', error);
    }
  };

  return (
    <div className="mt-24 lg:mt-32">
      <Header />
      <Backdrop
        sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
        open={ loading }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {company ? (
        <p
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl py-3
           font-custom text-center border-b-2 border-black"
        >
          {`${company.nome}`}
        </p>
      ) : ''}
      { pdfs.length > 0 ? (
        pdfs.map((pdf, i) => (
          <button
            key={ i }
            className="flex items-center ml-5 my-3 hover:scale-110"
            onClick={ () => baixarPdf(pdf) }
          >
            <img
              src={ pdfPng }
              alt="pdfIcon"
              width={ 50 }
            />
            <p
              className="w-[100%] text-md lg:text-xl text-left font-thin pl-2"
            >
              {pdf.nome}
            </p>
          </button>
        ))
      )
        : (
          <p>Nenhum arquivo enviado!</p>
        )}
    </div>
  );
}
