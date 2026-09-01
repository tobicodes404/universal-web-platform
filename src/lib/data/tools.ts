export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  query?: string;
}

export interface Category {
  id: string;
  name: string;
}

export const categories = [
  { id: "all", name: "All Tools" },
  { id: "pdf", name: "PDF Tools" },
  { id: "image", name: "Image Tools" },
  { id: "text", name: "Text Tools" },
];

export const tools: Tool[] = [
  // PDF Tools (9 tools)
  { id: "pdf-merge", slug: "pdf-merge", name: "PDF Merge", description: "Combine multiple PDFs into one file.", category: "pdf" },
  { id: "pdf-split", slug: "pdf-split", name: "PDF Split", description: "Extract pages from your PDF.", category: "pdf" },
  { id: "pdf-rotate", slug: "pdf-rotate", name: "PDF Rotate", description: "Rotate PDF pages easily.", category: "pdf" },
  { id: "pdf-delete", slug: "pdf-delete", name: "PDF Delete Pages", description: "Remove unwanted pages from PDF.", category: "pdf" },
  { id: "pdf-reorder", slug: "pdf-reorder", name: "PDF Reorder", description: "Change the order of PDF pages.", category: "pdf" },
  { id: "pdf-pagenumbers", slug: "pdf-pagenumbers", name: "PDF Page Numbers", description: "Add page numbers to your PDF.", category: "pdf" },
  { id: "pdf-watermark", slug: "pdf-watermark", name: "PDF Watermark", description: "Add text watermark to pages.", category: "pdf" },
  { id: "pdf-metadata", slug: "pdf-metadata", name: "PDF Metadata", description: "Edit title, author, and keywords.", category: "pdf" },
  { id: "pdf-compress", slug: "pdf-compress", name: "PDF Compress", description: "Reduce PDF file size.", category: "pdf" },
  
  // Image Tools (9 tools)
  { id: "image-compressor", slug: "image-compressor", name: "Image Compressor", description: "Reduce image size without losing quality.", category: "image" },
  { id: "image-resizer", slug: "image-resizer", name: "Image Resizer", description: "Resize images by pixels or percentage.", category: "image" },
  { id: "image-cropper", slug: "image-cropper", name: "Image Cropper", description: "Crop images to perfect social media ratios.", category: "image" },
  { id: "image-rotator", slug: "image-rotator", name: "Image Rotator", description: "Rotate and flip images easily.", category: "image" },
  { id: "image-format-converter", slug: "image-format-converter", name: "Image Format Converter", description: "Convert between JPG, PNG, WebP, BMP.", category: "image" },
  { id: "image-watermarker", slug: "image-watermarker", name: "Image Watermarker", description: "Add text watermark to protect your photos.", category: "image" },
  { id: "image-color-picker", slug: "image-color-picker", name: "Image Color Picker", description: "Extract HEX, RGB, HSL codes from images.", category: "image" },
  { id: "image-base64", slug: "image-base64", name: "Image to Base64", description: "Convert images to Base64 encoded strings.", category: "image" },
  { id: "photo-adjuster", slug: "photo-adjuster", name: "Photo Adjuster", description: "Apply filters and adjust photos professionally.", category: "image" },
  
  // Text Tools (6 tools)
  { id: "word-counter", slug: "word-counter", name: "Word Counter", description: "Count words, characters, and get advanced text analysis.", category: "text" },
  { id: "case-converter", slug: "case-converter", name: "Case Converter", description: "Convert text to uppercase, lowercase, title case, and more.", category: "text" },
  { id: "lorem-ipsum-generator", slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text in 4 unique flavors.", category: "text" },
  { id: "text-diff-checker", slug: "text-diff-checker", name: "Text Diff Checker", description: "Compare two texts and find differences.", category: "text" },
  { id: "find-replace", slug: "find-replace", name: "Find & Replace", description: "Search and replace text with Regex support.", category: "text" },
  { id: "text-line-tools", slug: "text-line-tools", name: "Text Line Tools", description: "Sort, remove duplicates, reverse & process text line by line.", category: "text" },
];
