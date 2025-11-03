import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Clock,
  RefreshCw,
  Zap,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface ApiMetrics {
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  average_response_time: number;
  requests_per_minute: number;
  error_rate: number;
  most_used_endpoints: Array<{
    endpoint: string;
    count: number;
    avg_response_time: number;
  }>;
}

export default function ApiAnalytics() {
  const { data: metrics, isLoading, refetch } = useQuery<ApiMetrics>({
    queryKey: ["api-analytics"],
    queryFn: async () => {
      // Simulate API metrics - in real app, this would come from analytics service
      // You could also query from an analytics table in Supabase
      
      return {
        total_requests: 15420,
        successful_requests: 14891,
        failed_requests: 529,
        average_response_time: 245,
        requests_per_minute: 12.5,
        error_rate: 3.4,
        most_used_endpoints: [
          { endpoint: '/api/projects', count: 4521, avg_response_time: 180 },
          { endpoint: '/api/users', count: 3210, avg_response_time: 120 },
          { endpoint: '/api/notifications', count: 2890, avg_response_time: 95 },
          { endpoint: '/api/settings', count: 1654, avg_response_time: 210 },
          { endpoint: '/api/auth/login', count: 1432, avg_response_time: 340 }
        ]
      };
    },
    refetchInterval: 60000, // Refresh every minute
  });

  const getStatusColor = (errorRate: number) => {
    if (errorRate < 1) return 'text-green-600 bg-green-100';
    if (errorRate < 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 200) return 'text-green-600';
    if (time < 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Memuat analytics API...</span>
        </div>
      </Card>
    );
  }

  const successRate = metrics ? ((metrics.successful_requests / metrics.total_requests) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          API Analytics
        </h3>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold">{metrics?.total_requests.toLocaleString() || '0'}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{successRate}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className={`text-2xl font-bold ${getResponseTimeColor(metrics?.average_response_time || 0)}`}>
                {metrics?.average_response_time || 0}ms
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Requests/Min</p>
              <p className="text-2xl font-bold text-blue-600">{metrics?.requests_per_minute || 0}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Error Rate */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Error Rate</h4>
          <Badge className={getStatusColor(metrics?.error_rate || 0)}>
            {metrics?.error_rate || 0}%
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Successful</p>
              <p className="text-xl font-bold text-green-600">
                {metrics?.successful_requests.toLocaleString() || '0'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-xl font-bold text-red-600">
                {metrics?.failed_requests.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Most Used Endpoints */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Endpoint Paling Sering Digunakan</h4>
        <div className="space-y-3">
          {metrics?.most_used_endpoints.map((endpoint, index) => (
            <div key={endpoint.endpoint} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                  {index + 1}
                </Badge>
                <div>
                  <p className="font-mono text-sm font-medium">{endpoint.endpoint}</p>
                  <p className="text-xs text-gray-600">{endpoint.count.toLocaleString()} requests</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getResponseTimeColor(endpoint.avg_response_time)}`}>
                  {endpoint.avg_response_time}ms
                </p>
                <p className="text-xs text-gray-600">avg response</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Status */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Status Performa</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="font-medium">Response Time</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {metrics?.average_response_time || 0 < 300 ? 'Excellent' : 'Good'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Throughput</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {metrics?.requests_per_minute || 0 > 10 ? 'High' : 'Normal'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium">Error Rate</span>
            </div>
            <Badge className={getStatusColor(metrics?.error_rate || 0)}>
              {metrics?.error_rate || 0 < 1 ? 'Excellent' : metrics?.error_rate || 0 < 5 ? 'Good' : 'Needs Attention'}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}