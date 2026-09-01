"use client";

import { cn } from "@/lib/utils/cn";

interface TabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const activeTab = typeof window !== "undefined" 
    ? (localStorage.getItem("activeTab") || defaultTab || tabs[0].id)
    : (defaultTab || tabs[0].id);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => localStorage.setItem("activeTab", tab.id)}
              className={cn(
                "border-b-2 py-4 px-1 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
