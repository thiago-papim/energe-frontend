import axios from 'axios';

export default async function getDirectImageURL(s3Key) {
  try {
    const response = await axios.post('https://energeengenharia.com:3002/aws', { awsUrl: s3Key });
    return response.data;
  } catch (error) {
    console.log('errrroooooo');
    console.error('Erro ao obter imagem do S3:', error.response);
    return null;
  }
}
