import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';
import {
  empresa, ensaioExample, laudoExample, spdaExample,
} from '../pages/admin/examples/exemplos';

function AppProvider({ children }) {
  const [selectHeader, setSelectHeader] = useState('home');
  const [empresaSelecionada, setEmpresaSelecionada] = useState(empresa);
  // SPDA
  const [spda, setSpda] = useState(spdaExample);
  const [spdaEdit, setSpdaEdit] = useState(spdaExample);
  const [pontosSpda, setPontosSdpa] = useState([]);
  // Laudo de Instalação
  const [laudoInstalacao, setLaudoInstalacao] = useState(laudoExample);
  const [laudoInstalacaoEdit, setLaudoInstalacaoEdit] = useState(laudoExample);
  // Ensaio de Equipamentos
  const [ensaioEquipamento, setEnsaioEquipamento] = useState(ensaioExample);
  const [ensaioEquipamentoEdit, setEnsaioEquipamentoEdit] = useState(ensaioExample);

  const values = useMemo(
    () => ({
      selectHeader,
      setSelectHeader,
      empresaSelecionada,
      setEmpresaSelecionada,
      spda,
      setSpda,
      laudoInstalacao,
      setLaudoInstalacao,
      pontosSpda,
      setPontosSdpa,
      spdaEdit,
      setSpdaEdit,
      laudoInstalacaoEdit,
      setLaudoInstalacaoEdit,
      ensaioEquipamento,
      setEnsaioEquipamento,
      ensaioEquipamentoEdit,
      setEnsaioEquipamentoEdit,
    }),
    [
      selectHeader,
      empresaSelecionada,
      spda,
      pontosSpda,
      spdaEdit,
      laudoInstalacao,
      laudoInstalacaoEdit,
      ensaioEquipamento,
      ensaioEquipamentoEdit,
    ],
  );

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
