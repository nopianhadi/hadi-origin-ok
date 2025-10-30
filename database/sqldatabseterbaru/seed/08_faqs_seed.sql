-- ============================================
-- FAQS SEED DATA
-- ============================================

INSERT INTO public.faqs (
  category_en, category_id, question_en, question_id, answer_en, answer_id, sort_order
) VALUES
-- General Questions
(
  'General',
  'Umum',
  'What services do you offer?',
  'Layanan apa saja yang Anda tawarkan?',
  'We offer comprehensive web development, mobile app development, UI/UX design, and digital consulting services. Our expertise includes modern frameworks like React, Next.js, React Native, and backend technologies.',
  'Kami menawarkan layanan pengembangan web komprehensif, pengembangan aplikasi mobile, desain UI/UX, dan konsultasi digital. Keahlian kami meliputi framework modern seperti React, Next.js, React Native, dan teknologi backend.',
  1
),
(
  'General',
  'Umum',
  'How do you ensure project quality?',
  'Bagaimana Anda memastikan kualitas proyek?',
  'We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback sessions. Every project goes through rigorous quality assurance before delivery.',
  'Kami mengikuti praktik terbaik industri termasuk review kode, pengujian otomatis, integrasi berkelanjutan, dan sesi feedback klien reguler. Setiap proyek melalui jaminan kualitas yang ketat sebelum diserahkan.',
  2
),
(
  'General',
  'Umum',
  'Do you provide ongoing support?',
  'Apakah Anda menyediakan dukungan berkelanjutan?',
  'Yes, we provide comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer different support packages to meet your needs.',
  'Ya, kami menyediakan dukungan pasca-peluncuran komprehensif termasuk perbaikan bug, pembaruan keamanan, optimasi performa, dan peningkatan fitur. Kami menawarkan berbagai paket dukungan sesuai kebutuhan Anda.',
  3
),

-- Timeline Questions
(
  'Timeline',
  'Timeline',
  'How long does a typical project take?',
  'Berapa lama waktu yang dibutuhkan untuk proyek biasa?',
  'Project timelines vary based on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 8-16 weeks. We provide detailed timelines during the planning phase.',
  'Timeline proyek bervariasi berdasarkan kompleksitas dan cakupan. Website sederhana biasanya membutuhkan 2-4 minggu, sedangkan aplikasi web kompleks atau aplikasi mobile bisa membutuhkan 8-16 minggu. Kami memberikan timeline detail selama fase perencanaan.',
  4
),
(
  'Timeline',
  'Timeline',
  'Can you work with tight deadlines?',
  'Bisakah Anda bekerja dengan deadline ketat?',
  'Yes, we can accommodate urgent projects with tight deadlines. We have a dedicated team for rush projects and can scale resources as needed. Additional charges may apply for expedited delivery.',
  'Ya, kami dapat mengakomodasi proyek mendesak dengan deadline ketat. Kami memiliki tim khusus untuk proyek rush dan dapat meningkatkan sumber daya sesuai kebutuhan. Biaya tambahan mungkin berlaku untuk pengiriman dipercepat.',
  5
),

-- Pricing Questions
(
  'Pricing',
  'Harga',
  'How do you structure your pricing?',
  'Bagaimana struktur harga Anda?',
  'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project complexity, timeline, and specific requirements. We provide detailed quotes after understanding your needs.',
  'Kami menawarkan model harga fleksibel termasuk proyek harga tetap, tarif per jam, dan perjanjian retainer. Harga tergantung pada kompleksitas proyek, timeline, dan kebutuhan spesifik. Kami memberikan penawaran detail setelah memahami kebutuhan Anda.',
  6
),
(
  'Pricing',
  'Harga',
  'Do you offer payment plans?',
  'Apakah Anda menawarkan rencana pembayaran?',
  'Yes, we offer flexible payment plans typically structured as: 30% upfront, 40% at milestone completion, and 30% upon project delivery. We can customize payment schedules based on project size and client preferences.',
  'Ya, kami menawarkan rencana pembayaran fleksibel yang biasanya terstruktur sebagai: 30% di muka, 40% saat penyelesaian milestone, dan 30% saat penyerahan proyek. Kami dapat menyesuaikan jadwal pembayaran berdasarkan ukuran proyek dan preferensi klien.',
  7
),

-- Technical Questions
(
  'Technical',
  'Teknis',
  'What technologies do you use?',
  'Teknologi apa yang Anda gunakan?',
  'We use modern, industry-standard technologies including React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB, AWS, and more. We choose the best technology stack based on your specific project requirements.',
  'Kami menggunakan teknologi modern standar industri termasuk React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB, AWS, dan lainnya. Kami memilih stack teknologi terbaik berdasarkan kebutuhan proyek spesifik Anda.',
  8
),
(
  'Technical',
  'Teknis',
  'Do you handle hosting and deployment?',
  'Apakah Anda menangani hosting dan deployment?',
  'Yes, we provide complete hosting and deployment solutions. We work with major cloud providers like AWS, Google Cloud, and Vercel. We also handle domain setup, SSL certificates, and ongoing server maintenance.',
  'Ya, kami menyediakan solusi hosting dan deployment lengkap. Kami bekerja dengan penyedia cloud utama seperti AWS, Google Cloud, dan Vercel. Kami juga menangani setup domain, sertifikat SSL, dan pemeliharaan server berkelanjutan.',
  9
)
ON CONFLICT DO NOTHING;