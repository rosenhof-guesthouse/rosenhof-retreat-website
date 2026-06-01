-- ── SITE CONTENT (hero, about, footer) ──────────────────────
INSERT INTO public.site_content (section, content_key, content_value) VALUES
  -- Hero
  ('hero', 'location_label',  'Paul Roux, Eastern Free State'),
  ('hero', 'headline',        'Step Back in Time at Rosenhof Exclusive Country Lodge'),
  ('hero', 'subheadline',     'Experience the tranquil beauty and "Olde World" charm of Paul Roux''s historic hidden gem.'),

  -- About
  ('about', 'headline',       'A Century of Charm & Heritage'),
  ('about', 'paragraph_1',    'Nestled in the heart of the Eastern Free State, Rosenhof is a beautifully restored century-old building that preserves the elegance of a bygone era.'),
  ('about', 'paragraph_2',    'Every room is adorned with hand-picked antiques and curated art, transporting guests to a world where craftsmanship and attention to detail were the hallmarks of true hospitality.'),

  -- Footer
  ('footer', 'address',       '18 Market St, Paul Roux, 9800'),
  ('footer', 'phone',         '+27 82 828 8381'),
  ('footer', 'email',         'info@rosenhofcountrylodge.co.za'),
  ('footer', 'pet_policy',    'Proudly Pet-Friendly — Inquire for details.'),
  ('footer', 'instagram_url', 'https://instagram.com'),
  ('footer', 'facebook_url',  'https://facebook.com')

ON CONFLICT (section, content_key) DO UPDATE
  SET content_value = EXCLUDED.content_value;

-- ── DINING CONTENT ───────────────────────────────────────────
INSERT INTO public.dining_content (content_key, content_value) VALUES
  ('tag',         'On-Site Restaurant'),
  ('headline',    'Local Flavours at The Rock'),
  ('description', 'Our on-site Rock Restaurant & Bar serves hearty, locally-inspired cuisine in a warm, rustic atmosphere. Whether you''re enjoying a full breakfast before exploring the Free State or a candlelit dinner after a long day, The Rock delivers comfort food with character.'),
  ('feature_1',   'Full Breakfast'),
  ('feature_2',   'Braai Facilities'),
  ('feature_3',   'Bar & Beverages')

ON CONFLICT (content_key) DO UPDATE
  SET content_value = EXCLUDED.content_value;

-- ── EVENTS CONTENT ───────────────────────────────────────────
INSERT INTO public.events_content (content_key, content_value) VALUES
  ('tag',         'Weddings & Events'),
  ('headline',    'Celebrate with Us'),
  ('description', 'From intimate weddings in our enchanting gardens to corporate conferences for up to 55 delegates, Rosenhof provides a unique heritage setting for life''s most important occasions. Our experienced team will ensure every detail is perfectly arranged.')

ON CONFLICT (content_key) DO UPDATE
  SET content_value = EXCLUDED.content_value;
