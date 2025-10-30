-- =============================================
-- PRICING PLANS SEED DATA
-- =============================================
-- Data seed untuk pricing plans dengan bilingual support

INSERT INTO public.pricing_plans (
  id,
  name_en, name_id,
  price_en, price_id,
  period_en, period_id,
  description_en, description_id,
  features_en, features_id,
  button_text_en, button_text_id,
  highlighted, popular,
  sort_order, is_active,
  color, icon
) VALUES

-- Starter Plan
(
  '550e8400-e29b-41d4-a716-446655440101',
  'Starter', 'Starter',
  'Rp 1.500.000', 'Rp 1.500.000',
  '/ project', '/ proyek',
  'Basic dashboard for businesses just starting out',
  'Dashboard dasar untuk bisnis yang baru memulai',
  '["Basic dashboard", "3 API integrations", "Real-time analytics", "Email support", "1 user account"]'::JSONB,
  '["Dashboard dasar", "Integrasi 3 API", "Real-time analytics", "Email support", "1 user account"]'::JSONB,
  'Schedule Free Demo', 'Jadwalkan Demo Gratis',
  false, false,
  1, true,
  'blue', 'Rocket'
),

-- Professional Plan (Most Popular)
(
  '550e8400-e29b-41d4-a716-446655440102',
  'Professional', 'Professional',
  'Rp 4.500.000', 'Rp 4.500.000',
  '/ project', '/ proyek',
  'Complete solution for growing businesses',
  'Solusi lengkap untuk bisnis yang berkembang',
  '["Advanced dashboard", "Unlimited API integration", "AI/ML integration", "Priority support", "Up to 10 users", "Custom analytics"]'::JSONB,
  '["Advanced dashboard", "Unlimited API integration", "AI/ML integration", "Priority support", "Up to 10 users", "Custom analytics"]'::JSONB,
  'Schedule Free Demo', 'Jadwalkan Demo Gratis',
  true, true,
  2, true,
  'purple', 'Crown'
),

-- Enterprise Plan
(
  '550e8400-e29b-41d4-a716-446655440103',
  'Enterprise', 'Enterprise',
  'Custom', 'Custom',
  '', '',
  'Custom solutions for enterprise needs',
  'Solusi khusus untuk kebutuhan enterprise',
  '["Custom AI development", "Dedicated support team", "On-premise deployment", "Unlimited users", "SLA guarantee", "Training & consultation"]'::JSONB,
  '["Custom AI development", "Dedicated support team", "On-premise deployment", "Unlimited users", "SLA guarantee", "Training & consultation"]'::JSONB,
  'Contact Us', 'Hubungi Kami',
  false, false,
  3, true,
  'orange', 'Building'
),

-- Premium Plan (Additional option)
(
  '550e8400-e29b-41d4-a716-446655440104',
  'Premium', 'Premium',
  'Rp 7.500.000', 'Rp 7.500.000',
  '/ project', '/ proyek',
  'Advanced solution with premium features',
  'Solusi lanjutan dengan fitur premium',
  '["Premium dashboard", "Advanced AI features", "White-label solution", "24/7 phone support", "Up to 25 users", "Advanced analytics", "API rate limiting"]'::JSONB,
  '["Premium dashboard", "Advanced AI features", "White-label solution", "24/7 phone support", "Up to 25 users", "Advanced analytics", "API rate limiting"]'::JSONB,
  'Schedule Free Demo', 'Jadwalkan Demo Gratis',
  false, false,
  4, false, -- Initially inactive
  'green', 'Star'
)

ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_id = EXCLUDED.name_id,
  price_en = EXCLUDED.price_en,
  price_id = EXCLUDED.price_id,
  period_en = EXCLUDED.period_en,
  period_id = EXCLUDED.period_id,
  description_en = EXCLUDED.description_en,
  description_id = EXCLUDED.description_id,
  features_en = EXCLUDED.features_en,
  features_id = EXCLUDED.features_id,
  button_text_en = EXCLUDED.button_text_en,
  button_text_id = EXCLUDED.button_text_id,
  highlighted = EXCLUDED.highlighted,
  popular = EXCLUDED.popular,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  updated_at = NOW();

-- =============================================
-- VERIFICATION
-- =============================================

SELECT 
  name_en,
  price_en,
  period_en,
  highlighted,
  popular,
  sort_order,
  is_active
FROM public.pricing_plans 
ORDER BY sort_order;