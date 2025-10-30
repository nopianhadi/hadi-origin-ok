import { Heart, ShoppingCart, DollarSign, GraduationCap, Building2, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const industries = [
  { icon: Heart, name: "Healthcare", color: "text-chart-1" },
  { icon: ShoppingCart, name: "Retail", color: "text-chart-2" },
  { icon: DollarSign, name: "Finance", color: "text-chart-3" },
  { icon: GraduationCap, name: "Education", color: "text-chart-4" },
  { icon: Building2, name: "Government", color: "text-chart-5" },
  { icon: Truck, name: "Logistics", color: "text-chart-1" },
];

export default function Industries() {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
{t('industriesServed.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Setiap industri punya kebutuhan unik — saya bantu membuat solusi digital yang disesuaikan dan cerdas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="flex flex-col items-center gap-3 p-6 rounded-lg hover-elevate group"
                data-testid={`industry-${index + 1}`}
              >
                <div className="w-12 h-12 rounded-lg bg-card border border-card-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Icon className={`w-6 h-6 ${industry.color}`} />
                </div>
                <span className="text-sm font-medium text-center">{industry.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
