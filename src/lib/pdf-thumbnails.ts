export interface PageThumbnail {
  pageNumber: number;
  dataUrl: string;
}

export async function generateThumbnails(file: File, maxPages = 50): Promise<{ thumbnails: PageThumbnail[]; totalPages: number }> {
  // ডায়নামিক ইমপোর্ট ব্যবহার করা হচ্ছে যাতে SSR এর সময় canvas এরর না আসে
  const pdfjsLib = await import('pdfjs-dist');
  
  // CDN থেকে ওয়ার্কার লোড করা হচ্ছে
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = Math.min(pdf.numPages, maxPages);
  const thumbnails: PageThumbnail[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    // থাম্বনেলের জন্য স্কেল কম রাখা হয়েছে যাতে মেমোরি না ফুরায়
    const viewport = page.getViewport({ scale: 0.4 }); 
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) continue;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    
    thumbnails.push({
      pageNumber: i,
      dataUrl: canvas.toDataURL('image/jpeg', 0.7)
    });
  }

  return { thumbnails, totalPages: pdf.numPages };
}
