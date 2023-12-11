import React from 'react';

import { Button, ButtonGroup, ThemeProvider, createTheme } from '@mui/material';
import { useHistory } from 'react-router-dom/';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import { blue, lime, red } from '@mui/material/colors';
import logo from '../../imagens/logo-novo.png';
import MobileMenu from './MobileMenu';

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

export default function Header() {
  const history = useHistory();
  const pathLocal = history.location.pathname;
  const changeColor = (local) => {
    return pathLocal === local ? 'info' : 'btnColor';
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const headerHeight = document.getElementById('inicio').offsetHeight; // ajuste 'inicio' para o ID correto do seu cabeçalho

    if (section) {
      const offset = headerHeight; // ajuste conforme necessário
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const mapMenu = [
    {
      name: 'home',
      nameId: 'home',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      name: 'quem somos',
      icon: <BusinessIcon />,
      nameId: 'quemsomos',
      path: '/',
      color: changeColor('/about'),
    },
    {
      name: 'serviços',
      icon: <CellTowerOutlinedIcon />,
      nameId: 'servicos',
      path: '/',
      color: changeColor('/services'),
    },
    {
      name: 'contato',
      icon: <ContactPhoneOutlinedIcon />,
      path: '/contato',
      color: changeColor('/contato'),
    },
    {
      name: 'clientes',
      icon: <GroupsIcon />,
      path: '/clientes',
      color: changeColor('/clientes'),
    },
    {
      name: 'login',
      icon: <LoginOutlinedIcon />,
      path: '/login',
      color: changeColor('/login'),
    },
  ];
  return (
    <ThemeProvider theme={ theme }>
      <header
        id="inicio"
        className="flex justify-between items-center mx-auto
        border-b-2 shadow-md bg-[#fafafa]"
        style={ { position: 'fixed', width: '100%', top: 0, zIndex: 1000 } }
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
          className="flex h-6 mr justify-center items-center"
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
                      if (e.path === '/login' || pathLocal === '/contato'
                       || e.path === '/contato' || pathLocal === '/login'
                       || e.path === '/clientes' || pathLocal === '/clientes') {
                        history.push(e.path);
                      } else if (pathLocal.includes('empresas')) {
                        history.push('/');
                      } else {
                        scrollToSection(e.nameId);
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
