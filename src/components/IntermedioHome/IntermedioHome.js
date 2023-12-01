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
        className="flex flex-col justify-center items-center w-full lg:h-[600px]
        h-[450px] mx-auto
          bg-[url('./imagens/torres.jpg')] bg-cover bg-center"
      >
        <p
          className="text-white xl:text-5xl md:text-4xl text-3xl
           font-custom mb-10 text-center"
        >
          LIDERANÇA EM SOLUÇÕES DE ENGENHARIA ELÉTRICA
        </p>
        <p
          className="text-white text-xl lg:text-3xl font-custom mb-6 text-center"
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
