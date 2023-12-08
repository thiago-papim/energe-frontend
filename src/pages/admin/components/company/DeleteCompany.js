import { Alert,
  Autocomplete,
  Backdrop, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function DeleteCompany() {
  const [empresas, setEmpresas] = useState([]);
  const [erro, setErro] = useState(null);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploadEmpresas, setUploadEmpresas] = useState(0);
  const [complete, setComplete] = useState(false);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  useEffect(() => {
    setOpen(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${localhost}/companies`);
        setEmpresas(response.data);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        setErro('Ocorreu um erro ao buscar as empresa.');
      }
    };
    fetchData();
    setOpen(false);
  }, [uploadEmpresas, localhost]);

  const deleteCompany = async () => {
    setOpen(true);
    const formData = new FormData();
    formData.append('cnpj', empresaSelecionada.cnpj);
    const cleanedCnpj = empresaSelecionada.cnpj.replace(/\D/g, '');
    const response = await axios
      .delete(`${localhost}/companies/${cleanedCnpj}`)
      .then((respons) => {
        console.log(respons.data);
      })
      .catch((error) => {
        console.error('Erro na solicitação GET:', error);
      });
    console.log(response);
    setOpen(false);
    setEmpresaSelecionada(null);
    setUploadEmpresas(uploadEmpresas + 1);
    setComplete(true);
  };

  return (
    <div
      className="flex flex-col items-center"
    >
      { complete ? (
        <div className="flex flex-col items-center">
          <Stack sx={ { width: '100%' } } spacing={ 2 }>
            <Alert>Empresa Deletada com Sucesso!</Alert>
          </Stack>
          <Button
            variant="contained"
            className="w-[230px] my-2"
            onClick={ () => setComplete(false) }
          >
            Deletar Outra Empresa
          </Button>
        </div>
      ) : (
        <div>

          <div>
            <Backdrop
              sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
              open={ open }
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            style={ { fontSize: '18px', fontWeight: 'bold' } }
          >
            Deletar Empresa
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={ (event, newValue) => {
              if (newValue) {
                console.log('Valor selecionado:', newValue);
                setEmpresaSelecionada(newValue.value);
              } else {
                setEmpresaSelecionada(null);
              }
            } }
            isOptionEqualToValue={ (option, value) => option.cnpj === value.cnpj }
            options={ empresas.map((empresa, i) => ({
              label: empresa.nome,
              value: empresa,
              key: i,
            })) }
            sx={ { width: 300 } }
            renderInput={ (params) => <TextField { ...params } label="Empresas" /> }
          />
          {erro ? (
            <p>{erro}</p>
          ) : (
            <div>
              { empresaSelecionada ? ''

                : (<Alert className="mt-2" severity="info">Selecione uma empresa</Alert>)}
            </div>
          )}
          { empresaSelecionada ? (
            <div className="mt-3">
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                style={ { fontSize: '15px', fontWeight: 'bold' } }
              >
                {`Nome: ${empresaSelecionada ? empresaSelecionada.nome : ''}`}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                style={ { fontSize: '15px', fontWeight: 'bold' } }
              >
                {`CNPJ: ${empresaSelecionada ? empresaSelecionada.cnpj : ''}`}
              </Typography>
              <div className="flex">
                <Button
                  variant="contained"
                  className="w-[150px] mx-2"
                  onClick={ deleteCompany }
                >
                  Deletar
                </Button>
              </div>
            </div>
          ) : ''}
        </div>
      )}
    </div>
  );
}
