import ComingSoon from "@/components/ui/coming-soon";

export const metadata = {
  title: "Learn - Coming Soon",
  description: "Educational content and tutorials are coming soon. Learn how to use our tools effectively!",
};

export default function LearnPage() {
  return (
    <ComingSoon 
      title="Learn Section Coming Soon" 
      description="We're creating helpful guides, tutorials, and educational content to help you make the most of our tools. Stay tuned!"
      backLink="/"
    />
  );
}
