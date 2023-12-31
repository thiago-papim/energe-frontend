import React from 'react';

import { Button, ButtonGroup, ThemeProvider, createTheme } from '@mui/material';
import { useHistory } from 'react-router-dom/';
import ArticleIcon from '@mui/icons-material/Article';
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AddIcon from '@mui/icons-material/Add';
import { blue, lime, red } from '@mui/material/colors';
import logo from '../../../imagens/logo-novo.png';
import MobileMenu from './MobileMenuAdmin';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: lime,
    info: red,
    btnColor: {
      main: '#8792ad',
    },
  },
});

export default function HeaderAdmin() {
  const history = useHistory();
  const pathLocal = history.location.pathname;
  const changeColor = (local) => {
    return pathLocal === local ? 'info' : 'btnColor';
  };
  const mapMenu = [
    {
      name: 'novo relatorio',
      icon: <ArticleIcon />,
      path: '/admin',
      color: changeColor('/admin') },
    {
      name: 'revisar',
      icon: <PreviewIcon />,
      path: '/review',
      color: changeColor('/review'),
    },
    {
      name: 'enviar',
      icon: <SendIcon />,
      path: '/send',
      color: changeColor('/send'),
    },
    {
      name: 'Gerenciar Empresas',
      icon: <AddIcon />,
      path: '/empresas',
      color: changeColor('/empresas'),
    },
    {
      name: 'Sair',
      icon: <LoginOutlinedIcon />,
      path: '/login',
      color: changeColor('/login'),
    },
  ];
  return (
    <ThemeProvider theme={ theme }>
      <header
        className="flex justify-between items-center mx-auto
        border-b-2 rounded-lg shadow-md bg-[#fafafa]"
      >
        <button
          className="flex"
          onClick={ () => history.push('/') }
        >
          <img
            className="lg:w-80 w-52 m-2"
            src={ logo }
            alt="logo"
          />
        </button>
        <div
          className="flex h-6 mr-[%] justify-center items-center"
        >
          <MobileMenu />
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            color="btnColor"
          >
            { mapMenu.map((e, i) => {
              return (
                <div
                  key={ i }
                  className="lg:flex hidden
                transform transition-transform hover:scale-105"
                >
                  <Button
                    className="border-t-8"
                    color={ e.color }
                    onClick={ () => {
                      history.push(e.path);
                      if (e.name === 'Sair') {
                        localStorage.setItem('token', '');
                      }
                    } }
                  >
                    {e.icon}
                    <p
                      className="mx-2 text-[12px]"
                    >
                      {e.name}
                    </p>
                  </Button>
                </div>
              );
            })}
          </ButtonGroup>
        </div>
      </header>
    </ThemeProvider>
  );
}
