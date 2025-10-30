import { Card } from "@/components/ui/card";
import { Settings, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Plan & Configure",
    description: "Tentukan fitur, AI agent, dan data yang ingin digunakan.",
    icon: Settings,
  },
  {
    number: "02",
    title: "Develop & Integrate",
    description: "Saya bangun aplikasi dengan React, Supabase, atau Next.js.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Deploy & Scale",
    description: "Integrasi ke cloud atau on-premise dengan AI Assistant siap pakai.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Dari Ide ke Dashboard Cerdas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proses pengembangan yang terstruktur untuk hasil maksimal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className="relative p-8 hover-elevate overflow-visible backdrop-blur-sm bg-white/80 border-white/20 shadow-lg"
                data-testid={`card-step-${index + 1}`}
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-mono text-muted-foreground">{step.number}</div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-chart-2 to-transparent" />
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
