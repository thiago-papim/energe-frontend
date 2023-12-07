import React, { useContext, useState } from 'react';
import {
  Alert,
  Backdrop, Button, CircularProgress, Snackbar, Stack, TextField, Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import AutoCompleteEmpresa from '../components/AutoCompleteEmpresa';
import AppContext from '../../../context/AppContext';

export default function SendFile() {
  const { empresaSelecionada } = useContext(AppContext);
  const [namePdf, setNamePdf] = useState(null);
  const [name, setName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  const adicionarPdf = (file) => {
    setNamePdf(file[0].name);
    setPdfFile(file);
  };

  const removePdf = () => {
    setNamePdf(null);
    setPdfFile(null);
    document.getElementById('sendImage').value = '';
  };

  const enviarPdf = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('nome', name);
    formData.append('empresaId', empresaSelecionada.id);
    formData.append('image', pdfFile[0]);
    const response = await axios.post(`${localhost}/pdf`, formData);
    console.log(response);
    setLoading(false);
    setOpenAlert(true);
    removePdf();
    setName('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div>
      <Stack spacing={ 2 } sx={ { width: '100%' } }>
        <Snackbar
          anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
          open={ openAlert }
          autoHideDuration={ 6000 }
          onClose={ handleClose }
        >
          <Alert onClose={ handleClose } severity="success" sx={ { width: '100%' } }>
            Arquivo enviado com sucesso!
          </Alert>
        </Snackbar>
      </Stack>
      <Backdrop
        sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
        open={ loading }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          className="flex flex-col"
        >
          <TextField
            className="my-2 mt-3"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            label="Nome"
            variant="outlined"
          />
          <Button
            component="label"
            variant="contained"
            className="mt-3"
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
          disabled={ !namePdf || !empresaSelecionada.nome.length || !name }
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
