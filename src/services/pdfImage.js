/* eslint-disable max-len */

import axios from 'axios';

// Substitua 'YOUR_FILE_ID' e 'YOUR_API_KEY' pelos valores corretos
const apiKey = 'AIzaSyCTYUu47Q2FTKeH1WEMym8U4snuRr7GY6o';

export default async function getDirectImageURL(id) {
  const apiUrl = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'image/*',
      },
    });

    const arrayBuffer = response.data;
    const base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const directImageUrl = `data:image/*;base64,${base64}`;

    return directImageUrl;
  } catch (error) {
    console.error('Erro ao obter URL direta da imagem:', error);
    return null;
  }
}
