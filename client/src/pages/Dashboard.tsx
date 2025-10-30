import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DashboardShowcase from "@/components/DashboardShowcase";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <DashboardShowcase />
      </main>
      <Footer />
    </div>
  );
}
