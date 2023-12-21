import Compressor from 'compressorjs';

export const compressImage = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    const compressor = new Compressor(file, {
      quality: 0.6,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });

    compressor.compress();
  });
};
