import React from 'react';
import Header from '../components/header/Header';
import IntermedioHome from '../components/IntermedioHome/IntermedioHome';
import Footer from '../components/footer/Footer';
import IntermedioHomeTwo from '../components/IntermedioHome/IntermedioHomeTwo';

export default function Home() {
  return (
    <div className="App">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <IntermedioHome />
        <IntermedioHomeTwo />
      </div>
      <Footer />
    </div>
  );
}
