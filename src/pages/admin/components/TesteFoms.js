/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
import { TextField, Radio, RadioGroup, FormControlLabel, TextareaAutosize, Button, styled, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useState } from 'react';

const perguntas = [
  'Condição de interligação da estrutura metálica à estrutura de captação',
  'Condição de interligação da estrutura metálica à estrutura de captação',
  'Condição de Dispositivos de Proteção Contra Surtos',
  'Condição dos conectores de interligação',
  'Condição das caixas de aterramento',
  'Condição dos isoladores de sustentação',
  'Resultado de resistência ôhmica de continuidade abaixo de 0,2 Ohms quando aterrado em estrutura metálica',
  'Resultado de resistência ôhmica de aterramento abaixo de 10 Ohms',
];

const opcoesResposta = ['conforme', 'não conforme', 'não aplicável'];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function FormularioDinamico() {
  const [formularios, setFormularios] = useState([
  ]);

  useEffect(() => {
    console.log(formularios);
  }, [formularios]);

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
        respostas: Array(8).fill('conforme'),
        obs: '',
        edit: true,
      },
    ]);
    console.log(formularios);
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

  const removerImagem = (indexF, indexI) => {
    const novosFormularios = [...formularios];
    novosFormularios[indexF].imagensUrl.splice(indexI, 1);
    novosFormularios[indexF].imagens.splice(indexI, 1);
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

  return (
    <div className="flex flex-col items-center mt-4">
      {formularios.map((formulario, index) => (
        <div key={ index } className="flex flex-col border-2 p-6 my-4 items-center">
          {
            !formulario.edit ? (
              // NÃO EDITAVEL
              <div className="flex flex-col items-center">
                <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '18px', fontWeight: 'bold' } }>
                  {`Ponto ${index + 1}`}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom style={ { fontSize: '15px', fontWeight: 'bold' } }>
                  {`Nome: ${formulario.nome}`}
                </Typography>
                <div className="flex">
                  { formulario.imagensUrl.map((e, i) => (
                    <img
                      key={ i }
                      src={ e.imageUrl }
                      alt={ `Imagem ${i}` }
                      className="w-[150px] h-[150px]"
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
                </div>
              </div>
            ) : (
              // EDITAVEL
              <div className="flex flex-col items-center">
                <h2 className="mb-2">
                  Ponto
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
                <div className="flex flex-col items-center">
                  <div className="flex justify-center">
                    {/* imagens */}
                    { formulario.imagensUrl.map((e, i) => (
                      <div key={ i } className="flex flex-col">
                        <img
                          src={ e.imageUrl }
                          alt={ `Imagem ${i}` }
                          className="w-[150px] h-[150px]"
                        />
                        <Button
                          className="w-1/2 m-2"
                          variant="contained"
                          onClick={ () => removerImagem(index, i) }
                        >
                          REMOVER
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onChange={ (e) => adicionarImagem(index, e.target.files) }
                    disabled={ formulario.imagens.length > 2 }
                    type="file"
                    accept="image/*"
                    multiple
                    className="my-4"
                    component="label"
                    variant="contained"
                    startIcon={ <CloudUploadIcon /> }
                  >
                    Adicionar Imagem
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </div>
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
                {formulario.respostas.some((e) => e !== 'conforme') ? (
                  <TextareaAutosize
                    onChange={ (e) => editarObs(index, e.target.value) }
                    value={ formulario.obs }
                    aria-label="minimum height"
                    minRows={ 1 }
                    placeholder="  Diagnóstico"
                    className="bg-slate-200 rounded-xl w-full border-2 border-gray-500 p-2"
                  />
                ) : '' }
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
            className="w-1/2"
            variant="contained"
            onClick={ () => removerFormulario(index) }
          >
            Remover Ponto
          </Button>
          {
            !formulario.edit ? (
              <Button
                className="w-1/2"
                variant="contained"
                onClick={ () => editPonto(index) }
              >
                Editar Ponto
              </Button>
            ) : ''
          }
        </div>
      ))}
      <Button
        variant="contained"
        onClick={ adicionarFormulario }
        disabled={ formularios.some((e) => e.edit === true) }
      >
        Adicionar Ponto
      </Button>
    </div>
  );
}

export default FormularioDinamico;
