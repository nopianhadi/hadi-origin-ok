import { 
  ModernCard, 
  ModernCardContent, 
  ModernCardTitle, 
  ModernCardDescription,
  ModernCardValue,
  ModernCardBadge 
} from "@/components/ui/modern-card";
import { CreditCard, Wallet, TrendingUp, DollarSign, Award, Zap } from "lucide-react";

export default function ModernCardShowcase() {
  const cardData = [
    {
      variant: "blue" as const,
      icon: CreditCard,
      title: "John Smith",
      description: "Amazon Platinium",
      cardNumber: "4756 •••• •••• 9018",
      balance: "$3,469.52",
      badge: "VISA"
    },
    {
      variant: "orange" as const,
      icon: Wallet,
      title: "John Smith",
      description: "Amazon Platinium",
      cardNumber: "4756 •••• •••• 9018",
      balance: "$3,469.52",
      badge: "Mastercard"
    },
    {
      variant: "purple" as const,
      icon: Award,
      title: "Sarah Johnson",
      description: "Premium Rewards",
      cardNumber: "6011 •••• •••• 3456",
      balance: "$5,892.34",
      badge: "Discover"
    },
    {
      variant: "green" as const,
      icon: TrendingUp,
      title: "Mike Anderson",
      description: "Investment Account",
      cardNumber: "3782 •••• •••• 1009",
      balance: "$12,456.78",
      badge: "AMEX"
    }
  ];

  const statsCards = [
    {
      variant: "blue" as const,
      icon: DollarSign,
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      description: "from last month"
    },
    {
      variant: "orange" as const,
      icon: TrendingUp,
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      description: "from last month"
    },
    {
      variant: "purple" as const,
      icon: Award,
      title: "Sales",
      value: "+12,234",
      change: "+19%",
      description: "from last month"
    },
    {
      variant: "green" as const,
      icon: Zap,
      title: "Active Now",
      value: "573",
      change: "+201",
      description: "since last hour"
    }
  ];

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      
      <div className="max-w-md mx-auto relative z-10">
        
        {/* Mobile Status Bar */}
        <div className="flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-900">
          <span>9:09</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10h14M7 14h10" />
            </svg>
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-6">
          {/* Mobile App Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Choose card
            </h1>
            <div className="w-10"></div>
          </div>

        {/* Credit Cards - Mobile Banking Style */}
        <section className="space-y-4">
          <div className="space-y-4">
            {cardData.slice(0, 2).map((card, index) => {
              const Icon = card.icon;
              return (
                <ModernCard 
                  key={index} 
                  variant={card.variant}
                  className="animate-slide-up cursor-pointer hover:scale-[1.02] transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  decorative={true}
                >
                  <ModernCardBadge className="text-base sm:text-lg font-bold">{card.badge}</ModernCardBadge>
                  <ModernCardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{card.title}</h3>
                        <p className="text-sm sm:text-base text-white/80">
                          {card.description}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-base sm:text-lg font-mono tracking-wider text-white/90">
                          {card.cardNumber}
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{card.balance}</p>
                      </div>
                    </div>
                  </ModernCardContent>
                </ModernCard>
              );
            })}
          </div>

          {/* Add New Card Button */}
          <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Add new card</span>
          </button>
        </section>

        {/* Mobile Bottom Indicator */}
        <div className="flex justify-center py-4">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>

        </div>
      </div>
    </div>
  );
}
