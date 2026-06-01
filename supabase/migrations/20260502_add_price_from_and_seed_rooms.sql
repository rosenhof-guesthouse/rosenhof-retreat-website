-- Add price_from column to rooms
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS price_from INTEGER;

-- Update Hotel Wing rooms (Netflix + Free WiFi)
UPDATE public.rooms SET
  description = 'Comfortable double room with en-suite bath. Includes Netflix and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"Netflix"},{"icon":"Bath","label":"En-suite Bath"}]'::jsonb,
  price_from = 350
WHERE title = 'Hotel Wing Room H1';

UPDATE public.rooms SET
  description = 'Comfortable double room with en-suite shower. Includes Netflix and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"Netflix"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350
WHERE title = 'Hotel Wing Room H2';

UPDATE public.rooms SET
  description = 'Comfortable double room with en-suite shower. Includes Netflix and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"Netflix"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350
WHERE title = 'Hotel Wing Room H3';

UPDATE public.rooms SET
  description = 'Comfortable double room with en-suite bath. Includes Netflix and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"Netflix"},{"icon":"Bath","label":"En-suite Bath"}]'::jsonb,
  price_from = 350
WHERE title = 'Hotel Wing Room H4';

UPDATE public.rooms SET
  description = 'Spacious queen room with en-suite bath. Includes Netflix and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"Netflix"},{"icon":"Bath","label":"En-suite Bath"}]'::jsonb,
  price_from = 350
WHERE title = 'Hotel Wing Room H5';

UPDATE public.rooms SET
  description = 'Comfortable double room with en-suite bath. Includes Netflix and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"Netflix"},{"icon":"Bath","label":"En-suite Bath"}]'::jsonb,
  price_from = 350
WHERE title = 'Hotel Wing Room H6';

-- Update Garden Wing rooms (OpenView DSTV + Free WiFi)
UPDATE public.rooms SET
  description = 'Garden room with double and single beds, en-suite shower. Includes OpenView and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"OpenView"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350
WHERE title = 'Garden Wing Room G1';

UPDATE public.rooms SET
  description = 'Spacious garden room with 2 double beds and a single bed, en-suite shower. Ideal for groups. Includes OpenView and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"OpenView"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 500
WHERE title = 'Garden Wing Room G2';

UPDATE public.rooms SET
  description = 'Garden room with double and single beds, en-suite shower. Includes OpenView and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"OpenView"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350
WHERE title = 'Garden Wing Room G3';

UPDATE public.rooms SET
  description = 'Garden room with double and single beds, en-suite bath. Includes OpenView and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"OpenView"},{"icon":"Bath","label":"En-suite Bath"}]'::jsonb,
  price_from = 350
WHERE title = 'Garden Wing Room G4';

UPDATE public.rooms SET
  description = 'Garden room with double and single beds, en-suite shower. Includes OpenView and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"OpenView"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350
WHERE title = 'Garden Wing Room G5';

-- Rename G6 to The Flat and update
UPDATE public.rooms SET
  title = 'The Flat',
  description = 'Private flat with double bed and en-suite shower. Includes OpenView and free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"Tv","label":"OpenView"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350,
  display_order = 12
WHERE title = 'Garden Wing Room G6';

-- Update The Rondavel
UPDATE public.rooms SET
  description = 'Charming traditional rondavel with single bed and en-suite shower. Includes free WiFi.',
  features = '[{"icon":"Wifi","label":"Free WiFi"},{"icon":"ShowerHead","label":"En-suite Shower"}]'::jsonb,
  price_from = 350,
  display_order = 13
WHERE title = 'The Rondavel';
