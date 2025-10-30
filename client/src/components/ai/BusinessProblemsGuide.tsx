import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, Users, BarChart3 } from "lucide-react";

export default function BusinessProblemsGuide() {
  const problems = [
    { icon: TrendingDown, title: "Penjualan Menurun", description: "Solusi untuk meningkatkan konversi" },
    { icon: Users, title: "Engagement Rendah", description: "Tingkatkan interaksi customer" },
    { icon: BarChart3, title: "Operasional Tidak Efisien", description: "Otomasi proses bisnis" },
    { icon: AlertCircle, title: "Kompetisi Ketat", description: "Diferensiasi dengan teknologi" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Masalah Bisnis Umum</h3>
        <p className="text-muted-foreground">Kami membantu menyelesaikan berbagai tantangan bisnis</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((problem, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-2">{problem.title}</h4>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
