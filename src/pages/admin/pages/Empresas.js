/* eslint-disable max-len */
import React, { useState } from 'react';
import { Button } from '@mui/material';
import HeaderAdmin from '../components/HeaderAdmin';
import AddCompany from '../components/company/AddCompany';
import DeleteCompany from '../components/company/DeleteCompany';

export default function HomeAdmin() {
  const [addEmpresa, setAddEmpresa] = useState(false);
  return (
    <div>
      <HeaderAdmin />
      <div className="mt-8 flex flex-col justify-center">
        <div className="flex justify-center">
          <Button
            variant="contained"
            className="w-[200px] m-2"
            onClick={ () => setAddEmpresa(false) }
          >
            Adicionar Empresa
          </Button>
          <Button
            variant="contained"
            className="w-[200px] m-2"
            onClick={ () => setAddEmpresa(true) }
          >
            Deletar Empresa
          </Button>
        </div>
        <div className="mt-8 flex justify-center">
          { addEmpresa ? (

            <DeleteCompany />
          ) : (
            <AddCompany />
          )}
        </div>
      </div>
    </div>
  );
}
