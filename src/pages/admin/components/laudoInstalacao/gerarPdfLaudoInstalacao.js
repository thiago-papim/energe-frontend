/* eslint-disable max-lines */
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
  const dataAtual = obterDataFormatada();
  const dataVencimento = obterDataFormatada(true);
  const { dpto, ac, resume, empresa, pontosLaudoInstalacao } = laudo;
  const imagemEmpresa = async () => {
    if (empresa.imageUrl) {
      const imageUri = await getDirectImageURL(empresa.imageUrl);
      return {
        image: imageUri,
        width: 525,
        height: 350,
        colSpan: 7,
        alignment: 'center',
        margin: [0, 0, 0, 0] };
    }
    return '';
  };

  const cnpjFomated = empresa.cnpj.replace(/\D/g, '');
  const endereco = `${empresa.rua}, ${empresa.numero}.`;
  const fundoImage = await resultImage();
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const corAzul = 'mediumblue';

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
        widths: [65, 65, '*', 30, 88, 'auto', 'auto'],
        body: [
          [{ colSpan: 1, text: 'Empresa:', bold: true, color: 'red' }, { colSpan: 6, bold: true, text: `${empresa.nome}.`, color: corAzul }, '', '', '', '', ''],
          [{ colSpan: 1, text: 'Endereço:', bold: true, color: 'red' }, { colSpan: 6, bold: true, text: endereco, color: corAzul }, '', '', '', '', ''],
          [{ colSpan: 1, text: 'Cidade:', bold: true, color: 'red' }, { colSpan: 3, text: `${empresa.cidade}.`, bold: true, color: corAzul }, '', '', { text: 'Estado', bold: true, color: 'red' }, { text: `${empresa.estado}.`, colSpan: 2, bold: true, color: corAzul }, ''],
          [{ colSpan: 1, text: 'A/C. Sr(a):', bold: true, color: 'red' }, { text: `${ac}.`, colSpan: 3, bold: true, color: corAzul }, '', '', { text: 'Departamento:', bold: true, color: 'red' }, { colSpan: 2, text: `${dpto}.`, bold: true, color: corAzul }, ''],
          [{ text: textInitial, colSpan: 5, margin: [0, 15], color: 'red', alignment: 'justify' }, '', '', '', '', { colSpan: 2, qr: `https://energe-frontend-git-main-energeengenharia.vercel.app/clientes/${cnpjFomated}`, fit: '120', alignment: 'center' }, ''],
          [await imagemEmpresa(), '', '', '', '', '', ''],
          [{ text: 'Emissão:', colSpan: 2, bold: true, color: 'red' }, '', { text: dataAtual, colSpan: 2, bold: true, color: corAzul }, '', { text: 'Validade:', bold: true, color: 'red' }, { text: dataVencimento, colSpan: 2, bold: true, color: corAzul }, ''],
          [{ text: 'Responsável Técnico:', border: [1, 1, 1, 0], colSpan: 2, bold: true, color: 'red' }, { text: '', border: [1, 1, 1, 0] }, { text: 'Valdir Amaro de Paula', colSpan: 2, bold: true, border: [1, 1, 1, 0], color: corAzul }, '', { text: 'CREA-SP:', bold: true, color: 'red', border: [1, 1, 1, 0] }, { text: '5062453248', colSpan: 2, bold: true, border: [1, 1, 1, 0], color: corAzul }, ''],
          [{ border: [1, 0, 1, 1], colSpan: 2, text: '' }, '', { text: '', colSpan: 2, border: [1, 0, 1, 1] }, '', { border: [1, 0, 1, 1], text: 'CFT-SP:', bold: true, color: 'red' }, { border: [1, 0, 1, 1], text: '260208988', colSpan: 2, bold: true, color: corAzul }, ''],
        ],
      },
      margin: [14, 65, 10, 0],
      fontSize: 12,
    }];

  const mapPontos = await Promise.all(pontosLaudoInstalacao.map(async (ponto, i) => {
    const imagensPonto = ponto.imagesPontoLaudo;
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
      imagensDataUri = [{ image: imagensUp[0], width: 200, height: 200, alignment: 'center', colSpan: 9, border: [1, 1, 1, 0] }, '', '', '', '', '', '', '', ''];
    } else if (imagensUp.length === 2) {
      imagensDataUri = [
        { image: imagensUp[0], width: 200, height: 200, alignment: 'right', colSpan: 4, border: [1, 1, 0, 0] }, '', '', '',
        { text: '', border: [0, 1, 0, 0] },
        { image: imagensUp[1], width: 200, height: 200, alignment: 'left', colSpan: 4, border: [0, 1, 1, 0] }, '', '', '',
      ];
    } else if (imagensUp.length === 3) {
      imagensDataUri = [
        { image: imagensUp[0], width: 160, height: 160, alignment: 'center', colSpan: 3, border: [1, 1, 0, 0] }, '', '',
        { image: imagensUp[1], width: 160, height: 160, alignment: 'center', colSpan: 3, border: [0, 1, 0, 0] }, '', '',
        { image: imagensUp[2], width: 160, height: 160, alignment: 'center', colSpan: 3, border: [0, 1, 1, 0] }, '', ''];
    }

    const perguntasCompletas = perguntas.map((pergunta, ind) => {
      const respostas = ponto.respostas.split(',');
      if (respostas[ind] === 'conforme') {
        return [{ colSpan: 6, text: `${pergunta}.`, margin: [0, 0, 0, 0], color: 'red', lineHeight: 1 }, '', '', '', '', '', { text: 'X', alignment: 'center', margin: [0, 5, 0, 5], color: 'mediumblue', bold: true }, '', ''];
      } if (respostas[ind] === 'não conforme') {
        return [{ colSpan: 6, text: `${pergunta}.`, margin: [0, 0, 0, 0], color: 'red', lineHeight: 1 }, '', '', '', '', '', '', { text: 'X', alignment: 'center', margin: [0, 5, 0, 5], color: 'mediumblue', bold: true }, ''];
      }
      return [{ colSpan: 6, text: `${pergunta}.`, margin: [0, 0, 0, 0], color: 'red', lineHeight: 1 }, '', '', '', '', '', '', '', { text: 'X', alignment: 'center', margin: [0, 5, 0, 5], color: 'mediumblue', bold: true }];
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
            [{ colSpan: 2, text: 'Localização:', margin: [0, 5, 0, 5], bold: true, color: 'red', alignment: 'center', border: [1, 1, 1, 0] }, '', { colSpan: 3, margin: [0, 5, 0, 5], text: ponto.nome, bold: true, alignment: 'center', color: 'mediumblue', border: [1, 1, 1, 0] }, '', '', { text: 'Risco:', margin: [0, 5, 0, 5], bold: true, color: 'red', alignment: 'center', border: [1, 1, 1, 0] }, { text: ponto.risco, margin: [0, 5, 0, 5], bold: true, alignment: 'center', color: 'mediumblue', border: [1, 1, 1, 0] }],
          ],
        },
        margin: [14, 65, 10, 0],
        fontSize: 12,
      },
    ],
    [{
      color: '#444',
      table: {
        widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
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
        widths: ['*', '*', '*', '*', '*', '*', 22, 22, 22],
        body: [
          [{ colSpan: 6, text: 'Itens inspecionados', alignment: 'center', margin: [0, 5, 0, 5], color: 'red', bold: true }, '', '', '', '', '', { text: 'CF*', alignment: 'center', margin: [0, 5, 0, 5], color: 'red', bold: true }, { text: 'NC*', alignment: 'center', margin: [0, 5, 0, 5], color: 'red', bold: true }, { text: 'NA*', alignment: 'center', margin: [0, 5, 0, 5], color: 'red', bold: true }],
          ...perguntasCompletas,
        ],
      },
      margin: [14, 0, 10, 0],
      fontSize: 12,
    }],
    [{
      color: '#444',
      table: {
        widths: ['*', '*', '*', '*', '*', '*'],
        body: [
          [{ colSpan: 6, text: 'Diagnóstico:', margin: [0, 5, 0, 0], bold: true, lineHeight: 1, color: 'red', border: [1, 0, 1, 0] }, '', '', '', '', ''],
          [{ colSpan: 6, text: `${ponto.obs}`, bold: true, lineHeight: 4, border: [1, 0, 1, 1], color: 'mediumblue' }, '', '', '', '', ''],
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
        fontSize: 12,
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
          [{ colSpan: 1, text: 'Alta', alignment: 'center', color: 'red', bold: true }, { colSpan: 6, text: prioridadeAlta, color: 'red' }, '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 1, text: 'Média', alignment: 'center', color: 'red', bold: true }, { colSpan: 6, text: prioridadeMedia, color: 'red' }, '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 7, text: '', border: [0, 0, 0, 0] }, '', '', '', '', '', ''],
          [{ colSpan: 1, text: 'Baixa', alignment: 'center', color: 'red', bold: true }, { colSpan: 6, text: prioridadeBaixa, color: 'red' }, '', '', '', '', ''],
        ],
      },
      margin: [14, 65, 10, 0],
      alignment: 'justify',
      fontSize: 12,
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
      fontSize: 12,
    }];

  const styles = {
    tableExample2: { },
  };

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 80],
    content: [
      details,
      ...detailsTexts,
      ...mapPontos,
      paginaFinalUm,
      paginaFinalDois,
    ],
    styles,
    footer() {
      return {
        text: ['Rua: Oswaldo Cruz, 1080 - São Caetano do Sul, SP - CEP: 09541-270', '\n(11) 4361-1703 / (11) 4173-1464 / Emergência (11) 98407-0434',
          '\nE-mail: energe@energeengenharia.com.br - Site: www.energeengenharia.com.br'],
        alignment: 'center',
        fontSize: 12,
        margin: [0, 10, 0, 0],
      };
    },
  };

  pdfMake.createPdf(docDefinitions).download(`${laudo.nome}_${dataAtual}.pdf`);
}
