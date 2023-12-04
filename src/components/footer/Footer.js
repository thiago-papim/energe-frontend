/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { Typography } from '@mui/material';
import { facebookIcon } from '../../imagens/iconSvg/facebookSvg';
import { whatsappIcon } from '../../imagens/iconSvg/whatsappSvg';
import { instagramIcon } from '../../imagens/iconSvg/instagramSgv';
import { relogioIcon } from '../../imagens/iconSvg/relogioSvg';

export default function Footer() {
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
          onClick={ () => {
            window.open('');
          } }
        >
          { whatsappIcon }
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={ () => scrollToSection('quemsomos') }
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            className="mx-2 teste"
            style={ { color: '#9698a0' } }
          >
            Quem somos
          </Typography>
        </button>
        <button
          onClick={ () => scrollToSection('servicos') }
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            className="mx-2"
            style={ { color: '#9698a0' } }
          >
            Serviços
          </Typography>
        </button>
        <button
          onClick={ () => scrollToSection('contato') }
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            className="mx-2"
            style={ { color: '#9698a0' } }
          >
            Contato
          </Typography>
        </button>
        <button
          onClick={ () => scrollToSection('home') }
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            className="mx-2"
            style={ { color: '#9698a0' } }
          >
            Voltar ao início
          </Typography>
        </button>
      </div>
      <div
        className="flex
      items-center justify-center border-y-2 p-3 border-[#9698a0]"
      >
        <div className="flex flex-col mr-4">
          <Typography
            variant="subtitle2"
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
        </div>
        { relogioIcon }
      </div>
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
