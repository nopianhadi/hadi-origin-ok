import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/admin");
    }
  }, [user, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Deteksi apakah input adalah email atau username
      const isEmail = emailOrUsername.includes('@');
      loginMutation.mutate({
        email: isEmail ? emailOrUsername : undefined,
        username: isEmail ? undefined : emailOrUsername,
        password
      });
    } else {
      registerMutation.mutate({ 
        email, 
        password, 
        username: username || email.split('@')[0],
        full_name: fullName
      });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-white/80 border-white/20 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">HO</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">
                {isLogin ? "Masuk ke Admin" : "Daftar Admin"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Masukkan kredensial untuk mengakses dashboard admin" 
                  : "Buat akun admin baru untuk mengelola portfolio"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                <div className="space-y-2">
                  <Label htmlFor="emailOrUsername">Email atau Username</Label>
                  <Input
                    id="emailOrUsername"
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="admin@hadiorigin.com atau admin"
                    required
                    disabled={isPending}
                    data-testid="input-email-username"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                      disabled={isPending}
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      disabled={isPending}
                      data-testid="input-username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Administrator"
                      disabled={isPending}
                      data-testid="input-fullname"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                  data-testid="input-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                data-testid="button-submit"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? "Masuk..." : "Mendaftar..."}
                  </>
                ) : (
                  isLogin ? "Masuk" : "Daftar"
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
                data-testid="button-toggle-mode"
              >
                {isLogin 
                  ? "Belum punya akun? Daftar di sini" 
                  : "Sudah punya akun? Masuk di sini"}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-chart-1 to-chart-2">
        <div className="max-w-md text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Dashboard Admin Portfolio
          </h2>
          <p className="text-lg text-blue-100">
            Kelola semua proyek portfolio Anda dengan mudah. Tambah, edit, dan hapus proyek dari satu dashboard yang intuitif.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Manajemen proyek yang mudah</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Upload gambar dan link demo</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Organisasi berdasarkan kategori</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
