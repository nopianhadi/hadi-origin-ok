import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Zap,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface ApiMetric {
  name: string;
  requests: number;
  responseTime: number;
  errorRate: number;
  status: 'healthy' | 'warning' | 'error';
  trend: 'up' | 'down' | 'stable';
}

export default function ApiAnalytics() {
  const [timeRange, setTimeRange] = useState('24h');
  
  const apiMetrics: ApiMetric[] = [
    {
      name: 'OpenAI GPT API',
      requests: 1247,
      responseTime: 850,
      errorRate: 0.2,
      status: 'healthy',
      trend: 'up'
    },
    {
      name: 'Weather API',
      requests: 3421,
      responseTime: 120,
      errorRate: 0.1,
      status: 'healthy',
      trend: 'stable'
    },
    {
      name: 'Payment Gateway',
      requests: 892,
      responseTime: 1200,
      errorRate: 2.1,
      status: 'warning',
      trend: 'down'
    },
    {
      name: 'Image Processing',
      requests: 567,
      responseTime: 2300,
      errorRate: 0.5,
      status: 'healthy',
      trend: 'up'
    }
  ];

  const totalRequests = apiMetrics.reduce((sum, api) => sum + api.requests, 0);
  const avgResponseTime = Math.round(apiMetrics.reduce((sum, api) => sum + api.responseTime, 0) / apiMetrics.length);
  const avgErrorRate = (apiMetrics.reduce((sum, api) => sum + api.errorRate, 0) / apiMetrics.length).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="glass-enhanced hover:shadow-2xl hover:shadow-purple-500/20 rounded-2xl transition-all duration-500">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-60"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl shadow-xl shadow-purple-500/25 border border-white/20 backdrop-blur-sm">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                API Analytics
              </h3>
              <p className="text-sm text-muted-foreground">Performance metrics and usage stats</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 
                  "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : 
                  "glass-button"
                }
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Total Requests</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{totalRequests.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Last {timeRange}</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Avg Response Time</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{avgResponseTime}ms</p>
            <p className="text-xs text-muted-foreground">Across all APIs</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Error Rate</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{avgErrorRate}%</p>
            <p className="text-xs text-muted-foreground">Average across APIs</p>
          </div>
        </div>

        {/* API List */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">API Performance</h4>
          {apiMetrics.map((api, index) => (
            <div key={api.name} className="glass rounded-xl p-4 hover:bg-white/60 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h5 className="font-medium">{api.name}</h5>
                  <Badge className={`gap-1 ${getStatusColor(api.status)}`}>
                    {getStatusIcon(api.status)}
                    {api.status}
                  </Badge>
                </div>
                {getTrendIcon(api.trend)}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Requests</p>
                  <p className="font-semibold">{api.requests.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Response Time</p>
                  <p className="font-semibold">{api.responseTime}ms</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Error Rate</p>
                  <p className="font-semibold">{api.errorRate}%</p>
                </div>
              </div>
              
              {/* Usage Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${(api.requests / Math.max(...apiMetrics.map(a => a.requests))) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass-button">
              View Detailed Logs
            </Button>
            <Button variant="outline" size="sm" className="glass-button">
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="glass-button">
              Set Alerts
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}