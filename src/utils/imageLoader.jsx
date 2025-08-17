const imageCache = {};

/**
 * @param {string} src 
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  if (imageCache[src]) {
    return Promise.resolve(imageCache[src]);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageCache[src] = img;
      resolve(img);
    };
    img.onerror = (err) => {
      console.error(`Failed to load image: ${src}`, err);
      reject(err);
    };
  });
}
