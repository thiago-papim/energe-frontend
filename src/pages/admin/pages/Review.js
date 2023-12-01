/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HeaderAdmin from '../components/HeaderAdmin';
import SpdaReview from '../components/review/SpdaReview';
import LaudoInstalacaoReview from '../components/review/LaudoInstalacaoReview';
import AppContext from '../../../context/AppContext';
import { laudoExample, spdaExample } from '../examples/exemplos';

export default function Review() {
  const { setSpdaEdit, setLaudoInstalacaoEdit } = useContext(AppContext);
  const [value, setValue] = useState('1');

  useEffect(() => {
    setLaudoInstalacaoEdit(laudoExample);
    setSpdaEdit(spdaExample);
  }, [setLaudoInstalacaoEdit, setSpdaEdit]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <HeaderAdmin />
      <Box sx={ { width: '100%', typography: 'body1' } }>
        <TabContext value={ value }>
          <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
            <TabList onChange={ handleChange } aria-label="lab API tabs example">
              <Tab label="SPDA" value="1" />
              <Tab label="Laudo de Instalação" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SpdaReview />
          </TabPanel>
          <TabPanel value="2">
            <LaudoInstalacaoReview />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
