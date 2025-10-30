// Referenced from blueprint:javascript_auth_all_persistance
import { Switch, Route } from "wouter";
// import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import AuthPage from "@/pages/AuthPage";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import FramerLanding from "@/pages/FramerLanding";
import ModernCards from "@/pages/ModernCards";
import ProductLanding from "@/pages/ProductLanding";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/blog">
        <Blog />
      </Route>
      <Route path="/landing">
        <LandingPage />
      </Route>
      <Route path="/framer">
        <FramerLanding />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/modern-cards">
        <ModernCards />
      </Route>
      <Route path="/product">
        <ProductLanding />
      </Route>
      <Route path="/project/:id">
        <ProjectDetail />
      </Route>
      <Route path="/admin">
        <ProtectedRoute component={Admin} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
