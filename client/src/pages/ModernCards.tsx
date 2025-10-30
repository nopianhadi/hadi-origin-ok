import ModernCardShowcase from "@/components/ModernCardShowcase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ModernCards() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <ModernCardShowcase />
      </main>
      <Footer />
    </div>
  );
}
