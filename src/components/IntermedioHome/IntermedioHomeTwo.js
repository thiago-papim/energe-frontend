/* eslint-disable max-len */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ThemeProvider, Typography, createTheme } from '@mui/material';
import imgQuemSomos from '../../imagens/quem-somos.jpg';

export default function IntermedioHomeTwo() {
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
        className="flex flex-col justify-center items-center my-10"
      >
        <p
          className="text-5xl font-custom mb-10 text-center"
        >
          Quem Somos?
        </p>
        <div className="flex w-[80%] justify-center items-center">
          <div className="mr-10">
            <Typography variant="h6" gutterBottom className="text-justify">
              Atuando desde 1998 sob registro no CREA numero 0616596, somos uma empresa especializada em engenharia e manutenção elétrica industrial, tendo relacionamento com mais de mil e duzentos clientes em todo o Brasil.
            </Typography>
            <Typography variant="h6" gutterBottom className="text-justify">
              Prestamos serviços especializados em projetos elétricos, NR10, laudos, pára-raios, cabines primárias,termografias, painéis de distribuição, SEP e instalações elétricas industriais.
            </Typography>
            <Typography variant="h6" gutterBottom className="text-justify">
              Com o intuito de divulgação de nossa linha de produtos e serviços apresentaremos a seguir detalhes de nossas especialidades técnicas.
            </Typography>
          </div>
          <img
            className="w-96 h-96"
            src={ imgQuemSomos }
            alt="quem Somos"
          />
        </div>
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
