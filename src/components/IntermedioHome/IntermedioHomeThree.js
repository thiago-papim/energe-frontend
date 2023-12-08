/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material';
import cabinePrimaria from '../../imagens/cabine-primaria.jpg';
import termografia from '../../imagens/termografia.jpg';
import nr10 from '../../imagens/nr10mte.jpg';
import luvas from '../../imagens/luva.jpg';
import tapete from '../../imagens/tapete.jpg';
import varas from '../../imagens/varas.jpg';
import analiseEnergia from '../../imagens/analise-de-energia.jpg';
import montagemEletrica from '../../imagens/montagem-eletrica.jpg';
import pararaio from '../../imagens/pararaio.jpg';

export default function IntermedioHomeThree() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const theme = createTheme({
    palette: {
      btnColor: {
        main: '#8792ad',
      },
    },
    typography: {
      '@media (max-width:600px)': {
        fontSize: 5,
      },
    },
  });

  return (
    <ThemeProvider theme={ theme }>
      <section
        id="servicos"
        className="flex flex-col my-3 items-center py-6"
      >
        <p
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-custom text-center mb-4 border-b-2 border-black"
        >
          SERVIÇOS
        </p>
        <div>
          <Accordion expanded={ expanded === 'panel1' } onChange={ handleChange('panel1') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className="flex justify-center items-center"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                CABINES PRIMÁRIAS
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%] lg:w-[90%] xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10
                  pb-3"
                >
                  Atuamos em manutenção e montagem de CABINES PRÍMARIAS prestando serviços de análises de óleo isolante, tratamentos termo vácuo, atendimentos de emergência e reparos de todos os equipamentos de alta e média tensão.
                </p>
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10
                  pb-3"
                >
                  As instalações acima de 1000 volts são classificadas área de risco controlada conforme norma regulamentadora 10 do Ministério do Trabalho e devem ser submetidas a ensaios com periodicidade mínima de 12 meses.
                </p>
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  As manutenções além de visarem a prevenção contra paradas, tem papel fundamental na proteção de seus operadores no que concerne a acidentes envolvendo falhas nos equipamentos.
                </p>
              </div>
              <img alt="cabine-primaria" src={ cabinePrimaria } />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={ expanded === 'panel2' } onChange={ handleChange('panel2') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                TERMOGRAFIA
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10
                  pb-3"
                >
                  Inspecionamos termograficamente as instalações elétricas através de câmeras com termovisor, fornecendo relatórios e diretrizes para manutenção preventiva nos pontos aquecidos indicados.
                </p>
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  A inspeção termográfica é de extrema importância na prevenção antecipada dos componentes elétricos de uma instalação indicando os desgastes e maus contatos que podem ocasionar danos e paradas na distribuição de energia elétrica.
                </p>
              </div>
              <img alt="termografia" src={ termografia } />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={ expanded === 'panel3' } onChange={ handleChange('panel3') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                NR10 MTE
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Executamos todas as exigências determinadas pela NR10 bem como a adequação das instalações elétricas conforme suas recomendações que consistem em:
                </p>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Elaboração de diagrama unifilar.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Prontuário das instalações elétricas.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Formulários de analise de risco preliminar.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Ensaios de equipamentos de segurança.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Laudo das instalações elétricas.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Laudo do sistema de pára-raios conforme NBR 5419.
                </li>
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Todos os documentos fornecidos são elaborados e assinados por profissional habilitado podendo ser apresentado para qualquer tipo de órgão fiscalizador.
                </p>
              </div>
              <img alt="nr10" src={ nr10 } />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={ expanded === 'panel4' } onChange={ handleChange('panel4') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                MONTAGENS ELÉTRICAS
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Desenvolvemos e executamos instalações elétricas industriais para distribuição de energia em média e baixa tensão nos seguintes seguimentos:
                </p>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Montagens de infra-estruturas elétricas com leitos eletrocalhas e tubulações.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Montagens de painéis elétricos de força e luz.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Montagens de sistemas de proteção contra descargas atmosféricas. (Pára-raios).
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Montagens de controladores de fator de potência.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Montagens de cabines primárias.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Montagens de bancos de capacitores.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Projetos elétricos industriais.
                </li>
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  Construímos instalações parciais ou desde a entrada primária até a distribuição de máquinas todas projetadas conforme NBR 5410 e NBR 14039.
                </p>
              </div>
              <img alt="montagem-eletrica" src={ montagemEletrica } />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={ expanded === 'panel5' } onChange={ handleChange('panel5') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                ANÁLISE DE ENERGIA
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Possuímos equipamentos modernos de análises de energia para detecção e registros de grandezas elétricas, visando melhorar os custos e economias de consumo. Elaboramos e fornecemos relatórios e gráficos de:
                </p>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  TENSÃO/CORRENTE.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  FATOR DE POTÊCIA E DEMANDA.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  HARMÔNICAS DE TENSÃO E CORRENTE.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  POTÊNCIA ATIVA E REATIVA.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  FREQUÊNCIA E TRANSIENTES.
                </li>
              </div>
              <img alt="analise-energia" src={ analiseEnergia } />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={ expanded === 'panel6' } onChange={ handleChange('panel6') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel6bh-content"
              id="panel6bh-header"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                TESTE DE EQUIPAMENTO DE PROTEÇÃO COLETIVA
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Executamos ensaios em equipamentos de proteção individual e coletiva para uso em eletricidade conforme as exigências na NR- 10 do Ministério do Trabalho e Emprego e normas técnicas aplicáveis.
                  Emitimos laudos pós teste para os seguintes EPIs/EPCs:
                </p>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  LUVAS DE BORRACHA PARA CLASSES DE TENSÃO ATÉ 25KV.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  TAPETES DE BORRACHA CLASSE DE TENSÃO ATÉ 50KV.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  BASTÕES DE FIBRA PARA MANOBRAS ELÉTRICAS.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  MANGAS DE BORRACHA.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  DETECTORES DE TENSÃO.
                </li>
              </div>
              <div className="flex md:flex-col items-center justify-center">
                <img alt="teste-equipamento" src={ tapete } className="md:w-[200px] w-[30%]" />
                <img alt="teste-equipamento" src={ luvas } className="md:w-[200px] w-[30%]" />
                <img alt="teste-equipamento" src={ varas } className="md:w-[200px] w-[30%]" />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={ expanded === 'panel7' } onChange={ handleChange('panel7') }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls="panel7bh-content"
              id="panel7bh-header"
            >
              <Typography sx={ { width: '100%', flexShrink: 0 } } className="text-center">
                PÁRA-RAIOS
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex md:flex-row flex-col items-center justify-center">
              <div className="md:w-[50%]">
                <p
                  className="w-[100%]
                  lg:w-[90%]
                  xl:w-[90%]
                  text-md lg:text-md text-left font-thin lg:pl-10 pb-3"
                >
                  Possuímos equipes e equipamentos especializados para desenvolver projetos e serviços para Sistemas de Proteção Contra Descargas Atmosféricas (PÁRA-RAIOS) conforme as seguintes necessidades:
                </p>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  PROJETOS E MONTAGENS DE SPDA CONFORME NBR5419 - ABNT.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  MANUTENÇÕES PREVENTIVAS E CORRETIVAS.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  ENSAIOS DE RESISTÊNCIA DE ATERRAMENTO E CONTINUIDADE.
                </li>
                <li
                  className="w-[100%] lg:w-[90%] xl:w-[90%] text-md lg:text-md text-left font-thin lg:pl-10"
                >
                  LAUDOS CONFORME EXIGÊNCIAS DOS ORGÃOS FISCALIZADORES E NORMAS REGULAMENTADORAS
                </li>
              </div>
              <img alt="para-raio" src={ pararaio } />
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </ThemeProvider>
  );
}
