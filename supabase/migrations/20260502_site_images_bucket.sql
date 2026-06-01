-- Storage bucket for site images (about, dining, hero, etc.)
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

CREATE POLICY "Anyone can view site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

CREATE POLICY "Admins can upload site images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- Add image keys to site_content for about and dining sections
INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('about',  'image_url', ''),
  ('dining', 'image_url', '')
ON CONFLICT (section, content_key) DO NOTHING;

-- Add image_url to events_content
INSERT INTO public.events_content (content_key, content_value) VALUES
  ('image_url', '')
ON CONFLICT (content_key) DO NOTHING;
