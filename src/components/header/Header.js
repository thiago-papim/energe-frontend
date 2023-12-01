import React from 'react';

import { Button, ButtonGroup, ThemeProvider, createTheme } from '@mui/material';
import { useHistory } from 'react-router-dom/';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
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
  const mapMenu = [
    { name: 'home', icon: <HomeIcon />, path: '/', color: changeColor('/') },
    {
      name: 'quem somos',
      icon: <BusinessIcon />,
      path: '/about',
      color: changeColor('/about'),
    },
    {
      name: 'serviços',
      icon: <CellTowerOutlinedIcon />,
      path: '/services',
      color: changeColor('/services'),
    },
    {
      name: 'contato',
      icon: <ContactPhoneOutlinedIcon />,
      path: '/contact',
      color: changeColor('/contact'),
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
        className="flex justify-between items-center mx-auto
        border-b-2 shadow-md bg-[#fafafa]"
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
                    onClick={ () => history.push(e.path) }
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
