// This mock prevents pdfjs-dist from crashing during Next.js Turbopack build
const mockCanvas = {
  getContext: () => null,
  width: 0,
  height: 0,
  toDataURL: () => '',
};

export default {
  createCanvas: () => mockCanvas,
};
