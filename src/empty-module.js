// Turbopack build এর সময় canvas মডিউলকে ফাঁকা অবজেক্ট দিয়ে রিপ্লেস করে
export const createCanvas = () => ({});
export const Canvas = {};
export const Image = {};
export const ImageData = {};
export const Path2D = {};

export default {
  createCanvas,
  Canvas,
  Image,
  ImageData,
  Path2D,
};
