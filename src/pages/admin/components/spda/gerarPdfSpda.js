/* eslint-disable func-names */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { textInitial, texto1, texto2, texto3, texto4, texto5 } from './textPdf';
import getDirectImageURL from '../../../../services/pdfImage';
import { resultImage } from '../../../../services/fundoPdf';
import { perguntas } from './PontosSpda';
import { obterDataFormatada } from '../../../../services/datasEmissaoValidade';

export default async function gerarPdfSpda(spda) {
  const textos = [texto1, texto2, texto3, texto4, texto5];
  const dataAtual = obterDataFormatada();
  const dataVencimento = obterDataFormatada(true);
  const { dpto, ac, resume, empresa, pontosSpda } = spda;
  const imagemEmpresa = async () => {
    if (empresa.imageUrl) {
      const imageUri = await getDirectImageURL(empresa.imageUrl);
      return { image: imageUri, fit: [400, 300], alignment: 'center', colSpan: 6 };
    }
    return '';
  };
  const cnpjFomated = empresa.cnpj.replace(/\D/g, '');
  const endereco = `${empresa.rua}, ${empresa.numero}.`;
  const fundoImage = await resultImage();
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const details = [
    {
      image: fundoImage,
      width: 600,
      absolutePosition: { x: 0, y: 0 },
    }, {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [60, '*', 'auto', '*', '*', '*'],
        body: [
          [{ colSpan: 2, text: 'Empresa:', bold: true, color: 'red' }, '', { colSpan: 4, bold: true, text: `${empresa.nome}.` }, '', '', ''],
          [{ colSpan: 2, text: 'Endereço:', bold: true, color: 'red' }, '', { colSpan: 4, bold: true, text: endereco }, '', '', ''],
          [{ colSpan: 2, text: 'Cidade:', bold: true, color: 'red' }, '', { colSpan: 2, text: `${empresa.cidade}.`, bold: true }, '', { text: 'Estado', bold: true, color: 'red' }, { text: `${empresa.estado}.`, bold: true }],
          [{ colSpan: 2, text: 'A/C. Sr(a):', bold: true, color: 'red' }, '', { text: `${ac}.`, bold: true }, { text: 'Departamento:', bold: true, color: 'red' }, { colSpan: 2, text: `${dpto}.`, bold: true }],
          [{ text: textInitial, colSpan: 4, margin: [0, 15], bold: true, color: 'red' }, '', '', '', { colSpan: 2, qr: `https://energe-frontend-git-main-energeengenharia.vercel.app/clientes/${cnpjFomated}`, fit: '120', alignment: 'center' }, ''],
          [await imagemEmpresa(), '', '', '', '', ''],
          [{ text: 'Emissão:', colSpan: 2, bold: true, color: 'red' }, '', { text: dataAtual, bold: true }, { text: 'Validade:', colSpan: 2, bold: true, color: 'red' }, '', { text: dataVencimento, bold: true }],
          [{ text: 'Responsável Técnico:', colSpan: 2, bold: true, color: 'red' }, '', { text: 'Valdir Amaro de Paula', bold: true }, { text: 'CREA-SP:', colSpan: 2, bold: true, color: 'red' }, '', { text: '5062453248', bold: true }],
        ],
      },
      margin: [14, 65, 10, 0],
      fontSize: 13,
    }];

  const mapPontos = await Promise.all(pontosSpda.map(async (ponto, i) => {
    const respostaMaiuscula = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const imagensPonto = ponto.imagesPontoSpda;
    const imagensUp = [];

    if (imagensPonto.length) {
      const processImage = async (url) => {
        const imageNow = await getDirectImageURL(url);
        imagensUp.push(imageNow);
      };
      await Promise.all(imagensPonto.map((imagem) => processImage(imagem.url)));
    }

    let imagensDataUri = [{ colSpan: 6, text: '' }, '', '', '', '', ''];

    if (imagensUp.length === 1) {
      imagensDataUri = [{
        image: imagensUp[0], width: 120, height: 120, alignment: 'center', colSpan: 6 }, '', '', '', '', ''];
    } else if (imagensUp.length === 2) {
      imagensDataUri = [
        { image: imagensUp[0], width: 120, height: 120, alignment: 'center', colSpan: 3 }, '', '',
        { image: imagensUp[1], width: 120, height: 120, alignment: 'center', colSpan: 3 }, '', ''];
    } else if (imagensUp.length === 3) {
      imagensDataUri = [
        { image: imagensUp[0], width: 120, height: 120, alignment: 'center', colSpan: 2 }, '',
        { image: imagensUp[1], width: 120, height: 120, alignment: 'center', colSpan: 2 }, '',
        { image: imagensUp[2], width: 120, height: 120, alignment: 'center', colSpan: 2 }, ''];
    }

    const perguntasCompletas = perguntas.map((pergunta, ind) => {
      const respostas = ponto.respostas.split(',');
      return [{ colSpan: 5, text: `${pergunta}.`, margin: [0, 5, 0, 5], bold: true, color: 'red', lineHeight: 1 }, '', '', '', '', { text: respostaMaiuscula(respostas[ind]), alignment: 'center', margin: [0, 5, 0, 5], bold: true }];
    });

    return [
      {
        pageBreak: 'before',
        image: fundoImage,
        width: 600,
        absolutePosition: { x: 0, y: 0 },
      },
      {
        color: '#444',
        table: {
          widths: [60, '*', 'auto', '*', '*', '*'],
          body: [
            [{ colSpan: 2, text: 'Localização:', bold: true, color: 'red', alignment: 'center' }, '', { colSpan: 4, bold: true, text: `Ponto ${i + 1}: ${ponto.nome}`, alignment: 'center' }, '', '', ''],
            imagensDataUri,
            ...perguntasCompletas,
            [{ colSpan: 6, text: 'Diagnóstico:', margin: [0, 5, 0, 0], bold: true, lineHeight: 2, color: 'red', border: [1, 1, 1, 0] }, '', '', '', '', ''],
            [{ colSpan: 6, text: `${ponto.obs}`, bold: true, lineHeight: 10, border: [1, 0, 1, 1] }, '', '', '', '', ''],
          ],
        },
        margin: [14, 65, 10, 0],
        fontSize: 12,
      },
    ];
  }));

  const detailsTexts = textos.map((text) => {
    return [
      { pageBreak: 'before',
        image: fundoImage,
        width: 600,
        absolutePosition: { x: 0, y: 0 },
      },
      {
        table: {
          widths: ['*'],
          body: [
            [text],
          ],
        },
        style: 'tableExample2',
        color: 'red',
        fontSize: 13,
        margin: [14, 65, 10, 0],
      }];
  });

  const conclusaoFinal = [
    { pageBreak: 'before',
      image: fundoImage,
      width: 600,
      absolutePosition: { x: 0, y: 0 },
    },
    {
      table: {
        widths: ['*'],
        body: [
          [{ text: '4-Conclusão:', bold: true, lineHeight: 2, fillColor: 'lightblue', border: [1, 1, 1, 0] }],
          [{ text: resume, bold: true, lineHeight: 10, color: 'blue', border: [1, 0, 1, 1] }],
        ],
      },
      style: 'tableExample2',
      color: 'red',
      fontSize: 13,
      margin: [14, 65, 10, 0],
    }];

  const footerComplete = [
    { pageBreak: 'before',
      image: fundoImage,
      width: 600,
      absolutePosition: { x: 0, y: 0 },
    },
    {
      table: {
        widths: ['*'],
        body: [
          [{ text: '4-Conclusão:', bold: true, lineHeight: 2, fillColor: 'lightblue', border: [1, 1, 1, 0] }],
          [{ text: resume, bold: true, lineHeight: 10, color: 'blue', border: [1, 0, 1, 1] }],
        ],
      },
      style: 'tableExample2',
      color: 'red',
      fontSize: 13,
      margin: [14, 65, 10, 0],
    }];

  const pageStyle = {
    color: '#ffffff',
  };

  const styles = {
    tableExample2: { },
  };

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 50],
    content: [details, ...detailsTexts,
      ...mapPontos,
      conclusaoFinal],
    styles,
    footer() {
      return {
        text: ['Rua: Oswaldo Cruz, 1080 - São Caetano do Sul, SP - CEP: 09541-270', '\n(11) 4361-1703 / (11) 4173-1464 / Emergência (11) 98407-0434',
          '\nE-mail: energe@energeengenharia.com.br - Site: www.energeengenharia.com.br'],
        alignment: 'center',
        fontSize: 12,
        margin: [0, -10, 0, 0], // Ajuste conforme necessário
      };
    },
  };

  pdfMake.createPdf(docDefinitions).download(`${spda.nome}_${dataAtual}.pdf`);
}
