/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { Divider, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { facebookIcon } from '../../imagens/iconSvg/facebookSvg';
import { whatsappIcon } from '../../imagens/iconSvg/whatsappSvg';
import { instagramIcon } from '../../imagens/iconSvg/instagramSgv';
import { relogioIcon } from '../../imagens/iconSvg/relogioSvg';

export default function Footer() {
  const history = useHistory();
  const pathLocal = history.location.pathname;

  const scrollToSection = (sectionId) => {
    if (sectionId === '/contato') {
      history.push('/contato');
    } else if (pathLocal === '/contato') {
      history.push('/');
    }
    const section = document.getElementById(sectionId);
    const headerHeight = document.getElementById('inicio').offsetHeight;

    if (section) {
      const offset = headerHeight;
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

  return (
    <div className="min-h-[200px] bg-[#000]">
      <div className="flex items-center justify-center pt-3">
        <button
          onClick={ () => {
            window.open('https://www.facebook.com/people/Energe-Engenharia/100075901756053/');
          } }
        >
          { facebookIcon }
        </button>
        <button
          onClick={ () => {
            window.open('https://www.instagram.com/energeengenharia/');
          } }
        >
          { instagramIcon }
        </button>
        <button
          onClick={ () => window.open(
            'https://api.whatsapp.com/send?phone=5511975250813&text=Ola',
          ) }
        >
          { whatsappIcon }
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={ () => scrollToSection('quemsomos') }
        >
          <p
            className="text-sm md:text-xl text-center mb-4 text-[#9698a0]
            mx-2 transition duration-300 hover:scale-105"
          >
            QUEM SOMOS
          </p>
        </button>
        <button
          onClick={ () => scrollToSection('servicos') }
        >
          <p
            className="text-sm md:text-xl text-center mb-4 text-[#9698a0]
            mx-2 transition duration-300 hover:scale-105"
          >
            SERVIÇOS
          </p>
        </button>
        <button
          onClick={ () => scrollToSection('/contato') }
        >
          <p
            className="text-sm md:text-xl text-center mb-4 text-[#9698a0]
            mx-2 transition duration-300 hover:scale-105"
          >
            CONTATO
          </p>
        </button>
        <button
          onClick={ () => scrollToSection('home') }
        >
          <p
            className="text-sm md:text-xl text-center mb-4 text-[#9698a0]
            mx-2 transition duration-300 hover:scale-105"
          >
            VOLTAR AO INÍCIO
          </p>
        </button>
      </div>
      <Divider className="bg-white" light />
      <div
        className="flex
      items-start justify-center p-3"
      >
        <div className="flex flex-col mr-4">
          <Typography
            variant="title"
            gutterBottom
            className="text-center"
            style={ { color: '#9698a0' } }
          >
            Fale Conosco
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className="text-center"
            style={ { color: '#9698a0' } }
          >
            De Segunda a Sexta das 08:00 ás 17:00
          </Typography>
          <div
            className="flex-col sm:flex-row flex justify-between"
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-center"
              style={ { color: '#9698a0' } }
            >
              (11) 4361-1703
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-center"
              style={ { color: '#9698a0' } }
            />
            <Typography
              variant="subtitle2"
              gutterBottom
              className="text-center"
              style={ { color: '#9698a0' } }
            >
              (11) 4173-1464
            </Typography>
          </div>
        </div>
        <Divider
          orientation="vertical"
          variant="middle"
          className="bg-white m-2"
          flexItem
        />
        <div className="flex flex-col justify-center items-center mr-4">
          <Typography
            variant="title"
            gutterBottom
            className="text-center"
            style={ { color: '#9698a0' } }
          >
            Atendimendo de Emergência
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className="text-center"
            style={ { color: '#9698a0' } }
          >
            (11) 9.8407-0434
          </Typography>
          { relogioIcon }
        </div>
      </div>
      <Divider className="bg-white" light />
      <div className="flex justify-center items-center">
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className="mx-2 text-center"
          style={ { color: '#9698a0' } }
        >
          ENERGE © 2023 - TODOS OS DIREITOS RESERVADOS
        </Typography>
      </div>
    </div>
  );
}
