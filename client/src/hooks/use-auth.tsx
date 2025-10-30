import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Custom User type untuk tabel users
type CustomUser = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  user: CustomUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<CustomUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<CustomUser, Error, RegisterData>;
};

type LoginData = {
  username?: string;
  email?: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  username?: string;
  full_name?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const checkSession = () => {
      const storedUser = localStorage.getItem('auth_user');
      const sessionExpiry = localStorage.getItem('auth_expiry');
      
      if (storedUser && sessionExpiry) {
        const now = new Date().getTime();
        const expiry = parseInt(sessionExpiry);
        
        if (now < expiry) {
          // Session masih valid
          setUser(JSON.parse(storedUser));
        } else {
          // Session expired
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_expiry');
        }
      }
      
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      // Query user dari tabel custom users
      let query = supabase
        .from('users')
        .select('*');

      // Login bisa menggunakan username atau email
      if (credentials.email) {
        query = query.eq('email', credentials.email);
      } else if (credentials.username) {
        query = query.eq('username', credentials.username);
      } else {
        throw new Error("Username atau email harus diisi");
      }

      const { data: users, error } = await query.single();

      if (error || !users) {
        throw new Error("Username/email atau password salah");
      }

      // Untuk sementara, kita akan menggunakan password plaintext
      // Di production, gunakan bcrypt untuk hash comparison
      if (users.password !== credentials.password) {
        throw new Error("Username/email atau password salah");
      }

      // Buat user object dengan struktur yang konsisten
      const userObj = {
        id: users.id,
        username: users.username,
        email: users.email || `${users.username}@hadiorigin.com`,
        full_name: users.full_name || users.username,
        role: users.role || 'admin',
        is_active: users.is_active !== false,
        last_login: new Date().toISOString(),
        created_at: users.created_at,
        updated_at: new Date().toISOString()
      };

      return userObj as CustomUser;
    },
    onSuccess: (user: CustomUser) => {
      // Simpan session ke localStorage (24 jam)
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_expiry', expiry.toString());
      
      setUser(user);
      toast({
        title: "Login berhasil",
        description: `Selamat datang kembali, ${user.full_name || user.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      // Cek apakah username atau email sudah ada
      const { data: existingUsers } = await supabase
        .from('users')
        .select('username, email')
        .or(`username.eq.${credentials.username},email.eq.${credentials.email}`);

      if (existingUsers && existingUsers.length > 0) {
        const existing = existingUsers[0];
        if (existing.username === credentials.username) {
          throw new Error("Username sudah digunakan");
        }
        if (existing.email === credentials.email) {
          throw new Error("Email sudah digunakan");
        }
      }

      // Insert user baru ke tabel custom
      const newUser = {
        username: credentials.username || credentials.email.split('@')[0],
        email: credentials.email,
        password: credentials.password, // Di production, hash dengan bcrypt
        full_name: credentials.full_name || credentials.username || 'User',
        role: 'admin', // Default role
        is_active: true,
      };

      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Registrasi gagal");

      return data as CustomUser;
    },
    onSuccess: (user: CustomUser) => {
      // Simpan session ke localStorage
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_expiry', expiry.toString());
      
      setUser(user);
      toast({
        title: "Registrasi berhasil",
        description: "Akun Anda telah dibuat!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registrasi gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Hapus session dari localStorage
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_expiry');
    },
    onSuccess: () => {
      setUser(null);
      toast({
        title: "Logout berhasil",
        description: "Sampai jumpa lagi!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
