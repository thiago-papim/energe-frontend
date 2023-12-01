/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Step, StepContent,
  StepLabel, Stepper, Table, TextField, TextareaAutosize, Typography, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AppContext from '../../../../context/AppContext';

const steps = [
  {
    label: 'Condição de interligação da estrutura metálica à estrutura de captação',
  },
  {
    label: 'Condição de interligação da estrutura metálica à estrutura de captação',
  },
  {
    label: 'Condição de Dispositivos de Proteção Contra Surtos',
  },
  {
    label: 'Condição dos conectores de interligação',
  },
  {
    label: 'Condição das caixas de aterramento',
  },
  {
    label: 'Condição dos isoladores de sustentação',
  },
  {
    label: 'Resultado de resistência ôhmica de continuidade abaixo de 0,2 Ohms quando aterrado em estrutura metálica',
  },
  {
    label: 'Resultado de resistência ôhmica de aterramento abaixo de 10 Ohms',
  },
];

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

const initArrQuest = {
  0: 'conforme',
  1: 'conforme',
  2: 'conforme',
  3: 'conforme',
  4: 'conforme',
  5: 'conforme',
  6: 'conforme',
  7: 'conforme',
};

export default function ListaDePontos() {
  const [nomePonto, setNomePonto] = useState('');
  const [edit, setEdit] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [arrQuests, setArrQuests] = useState(initArrQuest);
  const [imagens, setImagens] = useState([]);
  const [pontoSpda, setPontoSpda] = useState({});
  const [diagnosticoText, setDiagnosticoText] = useState('');
  const { setPontosSdpa, pontosSpda } = useContext(AppContext);
  const diagnostico = Object.values(arrQuests).some((e) => e === 'não conforme');
  const magicImagens = 2;

  useEffect(() => {
    setPontoSpda((prev) => {
      return { ...prev, imagens, nomePonto, arrQuests, diagnosticoText };
    });
  }, [imagens, nomePonto, arrQuests, diagnosticoText]);

  console.log(pontoSpda);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    const imagesArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const imageUrl = URL.createObjectURL(file);
      imagesArray.push({ file, imageUrl });
    }
    const magic = 3;
    if (imagens.length < magic) {
      setImagens([...imagens, ...imagesArray]);
    }
  };

  const deleteFileChange = (i) => {
    setImagens(imagens.filter((e, index) => index !== i));
    console.log(imagens);
    console.log(i);
  };

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const handlePonto = (e) => setNomePonto(e.target.value);

  const handleQuest = (e, i) => {
    const { target: { value } } = e;
    setArrQuests({ ...arrQuests, [i]: value });
  };

  const finalizarPonto = () => {
    setEdit(true);
    setPontosSdpa([...pontosSpda, 0]);
  };

  const handleDiagnostico = (e) => {
    const { target: { value } } = e;
    setDiagnosticoText(value);
  };

  return (
    <div className="my-6 p-2 rounded-lg flex justify-center">
      { edit
        ? (
          <div className="flex flex-col w-[90%] items-center">
            <p>{`Nome do Ponto: ${nomePonto}`}</p>
            <div className="w-full flex">
              { imagens.map((image, i) => (
                <img
                  key={ i }
                  src={ image.imageUrl }
                  alt={ `Imagem ${i}` }
                  className="w-1/3 h-[150px]"
                />))}
            </div>
            <Table aria-label="basic table">
              <thead>
                <tr className="bg-gray-300">
                  <th>Pergunta</th>
                  <th>Condição</th>
                </tr>
              </thead>
              <tbody className="border-2">
                { steps.map((e, i) => (
                  <tr className="border-2" key={ i }>
                    <td className="border-2 p-2">{e.label}</td>
                    <td className="p-2">{arrQuests[i]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              onClick={ () => setEdit(false) }
              sx={ { mt: 1, mr: 1 } }
              variant="contained"
            >
              Editar
            </Button>
          </div>

        ) : (
          <div className="my-3 w-[350px] md:w-[700px] flex flex-col items-center border-2 p-4">
            <TextField
              disabled={ edit }
              value={ nomePonto }
              className="mt-3 w-[250px] md:w-[550px]"
              id="outlined-basic"
              label="Nome do Ponto"
              variant="outlined"
              onChange={ handlePonto }
            />
            <div
              className={ `w-full flex ${imagens[0] ? 'h-[260px]' : ''} mt-4` }
            >
              {imagens.map((image, index) => (
                <div
                  key={ index }
                  className="w-1/3 h-full flex flex-col items-center"
                >
                  <Button
                    className="justify-center"
                    component="label"
                    variant="contained"
                    onClick={ () => deleteFileChange(index) }
                  >
                    Excluir

                  </Button>
                  <img
                    src={ image.imageUrl }
                    alt={ `Imagem ${index}` }
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div>
              <Button
                onChange={ handleFileChange }
                type="file"
                accept="image/*"
                multiple
                disabled={ imagens.length > magicImagens }
                className="my-4"
                component="label"
                variant="contained"
                startIcon={ <CloudUploadIcon /> }
              >
                Adicionar Imagem
                <VisuallyHiddenInput type="file" />
              </Button>
            </div>
            <div className="form-floating">
              <Box
                className="md:w-[550px]"
              >
                <Stepper activeStep={ activeStep } orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={ index }>
                      <StepLabel
                        onClick={ () => setActiveStep(index) }
                        optional={
                          <Typography variant="caption">{arrQuests[index].toUpperCase()}</Typography>
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <FormControl>
                          <RadioGroup
                            value={ arrQuests[index] || 'conforme' }
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={ (e) => handleQuest(e, index) }
                          >
                            <FormControlLabel value="conforme" control={ <Radio /> } label="Conforme" />
                            <FormControlLabel value="não conforme" control={ <Radio /> } label="Não conforme" />
                            <FormControlLabel value="não aplicável" control={ <Radio /> } label="Não aplicável" />
                          </RadioGroup>
                        </FormControl>
                        <Box sx={ { mb: 2 } }>
                          <div>
                            <Button
                              variant="contained"
                              onClick={ handleNext }
                              sx={ { mt: 1, mr: 1 } }
                            >
                              {index === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                            </Button>
                            <Button
                              disabled={ index === 0 }
                              onClick={ handleBack }
                              sx={ { mt: 1, mr: 1 } }
                            >
                              Anterior
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={ 0 } sx={ { p: 3 } }>
                    <Typography>Concluido com Sucesso</Typography>
                    <Button onClick={ handleReset } sx={ { mt: 1, mr: 1 } }>
                      Resetar
                    </Button>
                  </Paper>
                )}
              </Box>
            </div>
            <div className="mt-6 w-full flex justify-center">
              { edit ? (
                <Button
                  variant="contained"
                  onClick={ () => {
                    setEditPontoSpda(true);
                    setEdit(false);
                  } }
                >
                  Editar
                </Button>
              ) : (
                <div className="w-2/3">
                  {
                    diagnostico ? (
                      <TextareaAutosize
                        onChange={ handleDiagnostico }
                        value={ diagnosticoText }
                        aria-label="minimum height"
                        minRows={ 1 }
                        placeholder="  Diagnóstico"
                        className="bg-slate-200 rounded-xl w-full border-2 border-gray-500 p-2"
                      />
                    ) : ''
                  }
                  <div className="flex justify-center">
                    <Button
                      disabled={ nomePonto.length === 0 || edit }
                      variant="contained"
                      onClick={ () => finalizarPonto() }
                    >
                      Concluir
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) }
    </div>
  );
}
