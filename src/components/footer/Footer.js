import React from 'react';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

class Footer extends React.Component {
  render() {
    return (
      <div className="h-[200px] bg-[#eae6e3] w-full flex flex-col items-start">
        <div className="flex justify-center w-[100%] mb-10">
          <button>
            <WhatsAppIcon
              className="hover:text-green-700 text-[#8792ad] mr-10"
              style={ { fontSize: '2.5rem' } }
            />
          </button>
          <button>
            <InstagramIcon
              className="hover:text-violet-500 text-[#8792ad]"
              style={ { fontSize: '2.5rem' } }
            />
          </button>
        </div>
        <div>
          <div
            className="flex"
          >
            <div
              className="flex flex-col items-start mr-6"
            >
              <p
                className="text-red-700 font-bold"
              >
                Fale Conosco

              </p>
              <p>das 08:00 ás 17:00 de Seg. a Sex.</p>
            </div>
            <div>
              <p>
                (11) 4361-1703
              </p>
              <p>
                (11) 4173-1464
              </p>
            </div>
          </div>
          <div
            className="flex justify-center"
          >
            <div
              className="flex items-start mr-2 mt-10"
            >
              <LocalPhoneIcon className="mr-1" />
              <p
                className="text-red-700 font-bold"
              >
                ATENDIMENTO DE EMERGÊNCIA 24 HORAS:
              </p>
            </div>
            <div className="flex items-start mt-10">
              <p>
                (11) 98407-0434
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
