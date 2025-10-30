import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SolutionFAQ() {
  const faqs = [
    {
      question: "Berapa lama waktu pengerjaan proyek?",
      answer: "Waktu pengerjaan bervariasi tergantung kompleksitas. Landing page sederhana: 2-3 minggu. Company profile: 1-2 bulan. Custom system: 2-4 bulan. Kami akan memberikan timeline detail setelah analisis kebutuhan."
    },
    {
      question: "Apakah ada biaya maintenance?",
      answer: "Setiap paket sudah termasuk support gratis (1-6 bulan tergantung paket). Setelah itu, Anda bisa memilih paket maintenance mulai dari Rp 500.000/bulan yang mencakup update, backup, dan technical support."
    },
    {
      question: "Bagaimana proses pembayaran?",
      answer: "Pembayaran dibagi menjadi 3 tahap: 30% DP (setelah agreement), 40% progress payment (saat development 50%), dan 30% pelunasan (setelah testing & serah terima). Kami menerima transfer bank dan payment gateway."
    },
    {
      question: "Apakah source code diserahkan?",
      answer: "Ya, untuk paket Professional dan Enterprise, source code diserahkan sepenuhnya kepada Anda. Untuk paket Basic, source code dapat dibeli terpisah dengan biaya tambahan."
    },
    {
      question: "Bagaimana jika ada bug setelah launching?",
      answer: "Kami memberikan garansi bug-free selama periode support. Jika ditemukan bug yang merupakan kesalahan development, kami akan memperbaiki tanpa biaya tambahan. Bug akibat modifikasi pihak ketiga tidak termasuk garansi."
    },
    {
      question: "Apakah bisa request fitur tambahan di tengah project?",
      answer: "Bisa, namun akan kami evaluasi dampaknya terhadap timeline dan budget. Perubahan minor biasanya masih dalam scope. Untuk perubahan major, akan ada addendum kontrak dengan penyesuaian biaya dan waktu."
    },
    {
      question: "Apakah menyediakan training untuk admin?",
      answer: "Ya, setiap paket sudah termasuk training untuk admin/operator. Kami akan memberikan dokumentasi lengkap dan sesi training via online/offline sesuai kebutuhan."
    },
    {
      question: "Bagaimana dengan SEO dan digital marketing?",
      answer: "Semua website kami sudah dioptimasi untuk SEO dasar (technical SEO, meta tags, sitemap, dll). Untuk SEO advanced dan digital marketing campaign, kami menyediakan layanan terpisah dengan tim digital marketing kami."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Pertanyaan yang Sering Diajukan</h3>
        <p className="text-muted-foreground">
          Temukan jawaban untuk pertanyaan umum seputar layanan kami
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
        <p className="font-semibold mb-2">Masih ada pertanyaan?</p>
        <p className="text-sm text-muted-foreground mb-4">
          Tim kami siap membantu menjawab pertanyaan Anda
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          💬 Hubungi Kami via WhatsApp
        </a>
      </div>
    </div>
  );
}
