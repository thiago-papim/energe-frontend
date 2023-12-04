/* eslint-disable max-len */
import React from 'react';
// import { useHistory } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import imgQuemSomos from '../../imagens/quem-somos.jpg';

export default function IntermedioHomeTwo() {
  const theme = createTheme({
    palette: {
      btnColor: {
        main: '#8792ad',
      },
    },
    typography: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  });

  return (
    <ThemeProvider theme={ theme }>
      <section
        className="flex flex-col justify-center items-center my-3 border-b-2 shadow-md pb-4"
        id="quemsomos"
      >
        <p
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-custom text-center mb-4 border-b-2 border-black"
        >
          QUEM SOMOS
        </p>
        <div className="flex lg:flex-row flex-col w-[90%] justify-center items-center">
          <div className="flex flex-col justify-center items-center mb-3">
            <p
              className="w-[100%]
            lg:w-[90%]
            xl:w-[90%]
            text-md lg:text-xl text-left font-thin lg:pl-10"
            >
              Atuando desde 1998 sob registro no CREA numero 0616596, somos uma empresa especializada em engenharia e manutenção elétrica industrial, tendo relacionamento com mais de mil e duzentos clientes em todo o Brasil.
            </p>
            <p
              className="w-[100%]
            lg:w-[90%]
            xl:w-[90%]
            text-md lg:text-xl text-left font-thin lg:pl-10"
            >
              Prestamos serviços especializados em projetos elétricos, NR10, laudos, pára-raios, cabines primárias,termografias, painéis de distribuição, SEP e instalações elétricas industriais.
            </p>
            <p
              className="w-[100%]
            lg:w-[90%]
            xl:w-[90%]
            text-md lg:text-xl text-left font-thin lg:pl-10"
            >
              Com o intuito de divulgação de nossa linha de produtos e serviços apresentaremos a seguir detalhes de nossas especialidades técnicas.
            </p>
          </div>
          <img
            className="w-80 h-80"
            src={ imgQuemSomos }
            alt="quem Somos"
          />
        </div>
      </section>
    </ThemeProvider>
  );
}
