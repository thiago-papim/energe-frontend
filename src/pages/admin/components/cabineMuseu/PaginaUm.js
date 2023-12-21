import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppContext from '../../../../context/AppContext';
import { parteDois, parteQuatro, parteTres, parteUm } from './ParteUm';

export default function PaginaUm() {
  const { cabineMuseu, setCabineMuseu } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);

  const handleGeneric = (e, obj) => {
    const { name, value } = e.target;
    if (obj) {
      setCabineMuseu((prev) => {
        return {
          ...prev,
          [obj]: {
            ...prev[obj],
            [name]: value,
          },
        };
      });
    } else {
      setCabineMuseu((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const steps = [
    parteUm(handleGeneric, cabineMuseu),
    parteDois(handleGeneric, cabineMuseu),
    parteTres(handleGeneric, cabineMuseu),
    parteQuatro(handleGeneric, cabineMuseu),
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={ { maxWidth: 400 } }>
      <Stepper activeStep={ activeStep } orientation="vertical">
        {steps.map((step, index) => {
          return (
            <Step key={ step.label }>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Último passo</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <div>{step.description}</div>
                <Box sx={ { mb: 2 } }>
                  <div>
                    <Button
                      variant="contained"
                      onClick={ handleNext }
                      sx={ { mt: 1, mr: 1 } }
                    >
                      {index === steps.length - 1 ? 'Finalizar' : 'Próximo'}
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
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={ 0 } sx={ { p: 3 } }>
          <Typography>Formulário Concluído</Typography>
          <Button onClick={ handleReset } sx={ { mt: 1, mr: 1 } }>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
