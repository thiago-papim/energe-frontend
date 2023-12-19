import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import HomeAdmin from './admin/pages/HomeAdmin';
import Review from './admin/pages/Review';
import Spda from './admin/pages/Spda';
import SpdaEdit from './admin/pages/SpdaEdit';
import LaudoInstalacao from './admin/pages/LaudoInstalacao';
import Empresas from './admin/pages/Empresas';
import LaudoInstalacaoEdit from './admin/pages/LaudoInstalacaoEdit';
import SendFile from './admin/pages/sendFile';
import QrClientes from './admin/pages/QrClientes';
import NotFound from './admin/pages/NotFound';
import Clientes from './Clientes';
import EnsaioEquipamento from './admin/pages/EnsaioEquipamento';
import EnsaioEquipamentoEdit from './admin/pages/EnsaioEquipamentoEdit';

function Routes() {
  return (
    <Switch>
      <Route exact path="/contato" component={ Contact } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/admin" component={ HomeAdmin } />
      <Route exact path="/review" component={ Review } />
      <Route exact path="/spda" component={ Spda } />
      <Route exact path="/spda-edit" component={ SpdaEdit } />
      <Route exact path="/spda/:ponto" component={ Spda } />
      <Route exact path="/laudo-de-instalacoes" component={ LaudoInstalacao } />
      <Route exact path="/laudo-edit" component={ LaudoInstalacaoEdit } />
      <Route exact path="/ensaio-de-equipamento" component={ EnsaioEquipamento } />
      <Route exact path="/ensaio-edit" component={ EnsaioEquipamentoEdit } />
      <Route exact path="/empresas" component={ Empresas } />
      <Route exact path="/send" component={ SendFile } />
      <Route exact path="/clientes/:cnpj" component={ QrClientes } />
      <Route exact path="/clientes" component={ Clientes } />
      <Route exact path="/" component={ Home } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
