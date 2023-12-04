/* eslint-disable no-magic-numbers */
import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function MobileMenu() {
  const history = useHistory();
  const pathLocal = history.location.pathname;
  const [state, setState] = React.useState({
    right: false,
  });

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
    { name: 'Home',
      icon: <HomeIcon />,
      path: '/' },
    {
      name: 'Quem Somos',
      nameId: 'quemsomos',
      icon: <BusinessIcon />,
      path: '/about',
    },
    {
      name: 'Serviços',
      nameId: 'servicos',
      icon: <CellTowerOutlinedIcon />,
      path: '/services',
    },
    {
      name: 'Contato',
      nameId: 'contato',
      icon: <ContactPhoneOutlinedIcon />,
      path: '/contact',
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={ { width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 } }
      role="presentation"
      onClick={ toggleDrawer(anchor, false) }
      onKeyDown={ toggleDrawer(anchor, false) }
    >
      <List>
        {mapMenu.map((text) => (
          <ListItem
            key={ text.name }
            disablePadding
            onClick={ () => {
              if (pathLocal === '/login') {
                history.push('/');
              }
              scrollToSection(text.nameId);
            } }
          >
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={ text.name } />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider style={ { background: 'gray' } } />
      <List>
        {['Login'].map((text) => (
          <ListItem
            key={ text }
            disablePadding
            onClick={ () => history.push('/login') }
          >
            <ListItemButton>
              <ListItemIcon>
                <LoginOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={ text } />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="lg:hidden">
      <React.Fragment key="right">
        <Button onClick={ toggleDrawer('right', true) }>
          <MenuIcon
            style={ { color: 'black', fontSize: '50px' } }
          />
        </Button>
        <SwipeableDrawer
          anchor="right"
          open={ state.right }
          onClose={ toggleDrawer('right', false) }
          onOpen={ toggleDrawer('right', true) }
        >
          {list('right')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
