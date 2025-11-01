// import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import PerformanceMonitor from "@/components/PerformanceMonitor";

// Lazy load non-critical components for better performance
const AIBusinessAnalyzer = lazy(() => import("@/components/AIBusinessAnalyzer"));
const AIIntegration = lazy(() => import("@/components/AIIntegration"));
const ProjectsShowcase = lazy(() => import("@/components/ProjectsShowcase"));
const VideoIntroduction = lazy(() => import("@/components/VideoIntroduction"));
const VideoShowcase = lazy(() => import("@/components/VideoShowcase"));
const ProcessSteps = lazy(() => import("@/components/ProcessSteps"));
const TechnologyStack = lazy(() => import("@/components/TechnologyStack"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Partners = lazy(() => import("@/components/Partners"));
const Team = lazy(() => import("@/components/Team"));
const Industries = lazy(() => import("@/components/Industries"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Pricing = lazy(() => import("@/components/Pricing"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const FAQ = lazy(() => import("@/components/FAQ"));
const BackToTop = lazy(() => import("@/components/BackToTop"));

// Loading component for better UX
const SectionLoader = () => (
  <div className="py-8 flex justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Performance monitoring for mobile optimization */}
      <PerformanceMonitor />
      
      {/* Helmet temporarily disabled due to React 18 SSR issue */}
      {/* <Helmet>
        <title>Hadi Origin - Web Development & Mobile App Agency</title>
        <meta name="description" content="Agency profesional yang mengkhususkan diri dalam pengembangan website modern dan aplikasi mobile. Dilengkapi AI Business Analyzer untuk menganalisis kebutuhan digital bisnis Anda." />
        <meta name="keywords" content="web development, mobile app development, website design, react native, e-commerce, company profile, AI business analyzer, digital agency" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hadiorigin.com/" />
        <meta property="og:title" content="Hadi Origin - Web Development & Mobile App Agency" />
        <meta property="og:description" content="Agency profesional untuk website modern dan mobile app. Gunakan AI Business Analyzer gratis untuk menganalisis kebutuhan digital bisnis Anda." />
        <meta property="og:image" content="https://hadiorigin.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hadiorigin.com/" />
        <meta name="twitter:title" content="Hadi Origin - Web Development & Mobile App Agency" />
        <meta name="twitter:description" content="Agency profesional untuk website modern dan mobile app dengan AI Business Analyzer gratis." />
        <meta name="twitter:image" content="https://hadiorigin.com/og-image.jpg" />
        
        <link rel="canonical" href="https://hadiorigin.com/" />
        <meta name="author" content="Hadi Origin" />
        <meta name="robots" content="index, follow" />
      </Helmet> */}
      
      <ProgressIndicator />
      <Navigation />
      <main id="main-content">
        <Hero />
        <Statistics />
        <Features />
        
        <Suspense fallback={<SectionLoader />}>
          <VideoIntroduction />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AIBusinessAnalyzer />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ProjectsShowcase />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <VideoShowcase />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ProcessSteps />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TechnologyStack />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AIIntegration />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Partners />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Team />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Industries />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <BlogPreview />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
      </main>
      <Footer />
      
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>

    </div>
  );
}
