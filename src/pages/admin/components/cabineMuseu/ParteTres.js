/* eslint-disable max-len */
import { TextField } from '@mui/material';
import React from 'react';

const parteUm = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIOS DE RESISTÊNCIA DE ISOLAÇÃO E ATERRAMENTO EM SUBESTAÇÃO PRIMÁRIA OU DISTRIBUIÇÃO PADRÃO BRASILEIRO NBR-14039 ABNT, CLASSE 3,8KV A 35KV.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.substacao.numero }
      type="number"
      name="numero"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Substação Nº"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'substacao') }
    />
    <TextField
      value={ cabineMuseu.substacao.referencia }
      name="referencia"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Referência"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'substacao') }
    />
    <TextField
      value={ cabineMuseu.disjuntor.classe }
      name="classe"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Classe de tensão em KV"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'substacao') }
    />
  </div>,
  };
};

const parteDois = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RESISTÊNCIA DE ISOLAÇÃO EM CIRCUITO ABERTO SEM TRANSFORMADORES. EQUIPAMENTO UTILIZADO: MEGÔMETRO ELETRÔNICO TENSÃO 5KV – MODELO MG3120.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.circuitoAberto.atmr }
      type="number"
      name="atmr"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M-R"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'circuitoAberto') }
    />
    <TextField
      value={ cabineMuseu.circuitoAberto.atms }
      type="number"
      name="atms"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M-S"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'circuitoAberto') }
    />
    <TextField
      value={ cabineMuseu.circuitoAberto.atmt }
      type="number"
      name="atmt"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M-T"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'circuitoAberto') }
    />
  </div>,
  };
};

const parteTres = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RESISTÊNCIA DE ISOLAÇÃO EM CABOS UNIPOLARES OU BUCHAS DE MÉDIA TENSÃO. EQUIPAMENTO UTILIZADO: MEGÔMETRO ELETRÔNICO TENSÃO 5KV – MODELO MG3120.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.cabosUnipolares.atmr }
      type="number"
      name="atmr"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M-R"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'cabosUnipolares') }
    />
    <TextField
      value={ cabineMuseu.cabosUnipolares.atms }
      type="number"
      name="atms"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M-S"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'cabosUnipolares') }
    />
    <TextField
      value={ cabineMuseu.cabosUnipolares.atmt }
      type="number"
      name="atmt"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="AT/M-T"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'cabosUnipolares') }
    />
  </div>,
  };
};

const parteQuatro = (handleGeneric, cabineMuseu) => {
  return {
    label: 'ENSAIO DE RESISTÊNCIA DE ATERRAMENTO EM SUBESTAÇÃO DE MÉDIA TENSÃO. EQUIPAMENTO UTILIZADO: TERRÔMETRO ELETRÔNICO – MODELO TMD20KW.',
    description:
  <div>
    <TextField
      value={ cabineMuseu.aterramento.barra }
      name="barra"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Barra"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'aterramento') }
    />
    <TextField
      value={ cabineMuseu.aterramento.pararaio }
      name="pararaio"
      className="mb-3 w-[250px]"
      id="outlined-basic"
      label="Pára-Raios"
      variant="outlined"
      onChange={ (e) => handleGeneric(e, 'aterramento') }
    />
  </div>,
  };
};

export { parteUm, parteDois, parteTres, parteQuatro };
