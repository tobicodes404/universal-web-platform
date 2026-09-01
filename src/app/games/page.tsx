import ComingSoon from "@/components/ui/coming-soon";

export const metadata = {
  title: "Games - Coming Soon",
  description: "Interactive games and challenges are coming soon. Stay tuned for fun ways to practice and learn!",
};

export default function GamesPage() {
  return (
    <ComingSoon 
      title="Games Coming Soon" 
      description="We're building interactive games and challenges to help you practice and learn in a fun way. Check back soon!"
      backLink="/"
    />
  );
}
