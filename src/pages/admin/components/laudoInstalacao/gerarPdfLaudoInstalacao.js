/* eslint-disable func-names */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { prioridadeAlta, prioridadeBaixa, prioridadeMedia, textInitial, textos } from './textPdf';
import getDirectImageURL from '../../../../services/pdfImage';
import { resultImage } from '../../../../services/fundoPdf';
import { obterDataFormatada } from '../../../../services/datasEmissaoValidade';
import { perguntas } from './PontosLaudo';

export default async function gerarPdfLaudoInstalacao(laudo) {
  console.log(laudo);
  const dataAtual = obterDataFormatada();
  const dataVencimento = obterDataFormatada(true);
  const { dpto, ac, resume, empresa, pontosLaudoInstalacao } = laudo;
  const imagemEmpresa = async () => {
    if (empresa.imageUrl) {
      const imagemResponse = await getDirectImageURL(empresa.imageUrl);
      return { image: imagemResponse, fit: [400, 300], alignment: 'center', colSpan: 6 };
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
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [60, '*', 'auto', '*', '*', '*'],
        body: [
          [{ colSpan: 2, text: 'Empresa:', bold: true, color: 'red' }, '', { colSpan: 4, bold: true, text: `${empresa.nome}.` }, '', '', ''],
          [{ colSpan: 2, text: 'Endereço:', bold: true, color: 'red' }, '', { colSpan: 4, bold: true, text: endereco }, '', '', ''],
          [{ colSpan: 2, text: 'Cidade:', bold: true, color: 'red' }, '', { colSpan: 2, text: `${empresa.cidade}.`, bold: true }, '', { text: 'Estado', bold: true, color: 'red' }, { text: `${empresa.estado}.`, bold: true }],
          [{ colSpan: 2, text: 'A/C. Sr(a):', bold: true, color: 'red' }, '', { text: `${ac}.`, bold: true }, { text: 'Departamento:', bold: true, color: 'red' }, { colSpan: 2, text: `${dpto}.`, bold: true }],
          [{ text: textInitial, colSpan: 4, margin: [0, 15], bold: true, color: 'red' }, '', '', '', { colSpan: 2, qr: `http://localhost:3000/${cnpjFomated}`, fit: '120', alignment: 'center' }, ''],
          [await imagemEmpresa(), '', '', '', '', ''],
          [{ text: 'Emissão:', colSpan: 2, bold: true, color: 'red' }, '', { text: dataAtual, bold: true }, { text: 'Validade:', colSpan: 2, bold: true, color: 'red' }, '', { text: dataVencimento, bold: true }],
          [{ text: 'Responsável Técnico:', colSpan: 2, bold: true, color: 'red' }, '', { text: 'Valdir Amaro de Paula', bold: true }, { text: 'CREA-SP:', colSpan: 2, bold: true, color: 'red' }, '', { text: '5062453248', bold: true }],
        ],
      },
      margin: [14, 65, 10, 0],
      fontSize: 13,
    }];

  const mapPontos = await Promise.all(pontosLaudoInstalacao.map(async (ponto, i) => {
    const respostaMaiuscula = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const imagensPonto = ponto.imagesPontoLaudo;
    const imagensUp = [];

    if (imagensPonto.length) {
      const processImage = async (url) => {
        const imageNow = await getDirectImageURL(url);
        imagensUp.push(imageNow);
      };

      console.log('Aguardando');
      await Promise.all(imagensPonto.map((imagem) => processImage(imagem.url)));
      console.log('Aguardando depois');
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
      return [{ colSpan: 6, text: `${pergunta}.`, margin: [0, 5, 0, 5], bold: true, color: 'red' }, '', '', '', '', '', { text: respostaMaiuscula(respostas[ind]), alignment: 'center' }];
    });

    return [[
      {
        pageBreak: 'before',
        image: fundoImage,
        width: 600,
        absolutePosition: { x: 0, y: 0 },
      },
      {
        color: '#444',
        table: {
          widths: [60, '*', 'auto', '*', '*', '*', '*'],
          body: [
            [{ colSpan: 2, text: 'Localização:', margin: [0, 5, 0, 5], bold: true, color: 'red', alignment: 'center' }, '', { colSpan: 3, margin: [0, 5, 0, 5], text: ponto.nome, bold: true, alignment: 'center' }, '', '', { text: 'Risco:', margin: [0, 5, 0, 5], bold: true, color: 'red', alignment: 'center' }, { text: ponto.risco, margin: [0, 5, 0, 5], bold: true, alignment: 'center' }],
          ],
        },
        margin: [14, 65, 10, 0],
        fontSize: 12,
      },
    ],
    [{
      color: '#444',
      table: {
        widths: [60, '*', 'auto', '*', '*', '*'],
        body: [
          imagensDataUri,
        ],
      },
      margin: [14, 0, 10, 0],
      fontSize: 12,
    }],
    [{
      color: '#444',
      table: {
        widths: [60, '*', 'auto', '*', '*', '*', '*'],
        body: [
          ...perguntasCompletas,
          [{ colSpan: 7, text: 'Diagnóstico:', bold: true, lineHeight: 2, color: 'red', border: [1, 1, 1, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: `${ponto.obs}`, bold: true, lineHeight: 4, border: [1, 0, 1, 1] }, '', '', '', '', '', ''],
        ],
      },
      margin: [14, 0, 10, 0],
      fontSize: 12,
    }],
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
          widths: [532],
          body: [
            [text],
          ],
        },
        style: 'tableExample',
        alignment: 'justify',
        color: 'red',
        fontSize: 13,
        margin: [14, 65, 10, 0],
      }];
  });

  const paginaFinalUm = [
    {
      pageBreak: 'before',
      image: fundoImage,
      width: 600,
      absolutePosition: { x: 0, y: 0 },
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [60, '*', '*', '*', '*', '*', '*'],
        body: [
          [{ colSpan: 7, text: 'Prioridades e riscos:', alignment: 'center', bold: true }, '', '', '', '', '', ''],
          [{ colSpan: 1, text: 'Alta', alignment: 'center', color: 'red' }, { colSpan: 6, text: prioridadeAlta, color: 'red' }, '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 1, text: 'Média', alignment: 'center', color: 'red' }, { colSpan: 6, text: prioridadeMedia, color: 'red' }, '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 1, text: 'Baixa', alignment: 'center', color: 'red' }, { colSpan: 6, text: prioridadeBaixa, color: 'red' }, '', '', '', '', ''],
        ],
      },
      margin: [14, 65, 10, 0],
      alignment: 'justify',
      fontSize: 13,
    }];

  const paginaFinalDois = [
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [60, '*', '*', '*', '*', '*', '*'],
        body: [
          [{ colSpan: 7, text: 'Medidas de controle:', bold: true, border: [0, 0, 0, 0], color: 'red' }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: 'As cabines de média tensão deverão ser submetidas à inspeção e manutenção preventiva com periodicidade mínima de 12(doze) meses.', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, alignment: 'justify', text: 'Os equipamentos de proteção coletiva (luvas, bastão, tapete) deverão ser testados conforme a recomendação dos fabricantes; na ausência desta a cada 12(doze) meses', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: 'O diagrama unifilar das instalações elétricas deverá ser atualizado a cada alteração nas instalações elétricas.', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: 'Conclusão:', bold: true, border: [0, 0, 0, 0], color: 'red' }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: 'Atestamos, nesta data, que o sistema elétrico da edificação foi inspecionado e verificado conforme as prescrições da NBR 5410/04 (capítulo “Verificação final”). As não conformidades deverão ser executadas conforme prazo estabelecido nos critérios de risco.', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
        ],
      },
      margin: [14, 20, 10, 0],
      fontSize: 13,
    }];

  const styles = {
    tableExample2: { },
  };

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 80],
    content: [details, ...detailsTexts, ...mapPontos, paginaFinalUm, paginaFinalDois],
    styles,
    footer() {
      return {
        text: ['Rua: Oswaldo Cruz, 1080 - São Caetano do Sul, SP - CEP: 09541-270', '\n(11) 4361-1703 / (11) 4173-1464 / Emergência (11) 98407-0434',
          '\nE-mail: energe@energeengenharia.com.br - Site: www.energeengenharia.com.br'],
        alignment: 'center',
        fontSize: 12,
        margin: [0, 10, 0, 0], // Ajuste conforme necessário
      };
    },
  };

  pdfMake.createPdf(docDefinitions).download(`${laudo.nome}_${dataAtual}.pdf`);
}
