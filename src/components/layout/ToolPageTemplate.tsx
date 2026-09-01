interface ToolPageTemplateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  howToUse?: React.ReactNode;
  relatedTools?: Array<{ name: string; href: string }>;
}

export function ToolPageTemplate({
  title,
  description,
  icon,
  children,
  howToUse,
  relatedTools,
}: ToolPageTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        </div>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Main Tool Interface */}
      <div className="mb-12">
        {children}
      </div>

      {/* How to Use Section */}
      {howToUse && (
        <section className="mb-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <div className="prose prose-gray max-w-none">
            {howToUse}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-blue-600 mb-1">{tool.name}</h3>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
