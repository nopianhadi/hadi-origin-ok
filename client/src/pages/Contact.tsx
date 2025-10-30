import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactMethods from "@/components/ContactMethods";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "@/styles/glassmorphism-animations.css";

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 section-mobile">
        {/* Enhanced Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400/8 to-emerald-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-indigo-400/6 to-blue-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-500 mb-6 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <MessageSquare className="w-2.5 h-2.5 text-white" />
              </div>
              {t('contact.title')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              {t('contact.heroTitle')}{" "}
              <span className="gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">{t('contact.heroHighlight')}</span>
            </h1>
            
            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl p-6">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {t('contact.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-mobile bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/10 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-48 h-48 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-gradient-to-r from-green-400/6 to-emerald-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="animate-slide-up">
                <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
                  {t('contactPage.contactInfo.title')}
                </h2>
                
                <div className="space-y-6">
                  <Card className="glass-enhanced p-6 group hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/80 to-blue-500/80 border border-white/20 flex items-center justify-center shadow-lg shadow-purple-500/25 backdrop-blur-sm flex-shrink-0">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{t('contactPage.contactInfo.details.email.title')}</h3>
                        <a href="mailto:hello@hadiorigin.com" className="text-sm text-gray-600 hover:text-blue-700 transition-colors font-medium">
                          {t('contactPage.contactInfo.details.email.value')}
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-enhanced p-6 group hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/80 to-cyan-500/80 border border-white/20 flex items-center justify-center shadow-lg shadow-blue-500/25 backdrop-blur-sm flex-shrink-0">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{t('contactPage.contactInfo.details.phone.title')}</h3>
                        <a href="tel:+6281234567890" className="text-sm text-gray-600 hover:text-blue-700 transition-colors font-medium">
                          {t('contactPage.contactInfo.details.phone.value')}
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-enhanced p-6 group hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/80 to-emerald-500/80 border border-white/20 flex items-center justify-center shadow-lg shadow-green-500/25 backdrop-blur-sm flex-shrink-0">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">{t('contactPage.contactInfo.details.address.title')}</h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {t('contactPage.contactInfo.details.address.value')}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-enhanced p-6 group hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/80 to-yellow-500/80 border border-white/20 flex items-center justify-center shadow-lg shadow-orange-500/25 backdrop-blur-sm flex-shrink-0">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors duration-300">{t('contactPage.contactInfo.details.hours.title')}</h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {t('contactPage.contactInfo.details.hours.value')}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-enhanced p-6 md:p-8 animate-slide-up hover:scale-[1.01] transition-all duration-500" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
                  {t('contact.form.send')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-blue-300/50 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-blue-300/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.form.project')} *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Konsultasi Proyek AI"
                      required
                      className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-blue-300/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.message')}
                      required
                      rows={6}
                      className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-blue-300/50 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-blue-400/20 rounded-xl"
                  >
                    {isSubmitting ? (
                      <>{t('contact.form.sending')}</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('contact.form.send')}
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <ContactMethods />

      {/* Meeting Booking Section */}
      {import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL && (
        <section className="section-mobile bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto container-mobile">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-1 space-y-4 animate-slide-up">
                <h2 className="text-2xl font-bold gradient-text-accent">Jadwalkan Meeting</h2>
                <p className="text-muted-foreground">
                  Pilih waktu yang cocok untuk Anda melalui Google Calendar Appointment.
                </p>
                <div>
                  <Button asChild variant="outline" className="glass">
                    <a
                      href={import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buka di Tab Baru
                    </a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.05s" }}>
                <Card className="glass-card overflow-hidden">
                  <div className="aspect-[4/3] sm:aspect-video">
                    <iframe
                      src={import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL}
                      title="Book a meeting"
                      className="w-full h-full"
                      frameBorder="0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map Section (Optional) */}
      <section className="section-mobile bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto container-mobile">
          <Card className="glass-card overflow-hidden animate-slide-up">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">Jakarta, Indonesia</p>
                <p className="text-sm text-muted-foreground">Map placeholder</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
