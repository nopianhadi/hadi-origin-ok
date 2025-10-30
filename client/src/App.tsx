// Referenced from blueprint:javascript_auth_all_persistance
import { Switch, Route } from "wouter";
// import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { PerformanceOptimizer, ResourcePreloader } from "@/components/PerformanceOptimizer";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";

// Lazy load all non-critical pages for better performance
const Admin = lazy(() => import("@/pages/Admin"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const FramerLanding = lazy(() => import("@/pages/FramerLanding"));
const ModernCards = lazy(() => import("@/pages/ModernCards"));
const ProductLanding = lazy(() => import("@/pages/ProductLanding"));
const Blog = lazy(() => import("@/pages/Blog"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Optimized loading component
const LoadingFallback = ({ message = "Loading..." }: { message?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth">
        <Suspense fallback={<LoadingFallback message="Loading authentication..." />}>
          <AuthPage />
        </Suspense>
      </Route>
      <Route path="/about">
        <Suspense fallback={<LoadingFallback message="Loading about page..." />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<LoadingFallback message="Loading contact page..." />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path="/blog">
        <Suspense fallback={<LoadingFallback message="Loading blog..." />}>
          <Blog />
        </Suspense>
      </Route>
      <Route path="/landing">
        <Suspense fallback={<LoadingFallback message="Loading landing page..." />}>
          <LandingPage />
        </Suspense>
      </Route>
      <Route path="/framer">
        <Suspense fallback={<LoadingFallback message="Loading framer page..." />}>
          <FramerLanding />
        </Suspense>
      </Route>
      <Route path="/dashboard">
        <Suspense fallback={<LoadingFallback message="Loading dashboard..." />}>
          <Dashboard />
        </Suspense>
      </Route>
      <Route path="/modern-cards">
        <Suspense fallback={<LoadingFallback message="Loading modern cards..." />}>
          <ModernCards />
        </Suspense>
      </Route>
      <Route path="/product">
        <Suspense fallback={<LoadingFallback message="Loading product page..." />}>
          <ProductLanding />
        </Suspense>
      </Route>
      <Route path="/project/:id">
        <Suspense fallback={<LoadingFallback message="Loading project details..." />}>
          <ProjectDetail />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Suspense fallback={<LoadingFallback message="Loading admin panel..." />}>
          <ProtectedRoute component={Admin} />
        </Suspense>
      </Route>
      <Route>
        <Suspense fallback={<LoadingFallback message="Loading page..." />}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <PerformanceOptimizer />
          <ResourcePreloader />
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
