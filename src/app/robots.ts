export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://universal-platform.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
