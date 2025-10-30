import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Calendar } from "lucide-react";

export default function EnhancedCTA() {
  return (
    <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="text-center space-y-6">
        <h3 className="text-3xl font-bold">Siap Transformasi Digital?</h3>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Konsultasikan kebutuhan bisnis Anda dengan tim expert kami. 
          Gratis konsultasi dan estimasi project.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="gap-2">
            <MessageSquare className="w-5 h-5" />
            Konsultasi Gratis
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Calendar className="w-5 h-5" />
            Jadwalkan Meeting
          </Button>
        </div>
        
        <p className="text-sm opacity-75">
          ⚡ Response time: &lt; 24 jam | 🎯 100+ Project Selesai | ⭐ 4.9/5 Rating
        </p>
      </div>
    </Card>
  );
}
