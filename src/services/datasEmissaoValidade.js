export function obterDataFormatada(vencimento) {
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // O mês começa do zero, então é necessário adicionar 1
  const ano = dataAtual.getFullYear();
  if (vencimento) {
    return `${dia}/${mes}/${ano + 1}`;
  }
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}
