export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export const articles: Article[] = [
  { slug: "what-is-good-typing-speed", title: "What Is a Good Typing Speed?", description: "Learn about average typing speeds and how to improve yours.", category: "Typing" },
  { slug: "how-to-improve-memory", title: "How to Improve Your Memory", description: "Practical techniques to enhance your memory and recall.", category: "Skills" },
  { slug: "how-image-compression-works", title: "How Image Compression Works", description: "Understand the basics of image compression and file formats.", category: "Technology" },
];
