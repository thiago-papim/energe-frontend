import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ThemeProvider, createTheme } from '@mui/material';

export default function IntermedioHome() {
  const theme = createTheme({
    palette: {
      btnColor: {
        main: '#8792ad',
      },
    },
  });
  const history = useHistory();
  return (
    <ThemeProvider theme={ theme }>
      <section
        className="flex flex-col justify-center items-center w-full h-[600px] mx-auto
          bg-[url('./imagens/torres.jpg')] bg-cover bg-center"
      >
        <p
          className="text-white text-5xl font-custom mb-10 text-center"
        >
          Liderança em Soluções de Engenharia Elétrica
        </p>
        <p
          className="text-white text-3xl font-custom mb-6 text-center"
        >
          Comprometidos com Responsabilidade, Qualidade e Satisfação Garantida
        </p>
        <Button
          onClick={ () => history.push('/about') }
          variant="contained"
          size="medium"
          className="w-[150px] h-[40px]"
        >
          <p>
            Saiba mais...
          </p>
        </Button>
      </section>
    </ThemeProvider>
  );
}
