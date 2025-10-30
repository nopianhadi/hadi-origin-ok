import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      company: "PT. Retail Indonesia",
      industry: "Retail",
      problem: "Sistem inventory manual menyebabkan stok tidak akurat",
      solution: "Sistem inventory otomatis dengan real-time tracking",
      results: ["Efisiensi +45%", "Error -80%", "ROI 6 bulan"],
      image: "🏪"
    },
    {
      company: "Klinik Sehat Bersama",
      industry: "Healthcare",
      problem: "Antrian panjang dan data pasien tidak terorganisir",
      solution: "Sistem booking online dan rekam medis digital",
      results: ["Waktu tunggu -60%", "Kepuasan +75%", "ROI 8 bulan"],
      image: "🏥"
    },
    {
      company: "Logistik Express",
      industry: "Logistics",
      problem: "Tracking pengiriman manual dan tidak real-time",
      solution: "Platform tracking otomatis dengan GPS integration",
      results: ["Transparansi +90%", "Komplain -70%", "ROI 5 bulan"],
      image: "🚚"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Studi Kasus Sukses</h3>
        <p className="text-muted-foreground">
          Lihat bagaimana kami membantu bisnis lain mengatasi masalah mereka
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cases.map((caseStudy, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{caseStudy.image}</div>
            
            <Badge className="mb-3">{caseStudy.industry}</Badge>
            
            <h4 className="font-bold text-lg mb-2">{caseStudy.company}</h4>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-semibold text-red-600">Masalah:</p>
                <p className="text-sm text-muted-foreground">{caseStudy.problem}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-green-600">Solusi:</p>
                <p className="text-sm text-muted-foreground">{caseStudy.solution}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Hasil:
              </p>
              {caseStudy.results.map((result, idx) => (
                <Badge key={idx} variant="outline" className="mr-2">
                  {result}
                </Badge>
              ))}
            </div>

            <Button variant="outline" className="w-full" size="sm">
              Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
