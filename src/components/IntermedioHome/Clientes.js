/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { arrImagensClientes } from '../../imagens/clientes/ClientesImage';

export default function Clientes() {
  return (
    <div
      className="flex flex-col justify-center items-center w-full
      border-b-2 shadow-md pb-4"
    >
      {' '}
      <p
        className="text-3xl sm:text-3xl md:text-4xl
        lg:text-5xl font-custom text-center mb-4"
      >
        NOSSOS PRINCIPAIS CLIENTES
      </p>
      <div className="flex flex-wrap w-[90%] justify-center items-center min-h-[200px]">
        {arrImagensClientes.map((imagem, i) => (
          <img
            className="w-20 h-20 m-2 hover:scale-125
            transform transition-transform"
            alt="teste"
            src={ imagem }
            key={ i }
          />
        ))}
      </div>

    </div>
  );
}
