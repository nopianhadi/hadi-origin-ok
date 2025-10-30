import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function SolutionWorkflow() {
  const steps = [
    { id: 1, title: "Analisis Masalah", description: "Identifikasi kebutuhan bisnis" },
    { id: 2, title: "Desain Solusi", description: "Rancang solusi optimal" },
    { id: 3, title: "Implementasi", description: "Kembangkan dan deploy" },
    { id: 4, title: "Monitoring", description: "Track dan optimize" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Workflow Solusi</h3>
        <p className="text-muted-foreground">Proses pengembangan solusi digital</p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <Card className="p-6 text-center">
              <Badge className="mb-4">{step.id}</Badge>
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
            {index < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
