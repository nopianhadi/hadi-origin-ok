import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp } from "lucide-react";

export default function ROICalculator() {
  const [projectCost, setProjectCost] = useState<number>(50000000);
  const [monthlySavings, setMonthlySavings] = useState<number>(5000000);
  const [result, setResult] = useState<{
    roi: number;
    breakeven: number;
    yearlyReturn: number;
  } | null>(null);

  const calculateROI = () => {
    const yearlyReturn = monthlySavings * 12;
    const roi = ((yearlyReturn - projectCost) / projectCost) * 100;
    const breakeven = projectCost / monthlySavings;

    setResult({
      roi: Math.round(roi * 100) / 100,
      breakeven: Math.round(breakeven * 10) / 10,
      yearlyReturn
    });
  };

  const handleProjectCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectCost(Number(e.target.value));
  };

  const handleMonthlySavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlySavings(Number(e.target.value));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Kalkulator ROI</h3>
        <p className="text-muted-foreground">
          Hitung estimasi Return on Investment untuk proyek Anda
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectCost">Biaya Proyek (Rp)</Label>
              <Input
                id="projectCost"
                type="number"
                value={projectCost}
                onChange={handleProjectCostChange}
                placeholder="50000000"
              />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(projectCost)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlySavings">Penghematan/Keuntungan per Bulan (Rp)</Label>
              <Input
                id="monthlySavings"
                type="number"
                value={monthlySavings}
                onChange={handleMonthlySavingsChange}
                placeholder="5000000"
              />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(monthlySavings)}
              </p>
            </div>
          </div>

          <Button onClick={calculateROI} className="w-full" size="lg">
            <Calculator className="w-5 h-5 mr-2" />
            Hitung ROI
          </Button>

          {result && (
            <div className="grid md:grid-cols-3 gap-4 pt-6 border-t">
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">ROI Tahunan</p>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {result.roi > 0 ? '+' : ''}{result.roi}%
                </p>
              </Card>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-900">Break Even</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {result.breakeven} Bulan
                </p>
              </Card>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-semibold text-purple-900">Return Tahunan</p>
                </div>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(result.yearlyReturn)}
                </p>
              </Card>
            </div>
          )}

          {result && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Dengan investasi {formatCurrency(projectCost)}, Anda dapat mencapai break-even 
                dalam <strong>{result.breakeven} bulan</strong> dan mendapatkan return tahunan sebesar{' '}
                <strong>{formatCurrency(result.yearlyReturn)}</strong> ({result.roi > 0 ? '+' : ''}{result.roi}% ROI).
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
