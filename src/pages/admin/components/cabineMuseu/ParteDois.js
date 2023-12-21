/* eslint-disable max-len */
import { TextField } from '@mui/material';
import React from 'react';

const parteUm = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIOS EM DISJUNTOR DE MÉDIA TENSÃO CLASSE 3,8KV A 35KV.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.disjuntor.marca }
      name="marca"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Marca"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'disjuntor') }
    />
    <TextField
      value={ cabineMuseu.disjuntor.ruptura }
      type="number"
      name="ruptura"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Ruptura"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'disjuntor') }
    />
    <TextField
      value={ cabineMuseu.disjuntor.tensao }
      type="number"
      name="tensao"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Tensão de Operação KV"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'disjuntor') }
    />
    <TextField
      value={ cabineMuseu.disjuntor.meioDeExtincao }
      name="meioDeExtincao"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Meio de extinção"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'disjuntor') }
    />
    <TextField
      value={ cabineMuseu.disjuntor.identificacao }
      type="number"
      name="identificacao"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Identificação"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'disjuntor') }
    />
  </div>,
  };
};

const parteDois = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RESISTÊNCIA DE ISOLAÇÃO PARA DISJUNTORES CLASSE 3,8KV A 35KV. EQUIPAMENTO UTILIZADO: MEGÔMETRO ELETRÔNICO TENSÃO 5KV – MODELO MG3120.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.mg3120d.ffr }
      type="number"
      name="ffr"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="FF-R"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120d') }
    />
    <TextField
      value={ cabineMuseu.mg3120d.ffs }
      type="number"
      name="ffs"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="FF-S"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120d') }
    />
    <TextField
      value={ cabineMuseu.mg3120d.fft }
      type="number"
      name="fft"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="FF-T"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120d') }
    />
    <TextField
      value={ cabineMuseu.mg3120d.fmr }
      type="number"
      name="fmr"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="FM-R"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120d') }
    />
    <TextField
      value={ cabineMuseu.mg3120d.fms }
      type="number"
      name="fms"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="FM-S"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120d') }
    />
    <TextField
      value={ cabineMuseu.mg3120d.fmt }
      type="number"
      name="fmt"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="FM-T"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'mg3120d') }
    />
  </div>,
  };
};

const parteTres = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RESISTÊNCIA DE CONTATO PARA DISJUNTORES CLASSE 3,8KV A 35KV. EQUIPAMENTO UTILIZADO: MICROHMÍMETRO 10A – MODELO MICROHM 10i.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.michohm.r }
      type="number"
      name="r"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="R"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'michohm') }
    />
    <TextField
      value={ cabineMuseu.michohm.s }
      type="number"
      name="s"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="S"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'michohm') }
    />
    <TextField
      value={ cabineMuseu.michohm.t }
      type="number"
      name="t"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="T"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'michohm') }
    />
  </div>,
  };
};

export { parteUm, parteDois, parteTres };
