import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FramerLanding from "@/components/FramerLanding";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <FramerLanding />
      </main>
      <Footer />
    </div>
  );
}
