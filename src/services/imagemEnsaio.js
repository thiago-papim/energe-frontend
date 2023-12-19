/* eslint-disable no-magic-numbers */

import table from '../imagens/testeEnsaio.png';
import logo from '../imagens/fundoPdf.jpg';

export function getArrayBufferFromImage(imagePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imagePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = () => {
      if (xhr.status === 200) {
        const arrayBuffer = xhr.response;
        resolve(arrayBuffer);
      } else {
        reject(new Error(`Erro ao carregar a imagem. Status: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Erro de rede ao carregar a imagem.'));
    };

    xhr.send();
  });
}

export async function resultImageTable() {
  try {
    const imagePath = table;

    const arrayBuffer = await getArrayBufferFromImage(imagePath);

    const base64 = btoa(new Uint8Array(arrayBuffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const directImageUrl = `data:image/jpeg;base64,${base64}`;
    return directImageUrl;
  } catch (error) {
    console.error('Erro ao obter URL direta da imagem:', error);
    return null;
  }
}

export async function resultImageLogo() {
  try {
    const imagePath = logo;

    const arrayBuffer = await getArrayBufferFromImage(imagePath);

    const base64 = btoa(new Uint8Array(arrayBuffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const directImageUrl = `data:image/jpeg;base64,${base64}`;
    return directImageUrl;
  } catch (error) {
    console.error('Erro ao obter URL direta da imagem:', error);
    return null;
  }
}
