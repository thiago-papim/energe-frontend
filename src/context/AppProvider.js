import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';
import { empresa, laudoExample, spdaExample } from '../pages/admin/examples/exemplos';

function AppProvider({ children }) {
  const [selectHeader, setSelectHeader] = useState('home');
  const [empresaSelecionada, setEmpresaSelecionada] = useState(empresa);
  // SPDA
  const [spda, setSpda] = useState(spdaExample);
  const [laudoInstalacao, setLaudoInstalacao] = useState(laudoExample);
  const [spdaEdit, setSpdaEdit] = useState(spdaExample);
  const [laudoInstalacaoEdit, setLaudoInstalacaoEdit] = useState(laudoExample);
  const [pontosSpda, setPontosSdpa] = useState([]);

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
    }),
    [
      selectHeader,
      empresaSelecionada,
      spda,
      pontosSpda,
      spdaEdit,
      laudoInstalacao,
      laudoInstalacaoEdit,
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
