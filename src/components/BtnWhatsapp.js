/* eslint-disable max-len */
import React from 'react';
import whatsapp from '../imagens/whatsapp.png';

class BtnWhatspp extends React.Component {
  render() {
    return (
      <button
        id="whats"
        className="fixed w-[60px] bottom-3 right-3 lg:hidden"
        onClick={ () => window.open(
          'https://api.whatsapp.com/send?phone=5511975250813&text=Ola',
        ) }
      >
        <img
          src={ whatsapp }
          alt="btnWhats"
        />
      </button>
    );
  }
}

export default BtnWhatspp;
