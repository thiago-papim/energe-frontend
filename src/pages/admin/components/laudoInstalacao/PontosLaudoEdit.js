/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import { TextField,
  Radio, RadioGroup,
  FormControlLabel,
  TextareaAutosize, Button, Typography, FormControl, FormLabel, InputLabel, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../../context/AppContext';

const perguntas = [
  'Condições de instalação dos condutores isolados, cabos unipolares e cabos multipolares',
  'Existência de proteção contra sobrecorrentes e coordenação com os condutores de saída',
  'Partes vivas estão isoladas e/ou protegidas por barreiras ou invólucros',
  'Sistema de aterramento interligando as partes metálicas não destinadas a condução de corrente',
  'Cores ou identificação de cabos Fase/Neutro e Terra',
  'Não existência de fios e cabos expostos sem a devida proteção mecânica',
  'Condição e distanciamento dos barramentos de distribuição',
  'Quadros de distribuição providos de identificação e sinalização do lado externo, de forma legível e não facilmente removível',
  'Quadros, circuitos e linhas dos sistemas de segurança contra incêndio independentes dos circuitos comuns',
];

const opcoesResposta = ['conforme', 'não conforme', 'não aplicável'];

export default function PontosLaudoEdit({ disabledButton, pontos }) {
  const {
    laudoInstalacaoEdit, setLaudoInstalacaoEdit,
  } = useContext(AppContext);
  const [imagensDelete, setImagensDelete] = useState([]);
  const [laudoDelete, setLaudoDelete] = useState([]);
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    const laudos = { ...laudoInstalacaoEdit };
    laudos.pontos = formularios;
    laudos.imagensDelete = imagensDelete;
    laudos.laudoDelete = laudoDelete;

    setLaudoInstalacaoEdit(laudos);
  }, [formularios]);

  useEffect(() => {
    if (pontos) {
      setFormularios(pontos.map((ponto) => {
        return {
          id: ponto.id,
          nome: ponto.nome,
          obs: ponto.obs,
          risco: ponto.risco,
          respostas: ponto.respostas.split(','),
          imagensUrl: ponto.imagesPontoLaudo?.map((image) => image),
          imagens: [],
        };
      }));
    }
  }, pontos);

  const adicionarFormulario = () => {
    const formulariosEdit = formularios.map((e) => {
      return {
        ...e,
        edit: false,
      };
    });
    setFormularios([
      ...formulariosEdit,
      {
        nome: '',
        imagens: [],
        imagensUrl: [],
        respostas: Array(9).fill('conforme'),
        obs: '',
        risco: 'Baixo',
        edit: true,
        novo: true,
      },
    ]);
  };

  const editarNome = (index, nome) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].nome = nome;
    setFormularios(novosFormularios);
  };

  const editarObs = (index, obs) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].obs = obs;
    setFormularios(novosFormularios);
  };

  const editarResposta = (index, perguntaIndex, resposta) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].respostas[perguntaIndex] = resposta;
    setFormularios(novosFormularios);
  };

  const removerFormulario = (index) => {
    const novosFormularios = [...formularios];
    novosFormularios.splice(index, 1);
    setFormularios(novosFormularios);
    if (formularios[index].id) {
      setLaudoDelete([...laudoDelete, formularios[index].id]);
    }
  };

  const editPonto = (index) => {
    const novosFormularios = formularios.map((e, i) => {
      if (i === index) {
        return {
          ...e,
          edit: true,
        };
      }
      return {
        ...e,
        edit: false,
      };
    });
    setFormularios(novosFormularios);
  };

  const concluirFormulario = () => {
    const novosFormularios = formularios.map((e) => {
      return {
        ...e,
        edit: false,
      };
    });
    setFormularios(novosFormularios);
  };

  const removerImagem = (id, indexFormulario, indexImagem) => {
    if (id) {
      setImagensDelete([...imagensDelete, id]);
    }
    const newFormulario = {
      ...formularios[indexFormulario],
      imagensUrl: formularios[indexFormulario].imagensUrl?.filter((imagem, i) => i !== indexImagem),
    };
    setFormularios(formularios.map((e, i) => {
      if (i === indexFormulario) {
        return newFormulario;
      }
      return e;
    }));
    document.getElementById('sendImage').value = '';
  };

  const editarRisco = (index, risco) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].risco = risco;
    setFormularios(novosFormularios);
  };

  const adicionarImagem = (index, imagem) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].imagens.push(imagem);
    for (let i = 0; i < imagem.length; i += 1) {
      const file = imagem[i];
      const imageUrl = URL.createObjectURL(file);
      if (novosFormularios[index].imagensUrl.length < 3) {
        novosFormularios[index].imagensUrl.push({ file, imageUrl });
      }
    }
    setFormularios(novosFormularios);
  };

  return (
    <div className={ `flex flex-col items-center mt-4 ${!disabledButton ? 'invisible' : ''}` }>
      {formularios.map((formulario, index) => (
        <div key={ index } className="flex flex-col border-2 p-6 my-4 items-center">
          {
            !formulario.edit ? (
              // NÃO EDITAVEL
              <div className="flex flex-col items-center">
                <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '18px', fontWeight: 'bold' } }>
                  {`Localização ${index + 1}`}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '15px', fontWeight: 'bold' } }>
                  {`Nome: ${formulario.nome}`}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '15px', fontWeight: 'bold' } }>
                  {`Risco: ${formulario.risco}`}
                </Typography>
                <div className="flex justify-center w-full">
                  { formulario.imagensUrl.map((e, i) => (
                    <img
                      key={ i }
                      src={ e.url ? `https://energe.s3.amazonaws.com/${e.url}` : e.imageUrl }
                      alt={ `Imagem ${i}` }
                      className="w-[150px] h-[150px] mx-2"
                    />
                  ))}
                </div>
                <div
                  className="my-2 flex flex-col"
                >
                  { perguntas.map((e, i) => (
                    <div key={ i } className="border-t-2 flex flex-col">
                      <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '12px', fontWeight: 'bold' } }>
                        {e}
                      </Typography>
                      <Typography variant="overline" display="block" gutterBottom>
                        {formulario.respostas[i]}
                      </Typography>
                    </div>
                  ))}
                  <div className="border-2 p-2">
                    <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '12px', fontWeight: 'bold' } }>
                      Diagnóstico:
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom>
                      {formulario.obs}
                    </Typography>
                  </div>
                </div>
              </div>
            ) : (
              // EDITAVEL
              <div className="flex flex-col items-center">
                <h2 className="mb-2">
                  Localização
                  {' '}
                  {index + 1}
                </h2>
                <TextField
                  className="my-2"
                  type="text"
                  value={ formulario.nome }
                  onChange={ (e) => editarNome(index, e.target.value) }
                  label="Nome"
                  variant="outlined"
                />
                <FormControl className="w-[250px] my-3">
                  <InputLabel id="demo-simple-select-label">Risco</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ formulario.risco }
                    label="Risco"
                    onChange={ (e) => editarRisco(index, e.target.value) }
                  >
                    <MenuItem value="Baixo">Baixo</MenuItem>
                    <MenuItem value="Médio">Médio</MenuItem>
                    <MenuItem value="Alto">Alto</MenuItem>
                  </Select>
                </FormControl>
                <div className="flex">
                  { formulario.imagensUrl.map((e, i) => (
                    <div
                      key={ i }
                    >
                      <img
                        src={ e.url ? `https://energe.s3.amazonaws.com/${e.url}` : e.imageUrl }
                        alt={ `Imagem ${i}` }
                        className="w-[150px] h-[150px] mx-2"
                      />
                      <Button
                        className="w-[90%] m-2"
                        variant="contained"
                        onClick={ () => removerImagem(e.id, index, i) }
                        disabled={ !formulario.nome.length }
                      >
                        remover
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  disabled={ formulario.imagensUrl.length > 2 }
                  className="my-4"
                  component="label"
                  variant="contained"
                  startIcon={ <CloudUploadIcon /> }
                >
                  Adicionar Imagem
                  <input
                    type="file"
                    id="sendImage"
                    accept=".jpg, .jpeg, .png"
                    style={ { display: 'none' } }
                    onChange={ (e) => adicionarImagem(index, e.target.files) }
                  />
                </Button>
                {perguntas.map((pergunta, perguntaIndex) => (
                  <div
                    className="flex flex-col items-center border-t-2"
                    key={ perguntaIndex }
                  >
                    <p>
                      {pergunta}

                    </p>
                    <RadioGroup
                      value={ formulario.respostas[perguntaIndex] }
                      row
                      onChange={ (e) => editarResposta(index, perguntaIndex, e.target.value) }
                    >
                      {opcoesResposta.map((opcao, opcaoIndex) => (
                        <FormControlLabel
                          key={ opcaoIndex }
                          value={ opcao }
                          control={ <Radio /> }
                          label={ opcao }
                        />
                      ))}
                    </RadioGroup>
                  </div>
                ))}
                <FormControl
                  className="rounded-xl w-full border-2 p-2"
                >
                  <FormLabel>Diagnóstico</FormLabel>
                  <TextareaAutosize
                    onChange={ (e) => editarObs(index, e.target.value) }
                    value={ formulario.obs }
                    aria-label="minimum height"
                    minRows={ 1 }
                    placeholder="  Escreva Aqui"
                    className="bg-gray-100 rounded-xl w-full border-2 border-gray-300 p-2"
                  />
                </FormControl>
                <Button
                  className="w-1/2 m-2"
                  variant="contained"
                  onClick={ () => concluirFormulario() }
                  disabled={ !formulario.nome.length }
                >
                  Concluir
                </Button>
              </div>
            )
          }
          <Button
            className="w-1/2 mb-2"
            variant="contained"
            onClick={ () => removerFormulario(index) }
          >
            Remover Localização
          </Button>
          {
            !formulario.edit ? (
              <Button
                className="w-1/2"
                variant="contained"
                onClick={ () => editPonto(index) }
              >
                Editar Localização
              </Button>
            ) : ''
          }
        </div>
      ))}
      <Button
        variant="contained"
        onClick={ adicionarFormulario }
        disabled={ formularios.some((e) => e.edit === true) || !disabledButton }
      >
        Adicionar Localização
      </Button>
    </div>
  );
}
