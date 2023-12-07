import axios from 'axios';

export default async function getDirectImageURL(s3Key) {
  try {
    const s3Url = `https://energe.s3.amazonaws.com/${s3Key}`;
    const response = await axios.get(s3Url, { responseType: 'arraybuffer' });
    console.log(response);
    if (!response.data || !response.data.byteLength) {
      console.error('Dados da imagem ausentes na resposta.');
      return null;
    }
    const arrayBuffer = response.data;
    const base64 = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );

    const dataURI = `data:image/jpeg;base64,${base64}`;

    return dataURI;
  } catch (error) {
    console.error('Erro ao obter imagem do S3:', error);
    return null;
  }
}
