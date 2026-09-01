import { PDFDocument, degrees, StandardFonts, rgb, PDFPage } from 'pdf-lib';

self.onmessage = async (event) => {
  const { type, payload } = event.data;

  try {
    if (type === 'GET_INFO') {
      const pdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      self.postMessage({ type: 'INFO_SUCCESS', pageCount: pdf.getPageCount(), id: payload.id });
    } 
    else if (type === 'MERGE') {
      const mergedPdf = await PDFDocument.create();
      let processed = 0;
      for (const fileBytes of payload.files) {
        const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        processed++;
        self.postMessage({ type: 'PROGRESS', progress: (processed / payload.files.length) * 100 });
      }
      const pdfBytes = await mergedPdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'merged-document.pdf' });
    } 
    else if (type === 'SPLIT') {
      const srcPdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      const totalPages = srcPdf.getPageCount();
      const mode = payload.mode || 'extract';
      
      if (mode === 'extract') {
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(srcPdf, payload.pages);
        copiedPages.forEach((page) => newPdf.addPage(page));
        const pdfBytes = await newPdf.save();
        self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'split-extracted.pdf' });
      } 
      else if (mode === 'every-n') {
        const n = payload.n || 2;
        const results = [];
        for (let i = 0; i < totalPages; i += n) {
          const chunk = [];
          for (let j = i; j < Math.min(i + n, totalPages); j++) chunk.push(j);
          const newPdf = await PDFDocument.create();
          const copied = await newPdf.copyPages(srcPdf, chunk);
          copied.forEach((p) => newPdf.addPage(p));
          const bytes = await newPdf.save();
          results.push({ bytes, name: `split-pages-${i + 1}-${i + chunk.length}.pdf` });
        }
        self.postMessage({ type: 'SUCCESS_MULTI', results });
      } 
      else if (mode === 'all') {
        const results = [];
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copied] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(copied);
          const bytes = await newPdf.save();
          results.push({ bytes, name: `page-${i + 1}.pdf` });
        }
        self.postMessage({ type: 'SUCCESS_MULTI', results });
      }
    } 
    else if (type === 'ROTATE') {
      const pdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      const pdfPages = pdf.getPages();
      payload.pages.forEach((pageIndex: number) => {
        if (pdfPages[pageIndex]) {
          const currentRotation = pdfPages[pageIndex].getRotation().angle;
          pdfPages[pageIndex].setRotation(degrees(currentRotation + payload.angle));
        }
      });
      const pdfBytes = await pdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'rotated-document.pdf' });
    } 
    else if (type === 'DELETE') {
      const srcPdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      const newPdf = await PDFDocument.create();
      const totalPages = srcPdf.getPageCount();
      const pagesToKeep = [];
      for (let i = 0; i < totalPages; i++) {
        if (!payload.pagesToDelete.includes(i)) pagesToKeep.push(i);
      }
      const copiedPages = await newPdf.copyPages(srcPdf, pagesToKeep);
      copiedPages.forEach((page) => newPdf.addPage(page));
      const pdfBytes = await newPdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'modified-document.pdf' });
    }
    else if (type === 'REORDER') {
      const srcPdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, payload.order);
      copiedPages.forEach((page) => newPdf.addPage(page));
      const pdfBytes = await newPdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'reordered-document.pdf' });
    }
    else if (type === 'PAGE_NUMBERS') {
      const pdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const size = Number(payload.size) || 12;
      const position = payload.position || 'bottom-center';
      
      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const text = String(index + 1);
        const textWidth = font.widthOfTextAtSize(text, size);
        let x = width / 2 - textWidth / 2;
        let y = 30;
        
        if (position === 'top-center') { x = width / 2 - textWidth / 2; y = height - 30; }
        else if (position === 'bottom-right') { x = width - textWidth - 30; y = 30; }
        else if (position === 'bottom-left') { x = 30; y = 30; }
        else if (position === 'top-right') { x = width - textWidth - 30; y = height - 30; }
        else if (position === 'top-left') { x = 30; y = height - 30; }
        
        page.drawText(text, { x, y, size, font, color: rgb(0.2, 0.2, 0.2) });
      });
      const pdfBytes = await pdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'numbered-document.pdf' });
    }
    else if (type === 'COMPRESS') {
      const pdf = await PDFDocument.load(payload.file, { ignoreEncryption: true, updateMetadata: false });
      // Basic optimization: remove metadata and use object streams
      pdf.setTitle('');
      pdf.setAuthor('');
      pdf.setSubject('');
      pdf.setKeywords([]);
      pdf.setProducer('');
      pdf.setCreator('');
      const pdfBytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'compressed-document.pdf', originalSize: payload.originalSize, newSize: pdfBytes.length });
    }
    else if (type === 'METADATA') {
      const pdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      if (payload.title !== undefined) pdf.setTitle(payload.title);
      if (payload.author !== undefined) pdf.setAuthor(payload.author);
      if (payload.subject !== undefined) pdf.setSubject(payload.subject);
      if (payload.keywords !== undefined) pdf.setKeywords(payload.keywords.split(',').map((k: string) => k.trim()));
      const pdfBytes = await pdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'metadata-updated.pdf' });
    }
    else if (type === 'WATERMARK') {
      const pdf = await PDFDocument.load(payload.file, { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();
      const text = payload.text || 'CONFIDENTIAL';
      const size = Number(payload.size) || 50;
      const opacity = Number(payload.opacity) || 0.3;

      pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - (text.length * size) / 4,
          y: height / 2,
          size: size,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity,
          rotate: degrees(45),
        });
      });
      const pdfBytes = await pdf.save();
      self.postMessage({ type: 'SUCCESS', result: pdfBytes, filename: 'watermarked-document.pdf' });
    }
  } catch (error: any) {
    self.postMessage({ type: 'ERROR', error: error.message || 'An unknown error occurred' });
  }
};
