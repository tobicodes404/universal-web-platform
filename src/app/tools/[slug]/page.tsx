import { notFound } from "next/navigation";
import { tools } from "@/lib/data/tools";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface PageProps {
  params: { slug: string };
}

export default function ToolPage({ params }: PageProps) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Tools", href: "/tools" },
          { label: tool.name },
        ]} 
      />

      {/* Tool Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{tool.name}</h1>
        <p className="text-lg text-gray-600">{tool.description}</p>
      </div>

      {/* Main Tool Interface Area */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-12 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <p className="text-lg font-medium">Tool Interface Loading...</p>
          <p className="text-sm mt-2">This is the placeholder for the {tool.name} functionality.</p>
        </div>
      </div>

      {/* SEO Content / How to Use (Below the tool) */}
      <div className="prose prose-gray max-w-none border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use {tool.name}</h2>
        <p className="text-gray-600 mb-4">
          This is a placeholder for the detailed guide on how to use this tool. 
          In the final version, this section will contain step-by-step instructions, 
          examples, and useful information to help you get the most out of {tool.name}.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Features</h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Fast and secure processing.</li>
          <li>Works directly in your browser.</li>
          <li>No registration required.</li>
        </ul>
      </div>
    </div>
  );
}
