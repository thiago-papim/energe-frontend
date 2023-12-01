/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import AppContext from '../../../context/AppContext';

export default function AutoCompleteEmpresa({ report, disabled }) {
  const { setEmpresaSelecionada, empresaSelecionada } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const inputRef = useRef(null);
  const localhost = process.env.REACT_APP_LOCAL_HOST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${localhost}/companies`);
        response.data.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        setEmpresas(response.data);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    fetchData();
  }, [localhost]);

  useEffect(() => {
    if (empresaSelecionada.nome) {
      setSelectedOption(empresaSelecionada);
    }
  }, [empresaSelecionada, selectedOption]);

  const handleInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleChange = (event, value) => {
    setSelectedOption(value);

    if (value) {
      setEmpresaSelecionada(value);
      if (report) {
        report((prev) => {
          return {
            ...prev,
            empresa: value,
          };
        });
      }
    } else {
      setEmpresaSelecionada({
        nome: '',
        endereco: '',
        cidade: '',
        estado: '',
      });
      if (report) {
        report((prev) => {
          return {
            ...prev,
            empresa: {
              nome: '',
              endereco: '',
              cidade: '',
              estado: '',
            },
          };
        });
      }
    }
    handleInputBlur();
  };

  return (
    <div className="w-[250px]">
      <Autocomplete
        noOptionsText="Empresa não existe"
        onChange={ handleChange }
        disablePortal
        disabled={ disabled }
        id="endereco-autocomplete"
        options={ empresas }
        getOptionLabel={ (option) => option.nome }
        value={ selectedOption }
        isOptionEqualToValue={ (option, value) => option.nome === value.nome }
        renderInput={ (params) => (
          <TextField
            { ...params }
            label="Empresa"
            inputRef={ inputRef }
          />
        ) }
      />
    </div>
  );
}
