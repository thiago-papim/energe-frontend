import axios from 'axios';

export default async function getDirectImageURL(s3Key) {
  try {
    const response = await axios.get(`https://energeengenharia.com:3002/aws?awsUrl=${s3Key}`);
    const responseTwo = await axios.get(response.data, { responseType: 'arraybuffer' });
    if (!responseTwo.data || !responseTwo.data.byteLength) {
      console.error('Dados da imagem ausentes na resposta.');
      return null;
    }
    const arrayBuffer = responseTwo.data;
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
