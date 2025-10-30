import { useState } from 'react';
import { Search, TrendingUp, Zap, Layout, Database, Users, BarChart3, Target, Gauge } from 'lucide-react';

export default function FramerLanding() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">Framer</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
            <a href="#cms" className="text-gray-400 hover:text-white transition">CMS</a>
            <a href="#analytics" className="text-gray-400 hover:text-white transition">Analytics</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
            Start for free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Build better sites,<br />faster
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Framer is the design tool for websites. Design freely, publish fast, and scale with CMS, SEO, analytics, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-700 transition">
              Start for free
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition">
              View gallery
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Feature */}
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI"
              description="Generate site layouts and advanced components in seconds with AI, so you can skip the blank canvas and start designing with confidence."
              gradient="from-purple-600 to-pink-600"
            />

            {/* Design Feature */}
            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="Design"
              description="Craft responsive layouts and bring them to life with smooth effects, interactions, and animations. Build exactly what you imagine, visually."
              gradient="from-blue-600 to-cyan-600"
            />

            {/* CMS Feature */}
            <FeatureCard
              icon={<Database className="w-8 h-8" />}
              title="CMS"
              description="Manage and update your content effortlessly with a built-in CMS. Keep your site fresh without touching code."
              gradient="from-green-600 to-emerald-600"
            />

            {/* Collaborate Feature */}
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Collaborate"
              description="Whether you're collaborating on the canvas or editing copy directly on the page, updates are seamless and handoff-free."
              gradient="from-orange-600 to-red-600"
            />
          </div>
        </div>
      </section>

      {/* CMS Showcase */}
      <section id="cms" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-3xl p-8 border border-white/10">
            {/* CMS Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold">Content Management</h3>
                <span className="text-gray-400">153 items</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* CMS Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-gray-400 text-sm">
                    <th className="pb-4 font-medium">Title</th>
                    <th className="pb-4 font-medium">Image</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Category</th>
                    <th className="pb-4 font-medium">Slug</th>
                  </tr>
                </thead>
                <tbody>
                  {cmsData.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-4">{item.title}</td>
                      <td className="py-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                      </td>
                      <td className="py-4 text-gray-400">{item.date}</td>
                      <td className="py-4">
                        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{item.slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section id="analytics" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Scale without switching tools</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              label="Pageviews"
              value="258,156"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <StatCard
              label="Visitors"
              value="85,458"
              icon={<Users className="w-6 h-6" />}
            />
            <StatCard
              label="Live Visitors"
              value="400"
              icon={<BarChart3 className="w-6 h-6" />}
              live
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Analytics Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Analytics & insights</h3>
              <p className="text-gray-400 mb-6">Track traffic, measure performance, and monitor conversions.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Unique Visitors</span>
                  <span className="text-2xl font-bold">1.7M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Pageviews</span>
                  <span className="text-2xl font-bold">3.2M</span>
                </div>
              </div>
            </div>

            {/* SEO Card */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-3xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold mb-6">SEO & performance</h3>
              <p className="text-gray-400 mb-6">Optimize every page with built-in SEO settings, metadata, and blazing-fast hosting.</p>
              <div className="grid grid-cols-3 gap-4">
                <ScoreCircle label="SEO" score={39} />
                <ScoreCircle label="Performance" score={37} />
                <ScoreCircle label="Accessibility" score={39} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Design bold. Launch fast.</h2>
          <button className="bg-blue-600 text-white px-10 py-5 rounded-full font-medium text-xl hover:bg-blue-700 transition">
            Start building for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2025 Framer</p>
        </div>
      </footer>
    </div>
  );
}

// Components
function FeatureCard({ icon, title, description, gradient }: any) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition group">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      <button className="mt-6 text-blue-400 hover:text-blue-300 transition flex items-center gap-2">
        Learn more →
      </button>
    </div>
  );
}

function StatCard({ label, value, icon, live }: any) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400">{label}</span>
        {live && <span className="flex items-center gap-2 text-green-400 text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live
        </span>}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-4xl font-bold">{value}</span>
        {icon}
      </div>
    </div>
  );
}

function ScoreCircle({ label, score }: any) {
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700" />
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="none" className="text-green-500" strokeDasharray={`${score * 2.26} 226`} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">{score}</span>
      </div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}

// Sample CMS Data
const cmsData = [
  { title: 'Protected Staging', date: 'Oct 20, 2025', category: 'Publishing', slug: 'protected-staging' },
  { title: 'Right-to-Left Layout Direction', date: 'Oct 2, 2025', category: 'Localization', slug: 'right-to-left-layout' },
  { title: 'October Update: Wireframer', date: 'Oct 1, 2025', category: 'AI', slug: 'wireframer-cms' },
  { title: 'Workshop: Claude 4.5', date: 'Sep 30, 2025', category: 'Plugins', slug: 'workshop-claude' },
  { title: 'Cal.com Component', date: 'Sep 30, 2025', category: 'Integration', slug: 'cal-com' },
  { title: 'Icon Set: Lucide', date: 'Sep 29, 2025', category: 'Design', slug: 'icon-set-lucide' },
  { title: 'Stagger Effects', date: 'Sep 25, 2025', category: 'Effects', slug: 'stagger-effects' },
  { title: 'Text Search Plugin', date: 'Sep 24, 2025', category: 'Plugins', slug: 'text-search' },
];
