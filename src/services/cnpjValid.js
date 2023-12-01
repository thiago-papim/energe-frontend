export default function isCNPJFormatValid(cnpj) {
  const onlyDigits = cnpj.replace(/\D/g, '');
  const magic = 14;
  if (onlyDigits.length !== magic) {
    return false;
  }
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(cnpj);
}
