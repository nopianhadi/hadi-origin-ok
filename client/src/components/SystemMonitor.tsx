import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  status: 'healthy' | 'warning' | 'critical';
}

export default function SystemMonitor() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 23,
    uptime: "7d 14h 32m",
    status: 'healthy'
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshStats = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStats({
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      disk: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
      uptime: "7d 14h 32m",
      status: Math.random() > 0.8 ? 'warning' : 'healthy'
    });
    
    setIsRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(refreshStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-60"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-xl shadow-xl shadow-blue-500/25 border border-white/20 backdrop-blur-sm">
                <Server className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                System Monitor
              </h3>
              <p className="text-sm text-muted-foreground">Real-time system metrics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={`gap-2 ${getStatusColor(stats.status)}`}>
              {getStatusIcon(stats.status)}
              {stats.status.charAt(0).toUpperCase() + stats.status.slice(1)}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshStats}
              disabled={isRefreshing}
              className="glass-button"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'CPU', value: stats.cpu, icon: Cpu, unit: '%' },
            { label: 'Memory', value: stats.memory, icon: MemoryStick, unit: '%' },
            { label: 'Disk', value: stats.disk, icon: HardDrive, unit: '%' },
            { label: 'Network', value: stats.network, icon: Wifi, unit: 'MB/s' }
          ].map((metric, index) => (
            <div key={metric.label} className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="text-sm font-bold">
                  {metric.value}{metric.unit}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getUsageColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Uptime</span>
            </div>
            <p className="text-lg font-bold text-green-600">{stats.uptime}</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">DB Connections</span>
            </div>
            <p className="text-lg font-bold text-blue-600">24/100</p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Active Sessions</span>
            </div>
            <p className="text-lg font-bold text-purple-600">156</p>
          </div>
        </div>
      </div>
    </Card>
  );
}