import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle2 } from "lucide-react";

export default function CostBreakdown() {
  const packages = [
    {
      name: "Basic",
      price: "15 - 30 Juta",
      features: ["Landing Page", "Responsive Design", "Basic SEO", "3 Revisi", "1 Bulan Support"]
    },
    {
      name: "Professional",
      price: "30 - 60 Juta",
      features: ["Company Profile", "Admin Panel", "Database Integration", "5 Revisi", "3 Bulan Support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "60 - 150 Juta",
      features: ["Custom System", "Mobile App", "API Integration", "Unlimited Revisi", "6 Bulan Support"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Estimasi Biaya</h3>
        <p className="text-muted-foreground">Paket yang disesuaikan dengan kebutuhan Anda</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <Card key={index} className={`p-6 relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
            {pkg.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Paling Populer
              </Badge>
            )}
            
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold mb-2">{pkg.name}</h4>
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                <DollarSign className="w-6 h-6" />
                <span>{pkg.price}</span>
              </div>
            </div>

            <ul className="space-y-3">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-center text-muted-foreground">
          💡 <strong>Catatan:</strong> Harga dapat disesuaikan berdasarkan kompleksitas dan fitur tambahan yang dibutuhkan
        </p>
      </div>
    </div>
  );
}
