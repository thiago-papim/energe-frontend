import React from 'react';
import { Typography } from '@mui/material';
import { facebookIcon } from '../../imagens/iconSvg/facebookSvg';
import { whatsappIcon } from '../../imagens/iconSvg/whatsappSvg';
import { instagramIcon } from '../../imagens/iconSvg/instagramSgv';
import { relogioIcon } from '../../imagens/iconSvg/relogioSvg';

export default function Footer() {
  return (
    <div className="min-h-[200px] bg-[#000]">
      <div className="flex items-center justify-center pt-3">
        { facebookIcon }
        { instagramIcon }
        { whatsappIcon }
      </div>
      <div className="flex justify-center mt-4">
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className="mx-2 teste"
          style={ { color: '#9698a0' } }
        >
          Quem somos
        </Typography>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className="mx-2"
          style={ { color: '#9698a0' } }
        >
          Serviços
        </Typography>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className="mx-2"
          style={ { color: '#9698a0' } }
        >
          Contato
        </Typography>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className="mx-2"
          style={ { color: '#9698a0' } }
        >
          Voltar ao início
        </Typography>
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
      <div>
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
