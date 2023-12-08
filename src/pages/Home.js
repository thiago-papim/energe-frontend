import React from 'react';
import Header from '../components/header/Header';
import IntermedioHome from '../components/IntermedioHome/IntermedioHome';
import Footer from '../components/footer/Footer';
import IntermedioHomeTwo from '../components/IntermedioHome/IntermedioHomeTwo';
import IntermedioHomeThree from '../components/IntermedioHome/IntermedioHomeThree';
import Clientes from '../components/IntermedioHome/Clientes';
import BtnWhatspp from '../components/BtnWhatsapp';

export default function Home() {
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
