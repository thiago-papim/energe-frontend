/* eslint-disable max-lines */
/* eslint-disable func-names */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import pdfMake from 'pdfmake/build/pdfmake';
import JsBarcode from 'jsbarcode';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { obterDataFormatada } from '../../../../services/datasEmissaoValidade';
import { resultImageTable, resultImageLogo } from '../../../../services/imagemEnsaio';

export default async function gerarPdfEnsaioEquipamento(ensaio) {
  const normas = 'NBR14540/NBR11854/ASTMF711/NR-10';
  const { empresa, pontosEnsaioEquipamento } = ensaio;
  const endereco = `${empresa.rua}, ${empresa.numero}.`;
  const imageTable = await resultImageTable();
  const imageLogo = await resultImageLogo();
  const dataAtual = obterDataFormatada();

  const generateBarcode = (text, customText) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, text, { format: 'CODE128', background: false, text: customText });
    return canvas.toDataURL('image/png');
  };

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const details = pontosEnsaioEquipamento.map((ponto, i) => {
    console.log(ponto);
    const validPage = i === 0;
    const marginResult = () => {
      if (ponto.ladoDireito === '<16' && ponto.ladoEsquerdo === '<16') {
        return [101, 62, 0, 0];
      }
      return [108, 79, 0, 0];
    };
    const observacao = () => {
      if (ponto.ladoDireito === '<16' && ponto.ladoEsquerdo === '<16') {
        return {
          body: { text: 'Recomendamos próximos ensaios dentro do prazo de 12 meses.', color: 'red', alignment: 'center', border: [0, 0, 0, 0] },
          margin: [16, 62, 0, 0],
        };
      }
      return {
        body: { text: ponto.obs, color: 'red', alignment: 'center', border: [0, 0, 0, 0] },
        margin: [0, 38, 0, 0],
      };
    };
    return [
      {
        pageBreak: validPage ? '' : 'before',
        image: imageLogo,
        width: 600,
        absolutePosition: { x: 0, y: 0 },
      },
      {
        image: imageTable,
        width: 542,
        margin: [14, 65, 10, 0],
        absolutePosition: { x: 29, y: 135 },
      },
      {
        color: '#444',
        table: {
          widths: [65, 65, '*', 30, 88, 'auto', 'auto'],
          body: [
            [
              { colSpan: 1, text: '', color: 'mediumred', border: [0, 0, 0, 0] },
              { colSpan: 2, text: `${empresa.nome}`, color: 'red', border: [0, 0, 0, 0] }, '', { colSpan: 4, text: `${dataAtual}`, margin: [53, 0, 0, 0], color: 'red', border: [0, 0, 0, 0] }, '', '', ''],
            [
              { colSpan: 1, text: '', color: 'mediumred', border: [0, 0, 0, 0] },
              { colSpan: 2, text: `${endereco}`, color: 'red', border: [0, 0, 0, 0] }, '', { colSpan: 4, text: `${empresa.cidade}`, margin: [65, 0, 0, 0], color: 'red', border: [0, 0, 0, 0] }, '', '', ''],
          ],
        },
        margin: [0, 20, 10, 0],
        fontSize: 12,
      },
      {
        color: '#444',
        table: {
          widths: [251, 268],
          body: [
            [
              { colSpan: 1, text: ponto.nome, alignment: 'center', color: 'mediumred', border: [0, 0, 0, 0] }, { colSpan: 1, text: normas, alignment: 'center', color: 'mediumred', border: [0, 0, 0, 0] }],
          ],
        },
        margin: [16, 142.5, 10, 0],
        fontSize: 12,
      },
      {
        color: '#444',
        table: {
          widths: [65],
          body: [
            [
              { text: ponto.ladoDireito, color: 'mediumblue', border: [0, 0, 0, 0] }],
            [
              { text: ponto.ladoEsquerdo, color: 'mediumblue', border: [0, 0, 0, 0] }],
          ],
        },
        margin: [495, 81.5, 0, 0],
        fontSize: 12,
      },
      {
        color: '#444',
        table: {
          widths: [65],
          body: [
            [
              { text: 'X', color: 'mediumblue', border: [0, 0, 0, 0] }],
          ],
        },
        margin: marginResult(),
        fontSize: 12,
      },
      {
        image: generateBarcode('123456789', `*10000000${i + 1}*`),
        width: 250,
        height: 70,
        absolutePosition: { x: 303, y: 220 },
      },
      {
        color: '#444',
        table: {
          widths: [528],
          body: [
            [
              observacao().body,
            ],
          ],
        },
        margin: observacao().margin,
        fontSize: 12,
      },
    ];
  });

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 80],
    content: [
      details,
    ],
    footer() {
      return {
        text: ['Rua: Oswaldo Cruz, 1080 - São Caetano do Sul, SP - CEP: 09541-270', '\n(11) 4361-1703 / (11) 4173-1464 / Emergência (11) 98407-0434',
          '\nE-mail: energe@energeengenharia.com.br - Site: www.energeengenharia.com.br'],
        alignment: 'center',
        fontSize: 12,
        margin: [0, -10, 0, 0],
      };
    },
  };

  pdfMake.createPdf(docDefinitions).download(`${ensaio.nome}_${dataAtual}.pdf`);
}
