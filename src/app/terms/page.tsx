export const metadata = {
  title: "Terms of Service - Universal Web Platform",
  description: "Read our terms of service. Free to use, no registration required, 100% browser-based processing.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-6 tracking-tight">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-text-primary font-medium">
              Welcome to Universal Web Platform! By using our services, you agree to these terms.
            </p>
            <p className="text-text-secondary text-sm mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              By accessing and using Universal Web Platform ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Description of Service</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Universal Web Platform provides free online tools for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>PDF manipulation (merge, split, rotate, compress, etc.)</li>
              <li>Image processing (compress, resize, crop, convert, etc.)</li>
              <li>Text utilities (word counter, case converter, etc.)</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              All processing happens in your browser. We do not store or transmit your files.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Free Service</h2>
            <p className="text-text-secondary leading-relaxed">
              Our service is currently <strong>100% free</strong> to use. No registration or payment is required. We reserve the right to introduce paid features in the future, but core functionality will remain free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. User Responsibilities</h2>
            <p className="text-text-secondary leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to disrupt or interfere with the service</li>
              <li>Not use the service to process illegal or harmful content</li>
              <li>Respect intellectual property rights</li>
              <li>Not reverse engineer or copy our tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Privacy & Data</h2>
            <p className="text-text-secondary leading-relaxed">
              Your privacy is important to us. Please read our{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{' '}
              to understand how we protect your data. In summary: we do not collect, store, or transmit your files.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              The service is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy of processed results</li>
              <li>Compatibility with all devices or browsers</li>
              <li>That the service will meet your requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Limitation of Liability</h2>
            <p className="text-text-secondary leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Changes to Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the updated terms on this page. Your continued use of the service after such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">9. Contact Information</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have questions about these terms, please contact us at:{' '}
              <a href="mailto:legal@yourdomain.com" className="text-primary hover:underline">
                legal@yourdomain.com
              </a>
            </p>
          </section>

          <div className="bg-surface border border-border rounded-xl p-6 mt-12">
            <p className="text-sm text-text-muted text-center">
              By using Universal Web Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
