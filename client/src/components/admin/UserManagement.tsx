import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/form-error";
import { UserForm } from "@/components/forms/UserForm";
import { SearchFilter, useSearchFilter } from "@/components/ui/search-filter";
import { useUserMutations, useBulkOperations } from "@/lib/mutation-wrapper";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  MoreHorizontal,
  Users,
  Shield,
  ShieldCheck,
  ShieldX
} from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export function UserManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { toast } = useToast();
  const { updateMutation, deleteMutation } = useUserMutations();
  const { bulkUpdateMutation, bulkDeleteMutation } = useBulkOperations();

  // Fetch users
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Search and filter
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    resetFilters,
    filteredData: filteredUsers
  } = useSearchFilter(users, ['username', 'email', 'full_name'], {
    role: "all",
    status: "all"
  });

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsCreateOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      deleteMutation.mutate(userId);
    }
  };

  const handleToggleUserStatus = (user: User) => {
    updateMutation.mutate({
      id: user.id,
      data: { is_active: !user.is_active }
    }, {
      onSuccess: () => {
        toast({
          title: "Status berhasil diubah",
          description: `User ${user.username} ${!user.is_active ? 'diaktifkan' : 'dinonaktifkan'}`,
        });
      }
    });
  };

  const handleChangeRole = (user: User, newRole: string) => {
    updateMutation.mutate({
      id: user.id,
      data: { role: newRole }
    }, {
      onSuccess: () => {
        toast({
          title: "Role berhasil diubah",
          description: `Role user ${user.username} diubah menjadi ${newRole}`,
        });
      }
    });
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkActivate = () => {
    if (selectedUsers.length === 0) return;
    
    bulkUpdateMutation.mutate({
      tableName: 'users',
      ids: selectedUsers,
      updates: { is_active: true },
      queryKey: 'users'
    }, {
      onSuccess: () => {
        setSelectedUsers([]);
      }
    });
  };

  const handleBulkDeactivate = () => {
    if (selectedUsers.length === 0) return;
    
    bulkUpdateMutation.mutate({
      tableName: 'users',
      ids: selectedUsers,
      updates: { is_active: false },
      queryKey: 'users'
    }, {
      onSuccess: () => {
        setSelectedUsers([]);
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    
    if (confirm(`Hapus ${selectedUsers.length} user yang dipilih?`)) {
      bulkDeleteMutation.mutate({
        tableName: 'users',
        ids: selectedUsers,
        queryKey: 'users'
      }, {
        onSuccess: () => {
          setSelectedUsers([]);
        }
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-yellow-100 text-yellow-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <ShieldCheck className="h-4 w-4 text-green-600" />
    ) : (
      <ShieldX className="h-4 w-4 text-red-600" />
    );
  };

  if (error) {
    return (
      <Card className="p-6">
        <EmptyState
          title="Error memuat data user"
          description="Terjadi kesalahan saat memuat data user. Silakan coba lagi."
          action={
            <Button onClick={() => window.location.reload()}>
              Muat Ulang
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Manajemen User</h2>
        </div>
        
        <Dialog open={isCreateOpen || !!editingUser} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) setEditingUser(null);
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Tambah User Baru"}
              </DialogTitle>
            </DialogHeader>
            
            <UserForm
              initialData={editingUser}
              isEdit={!!editingUser}
              onSuccess={() => {
                setIsCreateOpen(false);
                setEditingUser(null);
              }}
              onCancel={() => {
                setIsCreateOpen(false);
                setEditingUser(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <SearchFilter
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Cari user (username, email, nama)..."
          filters={[
            {
              key: "role",
              label: "Role",
              value: filters.role,
              onChange: (value) => updateFilter("role", value),
              options: [
                { value: "admin", label: "Admin" },
                { value: "moderator", label: "Moderator" },
                { value: "user", label: "User" }
              ]
            },
            {
              key: "status",
              label: "Status",
              value: filters.status,
              onChange: (value) => updateFilter("status", value),
              options: [
                { value: "active", label: "Aktif" },
                { value: "inactive", label: "Tidak Aktif" }
              ]
            }
          ]}
          onReset={resetFilters}
        />

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedUsers.length} user dipilih
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleBulkActivate}>
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Aktifkan
                </Button>
                <Button size="sm" variant="outline" onClick={handleBulkDeactivate}>
                  <ShieldX className="h-3 w-3 mr-1" />
                  Nonaktifkan
                </Button>
                <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Users Table */}
      <Card>
        <LoadingState isLoading={isLoading} loadingText="Memuat data user...">
          {filteredUsers.length === 0 ? (
            <EmptyState
              title="Tidak ada user ditemukan"
              description="Belum ada user yang sesuai dengan filter yang dipilih."
              action={
                <Button onClick={resetFilters}>
                  Reset Filter
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleChangeRole(user, value)}
                        >
                          <SelectTrigger className="w-8 h-8 p-0 border-none">
                            <Edit className="h-3 w-3" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleUserStatus(user)}
                        className="flex items-center gap-2"
                      >
                        {getStatusIcon(user.is_active)}
                        {user.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {user.last_login 
                          ? new Date(user.last_login).toLocaleDateString('id-ID')
                          : 'Belum pernah login'
                        }
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </LoadingState>
      </Card>
    </div>
  );
}