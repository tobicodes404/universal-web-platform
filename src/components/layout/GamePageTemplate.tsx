interface GamePageTemplateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  rules?: React.ReactNode;
  stats?: { label: string; value: string | number }[];
}

export function GamePageTemplate({
  title,
  description,
  icon,
  children,
  rules,
  stats,
}: GamePageTemplateProps) {
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

      {/* Game Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Game Interface */}
      <div className="mb-8">
        {children}
      </div>

      {/* Rules Section */}
      {rules && (
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <div className="prose prose-gray max-w-none">
            {rules}
          </div>
        </section>
      )}
    </div>
  );
}
