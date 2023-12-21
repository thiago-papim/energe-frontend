/* eslint-disable max-len */
import { TextField } from '@mui/material';
import React from 'react';

const parteUm = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIOS EM TRANSFORMADOR DE POTÊNCIA COM ISOLAMENTO EM EPOX OU ÓLEO MINERAL',
    description:
  <div>
    <TextField
      value={ cabineMuseu.transformador.marca }
      name="marca"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Marca"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'transformador') }
    />
    <TextField
      value={ cabineMuseu.transformador.litros }
      type="number"
      name="litros"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Litros"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'transformador') }
    />
    <TextField
      value={ cabineMuseu.transformador.tensaoPrimaria }
      name="tensaoPrimaria"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Tensão Primária"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'transformador') }
    />
    <TextField
      value={ cabineMuseu.transformador.tensaoSecundaria }
      name="tensaoSecundaria"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Tensão Secundária"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'transformador') }
    />
    <TextField
      value={ cabineMuseu.transformador.identificacao }
      type="number"
      name="identificacao"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Identificação"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'transformador') }
    />
    <TextField
      value={ cabineMuseu.transformador.potencia }
      type="number"
      name="potencia"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Potência"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'transformador') }
    />
  </div>,
  };
};

const parteDois = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIOS EM ÓLEO MINERAL ISOLANTE TIPO PARAFÍNICO OU NAFTÉNICO',
    description:
  <div>
    <TextField
      value={ cabineMuseu.oleo.rigidez }
      type="number"
      name="rigidez"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Rigidez Dielétrica"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'oleo') }
    />
    <TextField
      value={ cabineMuseu.oleo.acidez }
      type="number"
      name="acidez"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Acidez"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'oleo') }
    />
  </div>,
  };
};

const parteTres = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RELAÇÃO DE TRANSFORMAÇÃO PARA TRANSFORMADORES CLASSE 3,8KV A 35KV. EQUIPAMENTO UTILIZADO: MEDIDOR DE RELAÇÃO DE TRANSFORMAÇÃO – MODELO TTR2000I.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.ttr2000.h1 }
      type="number"
      name="h1"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="H1"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'ttr2000') }
    />
    <TextField
      value={ cabineMuseu.ttr2000.h2 }
      type="number"
      name="h2"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="H2"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'ttr2000') }
    />
    <TextField
      value={ cabineMuseu.ttr2000.h3 }
      type="number"
      name="h3"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="H3"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'ttr2000') }
    />
  </div>,
  };
};

const parteQuatro = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RESISTÊNCIA DE ISOLAÇÃO PARA TRANSFORMADORES CLASSE 3,8KV A 35KV. EQUIPAMENTO UTILIZADO: MEGÔMETRO ELETRÔNICO TENSÃO 5KV – MODELO MG3120.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.mg3120t.atbt }
      type="number"
      name="atbt"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/BT"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120t') }
    />
    <TextField
      value={ cabineMuseu.mg3120t.atm }
      type="number"
      name="atm"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120t') }
    />
    <TextField
      value={ cabineMuseu.mg3120t.btm }
      type="number"
      name="btm"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="BT/M"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120t') }
    />
  </div>,
  };
};

export { parteUm, parteDois, parteTres, parteQuatro };
