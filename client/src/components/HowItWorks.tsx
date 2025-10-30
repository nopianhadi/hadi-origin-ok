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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32" id="solutions">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
            Dari Ide ke Dashboard Cerdas
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Proses pengembangan yang terstruktur untuk hasil maksimal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className="relative p-4 sm:p-6 md:p-8 hover-elevate overflow-visible backdrop-blur-sm bg-white/80 border-white/20 shadow-lg"
                data-testid={`card-step-${index + 1}`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="text-xs sm:text-sm font-mono text-muted-foreground">{step.number}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{step.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
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
