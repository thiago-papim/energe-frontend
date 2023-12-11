import React, { useContext, useEffect } from 'react';
import Header from '../components/header/Header';
import IntermedioHome from '../components/IntermedioHome/IntermedioHome';
import Footer from '../components/footer/Footer';
import IntermedioHomeTwo from '../components/IntermedioHome/IntermedioHomeTwo';
import IntermedioHomeThree from '../components/IntermedioHome/IntermedioHomeThree';
import Clientes from '../components/IntermedioHome/Clientes';
import BtnWhatspp from '../components/BtnWhatsapp';
import AppContext from '../context/AppContext';
import { empresa } from './admin/examples/exemplos';

export default function Home() {
  const { setEmpresaSelecionada } = useContext(AppContext);

  useEffect(() => {
    setEmpresaSelecionada(empresa);
  }, [setEmpresaSelecionada]);

  return (
    <div className="App">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <IntermedioHome />
        <IntermedioHomeTwo />
        <IntermedioHomeThree />
        <Clientes />
      </div>
      <Footer />
      <BtnWhatspp />
    </div>
  );
}
