import React, { useContext, useState } from 'react';
import { Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import AutoCompleteEmpresa from '../components/AutoCompleteEmpresa';
import AppContext from '../../../context/AppContext';

export default function SendFile() {
  const { empresaSelecionada } = useContext(AppContext);
  const [namePdf, setNamePdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  console.log(pdfFile);

  console.log(empresaSelecionada);

  const adicionarPdf = (file) => {
    setNamePdf(file[0].name);
    setPdfFile(file);
  };

  const removePdf = () => {
    setNamePdf(null);
    setPdfFile(null);
  };

  const enviarPdf = async () => {
    const formData = new FormData();
    formData.append('file', pdfFile[0]);
    const response = await axios.post(`${localhost}/upload/`, formData);
    console.log(response);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="mt-8 flex flex-col justify-center items-center">
        <AutoCompleteEmpresa />
        {
          pdfFile ? (
            <div className="flex justify-center items-center mt-4 h-[40px]">
              <Typography
                className="h-full p-0 m-0"
                variant="overline"
                display="block"
                gutterBottom
                style={ { fontSize: '16px', fontWeight: 'bold' } }
              >
                {namePdf}
              </Typography>
              <button
                className="h-full ml-2"
                onClick={ () => removePdf() }
              >
                <CloseIcon />
              </button>
            </div>
          ) : ''
        }
        <div
          className={ `${pdfFile ? '' : 'mt-10'}` }
        >
          <Button
          // disabled={ formulario.imagens?.length > 2 }
            component="label"
            variant="contained"
            startIcon={ <CloudUploadIcon /> }
          >
            Adicionar PDF
            <input
              type="file"
              id="sendImage"
              accept=".pdf"
              style={ { display: 'none' } }
              onChange={ (e) => adicionarPdf(e.target.files) }
            />
          </Button>
        </div>
        <Button
          disabled={ !namePdf || !empresaSelecionada.nome.length }
          className="mt-4"
          component="label"
          variant="contained"
          startIcon={ <CloseIcon /> }
          onClick={ () => enviarPdf() }
        >
          Enviar PDF
        </Button>
      </div>
    </div>
  );
}
