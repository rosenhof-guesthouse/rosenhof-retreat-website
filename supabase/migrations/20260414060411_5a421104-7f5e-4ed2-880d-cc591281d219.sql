
INSERT INTO storage.buckets (id, name, public) VALUES ('room-images', 'room-images', true);

CREATE POLICY "Anyone can view room images"
ON storage.objects FOR SELECT
USING (bucket_id = 'room-images');

CREATE POLICY "Admins can upload room images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'room-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update room images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'room-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete room images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'room-images' AND public.has_role(auth.uid(), 'admin'));
