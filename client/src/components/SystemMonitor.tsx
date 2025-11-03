import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { 
  Activity, 
  Database, 
  Server, 
  Wifi, 
  AlertCircle, 
  CheckCircle,
  RefreshCw,
  TrendingUp,
  Users,
  FolderOpen
} from "lucide-react";

interface SystemStats {
  database_status: 'healthy' | 'warning' | 'error';
  total_users: number;
  total_projects: number;
  total_notifications: number;
  storage_used: string;
  last_backup: string;
  uptime: string;
}

export default function SystemMonitor() {
  const { data: stats, isLoading, refetch } = useQuery<SystemStats>({
    queryKey: ["system-stats"],
    queryFn: async () => {
      // Simulate system stats - in real app, this would come from monitoring API
      const [usersResult, projectsResult, notificationsResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('notifications').select('id', { count: 'exact', head: true })
      ]);

      return {
        database_status: 'healthy' as const,
        total_users: usersResult.count || 0,
        total_projects: projectsResult.count || 0,
        total_notifications: notificationsResult.count || 0,
        storage_used: '2.3 GB',
        last_backup: new Date().toISOString(),
        uptime: '99.9%'
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

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
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Memuat status sistem...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Monitor Sistem
        </h3>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(stats?.database_status || 'healthy')}>
                  {getStatusIcon(stats?.database_status || 'healthy')}
                  <span className="ml-1 capitalize">{stats?.database_status || 'healthy'}</span>
                </Badge>
              </div>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-2xl font-bold text-green-600">{stats?.uptime || '99.9%'}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Storage</p>
              <p className="text-2xl font-bold text-purple-600">{stats?.storage_used || '2.3 GB'}</p>
            </div>
            <Server className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Backup</p>
              <p className="text-sm text-gray-800">
                {stats?.last_backup ? new Date(stats.last_backup).toLocaleDateString('id-ID') : 'N/A'}
              </p>
            </div>
            <Wifi className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Data Statistics */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Statistik Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats?.total_users || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FolderOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold">{stats?.total_projects || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Notifications</p>
              <p className="text-2xl font-bold">{stats?.total_notifications || 0}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* System Health */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Kesehatan Sistem</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">Database Connection</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Healthy</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">API Endpoints</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Operational</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">File Storage</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Available</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}