/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
import {
  Box,
  Button, Divider, FormControl, FormControlLabel, FormLabel, InputLabel,
  MenuItem, Radio, RadioGroup, Select, TextareaAutosize, Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../../context/AppContext';

export default function PontosEnsaio({ disabledBtn }) {
  const { setEnsaioEquipamento, ensaioEquipamento } = useContext(AppContext);

  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    setEnsaioEquipamento((prev) => {
      return {
        ...prev,
        pontos: formularios,
      };
    });
  }, [formularios, setEnsaioEquipamento]);

  console.log(formularios);

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
        ladoDireito: '<16',
        ladoEsquerdo: '<16',
        obs: '',
        edit: true,
      },
    ]);
  };

  const concluirFormulario = () => {
    const formulariosConcluidos = formularios.map((e) => {
      return {
        ...e,
        edit: false,
      };
    });
    setFormularios([...formulariosConcluidos]);
  };

  const handleChangeLeft = (event, index) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].ladoEsquerdo = event.target.value;
    setFormularios(novosFormularios);
  };

  const handleChangeRight = (event, index) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].ladoDireito = event.target.value;
    setFormularios(novosFormularios);
  };

  const editarEquipamento = (index, equipamento) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].nome = equipamento;
    setFormularios(novosFormularios);
  };

  const editarObs = (index, obs) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].obs = obs;
    setFormularios(novosFormularios);
  };

  const editarFormulario = (index) => {
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

  const removerFormulario = (index) => {
    const novosFormularios = formularios.filter((e, i) => i !== index);
    setFormularios(novosFormularios);
  };

  const adicionarImagem = (index, file) => {
    const novosFormularios = [...formularios];
    const imageUrl = URL.createObjectURL(file[0]);
    novosFormularios[index].imgFile = file;
    novosFormularios[index].imgUrl = imageUrl;
    setFormularios(novosFormularios);
  };

  const removerImagem = (index) => {
    const novosFormularios = [...formularios];
    novosFormularios[index].imgUrl = null;
    novosFormularios[index].imgFile = null;
    setFormularios(novosFormularios);
  };

  return (
    <div className="mt-3">
      { formularios.map((formulario, index) => (
        // Não editável
        <div key={ index } className="flex flex-col w-[350px]">
          { !formulario.edit ? (
            <div
              className="p-3 my-3 border-2 border-gray-300 rounded-xl flex flex-col
            items-center"
            >
              <Typography>{formulario.nome}</Typography>
              <Typography>{ `Lado Esquerdo: ${formulario.ladoEsquerdo}`}</Typography>
              <Typography>{ `Lado Direito: ${formulario.ladoDireito}`}</Typography>
              { formulario.obs ? (
                <Typography>{ `Obs: ${formulario.obs}`}</Typography>
              ) : ''}
              { formulario.imgUrl ? (
                <img
                  src={ formulario.imgUrl }
                  alt={ `Imagem ${index}` }
                  className="w-[250px] h-[150px] mx-2 mb-2"
                />
              ) : ''}
              <div className="flex justify-center items-center">
                <Button
                  className="mx-2"
                  variant="contained"
                  disabled={ formularios.filter((e) => e.edit === true).length > 0 }
                  onClick={ () => editarFormulario(index) }
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  disabled={ formularios.filter((e) => e.edit === true).length > 0 }
                  onClick={ () => removerFormulario(index) }
                >
                  Remover
                </Button>
              </div>
            </div>
          ) : (
            // Editável
            <div
              className="flex flex-col w-full
            items-center border-2 rounded-xl border-gray-300"
            >
              <FormControl className="w-[300px] my-3">
                <InputLabel id="demo-simple-select-label">Equipamento</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ formulario.nome }
                  label="Equipamento"
                  onChange={ (e) => editarEquipamento(index, e.target.value) }
                >
                  <MenuItem value="Luva">Luva</MenuItem>
                  <MenuItem value="Tapete">Tapete</MenuItem>
                  <MenuItem value="Bastão">Bastão</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center w-full">
                <div
                  className="border-r-2 border-gray-400 p-1 w-[48%]
                text-center"
                >
                  <FormControl className="flex justify-center items-center">
                    <FormLabel>Lado Esquerdo</FormLabel>
                    <RadioGroup
                      value={ formulario.ladoEsquerdo }
                      onChange={ (e) => handleChangeLeft(e, index) }
                      name="radio-buttons"
                    >
                      <FormControlLabel
                        value="<16"
                        control={ <Radio /> }
                        label="< 16"
                      />
                      <FormControlLabel
                        value=">16"
                        control={ <Radio /> }
                        label="> 16"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div
                  className="border-gray-400 p-1 w-[48%]
                text-center"
                >
                  <FormControl className="flex justify-center items-center">
                    <FormLabel>Lado Direito</FormLabel>
                    <RadioGroup
                      value={ formulario.ladoDireito }
                      onChange={ (e) => handleChangeRight(e, index) }
                      name="radio-buttons"
                    >
                      <FormControlLabel
                        value="<16"
                        control={ <Radio /> }
                        label="< 16"
                      />
                      <FormControlLabel
                        value=">16"
                        control={ <Radio /> }
                        label="> 16"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap justify-center">
                {/* imagem */}
                { formulario.imgUrl ? (
                  <div key={ index } className="flex flex-col items-center">
                    <img
                      src={ formulario.imgUrl }
                      alt={ `Imagem ${index}` }
                      className="w-[250px] h-[150px] mx-2"
                    />
                    <Button
                      className="w-2/3 m-2"
                      variant="contained"
                      onClick={ () => removerImagem(index) }
                    >
                      REMOVER IMAGEM
                    </Button>
                  </div>
                ) : ''}
                {/* ))} */}
              </div>
              { !formulario.imgUrl ? (
                <Button
                  disabled={ formulario.imgUrl?.length === 2 }
                  className="my-4"
                  component="label"
                  variant="contained"
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
              ) : ''}
              <Button
                className="my-3"
                variant="contained"
                disabled={ !formulario.nome || !formulario.imgUrl }
                onClick={ concluirFormulario }
              >
                Concluir Equipamento
              </Button>
              <Button
                className="mb-2"
                variant="contained"
                onClick={ () => removerFormulario(index) }
              >
                Remover
              </Button>
              { formulario.ladoDireito === '>16' || formulario.ladoEsquerdo === '>16' ? (
                <div>
                  <FormControl
                    className="rounded-xl w-full border-2 p-2"
                  >
                    <FormLabel>Observação</FormLabel>
                    <TextareaAutosize
                      onChange={ (e) => editarObs(index, e.target.value) }
                      value={ formulario.obs }
                      aria-label="minimum height"
                      minRows={ 1 }
                      placeholder="  Escreva Aqui"
                      className="bg-gray-100 rounded-xl w-full
                      border-2 border-gray-300 p-2"
                    />
                  </FormControl>
                </div>
              ) : ''}
            </div>
          )}
        </div>
      ))}
      <Divider color="black" className=" my-4" />
      <div className="flex justify-center items-center mt-3">
        <Button
          variant="contained"
          onClick={ adicionarFormulario }
          disabled={ formularios.some((e) => e.edit) || !disabledBtn }
        >
          Adicionar Equipamento
        </Button>
      </div>
    </div>
  );
}
