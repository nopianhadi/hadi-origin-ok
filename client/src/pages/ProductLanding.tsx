import { useState } from 'react';
import { ChevronRight, Check, Star, Wind, Zap, Shield, Award, Settings2, ArrowRight } from 'lucide-react';

export default function ProductLanding() {
  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">LAMOSSA</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-gray-600 hover:text-gray-900 transition text-sm">Product</a>
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition text-sm">Features</a>
            <a href="#specs" className="text-gray-600 hover:text-gray-900 transition text-sm">Specifications</a>
            <a href="#gallery" className="text-gray-600 hover:text-gray-900 transition text-sm">Gallery</a>
          </div>
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider">
                  New Arrival
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Professional<br />Hair Styling
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Experience salon-quality results at home with our advanced ionic technology 
                and ergonomic design for effortless styling.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">4.9/5 from 2,847 reviews</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
                  Add to Cart
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 aspect-square flex items-center justify-center">
                <div className="w-full h-full bg-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Wind className="w-32 h-32 text-white opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Designed for Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every detail crafted to deliver professional results with unmatched comfort
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Fast Drying"
              description="2000W motor delivers powerful airflow for quick drying times"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Heat Protection"
              description="Intelligent heat control prevents damage to your hair"
            />
            <FeatureCard
              icon={<Wind className="w-8 h-8" />}
              title="Ionic Technology"
              description="Reduces frizz and static for smooth, shiny results"
            />
            <FeatureCard
              icon={<Settings2 className="w-8 h-8" />}
              title="3 Heat Settings"
              description="Customize temperature for different hair types"
            />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Ergonomic Design Meets Performance
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The carefully balanced weight distribution and soft-touch grip ensure 
                comfortable styling sessions, even for extended periods. Professional 
                results without the professional fatigue.
              </p>
              <ul className="space-y-4">
                {[
                  'Lightweight construction at only 450g',
                  'Balanced weight distribution',
                  'Soft-touch rubberized grip',
                  'Extra-long professional cable'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-12 aspect-square flex items-center justify-center">
                <div className="text-white text-center">
                  <Wind className="w-40 h-40 mx-auto opacity-30" />
                </div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-2xl aspect-[4/3] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Wind className="w-32 h-32 text-gray-300" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl aspect-[4/3] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-32 h-32 text-orange-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Every Angle Matters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-2xl aspect-square overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-300">
                    <Wind className="w-20 h-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Specifications</h2>
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-8 space-y-6">
                <SpecItem label="Power" value="2000W" />
                <SpecItem label="Voltage" value="220-240V" />
                <SpecItem label="Heat Settings" value="3 Levels" />
                <SpecItem label="Speed Settings" value="2 Levels" />
                <SpecItem label="Weight" value="450g" />
              </div>
              <div className="p-8 space-y-6">
                <SpecItem label="Cable Length" value="2.8m" />
                <SpecItem label="Ionic Function" value="Yes" />
                <SpecItem label="Cool Shot" value="Yes" />
                <SpecItem label="Warranty" value="2 Years" />
                <SpecItem label="Color Options" value="Black, White, Rose Gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Selection */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Style</h2>
          <p className="text-xl text-gray-600 mb-12">Available in three stunning finishes</p>
          <div className="flex justify-center gap-6 mb-12">
            {[
              { name: 'black', color: 'bg-gray-900', label: 'Midnight Black' },
              { name: 'white', color: 'bg-white border-2 border-gray-300', label: 'Pure White' },
              { name: 'rose', color: 'bg-gradient-to-br from-pink-300 to-rose-400', label: 'Rose Gold' }
            ].map((option) => (
              <button
                key={option.name}
                onClick={() => setSelectedColor(option.name)}
                className="group flex flex-col items-center gap-3"
              >
                <div className={`w-20 h-20 rounded-full ${option.color} shadow-lg transition-transform group-hover:scale-110 ${
                  selectedColor === option.name ? 'ring-4 ring-gray-900 ring-offset-4' : ''
                }`} />
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
              </button>
            ))}
          </div>
          <div className="text-5xl font-bold text-gray-900 mb-8">$129.99</div>
          <button className="bg-gray-900 text-white px-12 py-5 rounded-full text-lg font-medium hover:bg-gray-800 transition inline-flex items-center gap-3">
            Add to Cart
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Professional Stylist',
                text: 'This is hands down the best hair dryer I\'ve ever used. The ionic technology really makes a difference!'
              },
              {
                name: 'Michael Chen',
                role: 'Beauty Blogger',
                text: 'Lightweight yet powerful. Perfect for everyday use. My hair has never looked better!'
              },
              {
                name: 'Emma Williams',
                role: 'Verified Buyer',
                text: 'Worth every penny. Dries my thick hair in half the time without any damage. Highly recommend!'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Professional Results.<br />Home Convenience.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who transformed their hair care routine
          </p>
          <button className="bg-white text-gray-900 px-12 py-5 rounded-full text-lg font-medium hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">LAMOSSA</h3>
              <p className="text-sm text-gray-600">
                Professional beauty tools for everyday use
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Specifications</a></li>
                <li><a href="#" className="hover:text-gray-900">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-900">Warranty</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2025 LAMOSSA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition group">
      <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
