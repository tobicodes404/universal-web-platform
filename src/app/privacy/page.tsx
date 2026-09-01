export const metadata = {
  title: "Privacy Policy - Universal Web Platform",
  description: "Learn how we protect your privacy. All processing happens in your browser - your files never leave your device.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-6 tracking-tight">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-text-primary font-medium mb-2">
              Your privacy is our top priority. We've designed our tools to be 100% private and secure.
            </p>
            <p className="text-text-secondary text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. How We Process Your Data</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              All file processing (PDF, Image, Text tools) happens <strong>100% in your browser</strong> using modern web technologies. Your files are <strong>never uploaded to our servers</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>No files are stored on our servers</li>
              <li>No data is transmitted over the internet</li>
              <li>All processing uses client-side JavaScript</li>
              <li>Your files remain completely private</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Information We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We collect <strong>minimal information</strong> to improve our service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li><strong>Analytics Data:</strong> Page views, tool usage statistics (no personal data)</li>
              <li><strong>Error Logs:</strong> Technical errors to fix bugs (no file content)</li>
              <li><strong>Cookies:</strong> Essential cookies for site functionality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. What We Don't Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>❌ Your files and documents</li>
              <li>❌ Personal information (name, email, etc.)</li>
              <li>❌ IP addresses (unless required by law)</li>
              <li>❌ Browsing history outside our site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Third-Party Services</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We use minimal third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
              <li><strong>Hosting Provider:</strong> For website hosting (no file storage)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Your Rights</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>Use our tools without providing personal information</li>
              <li>Clear your browser data at any time</li>
              <li>Request information about data we may have collected</li>
              <li>Opt-out of analytics tracking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have questions about this privacy policy, please contact us at:{' '}
              <a href="mailto:privacy@yourdomain.com" className="text-primary hover:underline">
                privacy@yourdomain.com
              </a>
            </p>
          </section>

          <div className="bg-surface border border-border rounded-xl p-6 mt-12">
            <p className="text-sm text-text-muted text-center">
              By using our website, you agree to this privacy policy. We reserve the right to update this policy as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
