-- ============================================================
-- ROSENHOF RETREAT — FULL SCHEMA MIGRATION
-- Run this once on the new Supabase project
-- ============================================================

-- ── ENUMS ────────────────────────────────────────────────────
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- ── UPDATE TIMESTAMP TRIGGER ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ── USER ROLES (must exist before has_role function) ─────────
CREATE TABLE public.user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role       app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ── HAS_ROLE (defined after user_roles table) ────────────────
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ── SITE CONTENT ─────────────────────────────────────────────
CREATE TABLE public.site_content (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section       TEXT NOT NULL,
  content_key   TEXT NOT NULL,
  content_value TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (section, content_key)
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content" ON public.site_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── ROOMS ────────────────────────────────────────────────────
CREATE TABLE public.rooms (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  description    TEXT NOT NULL DEFAULT '',
  image_url      TEXT,
  alt_text       TEXT,
  display_order  INT NOT NULL DEFAULT 0,
  features       JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rooms" ON public.rooms
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage rooms" ON public.rooms
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── DINING CONTENT ───────────────────────────────────────────
CREATE TABLE public.dining_content (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key   TEXT NOT NULL UNIQUE,
  content_value TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.dining_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dining content" ON public.dining_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage dining content" ON public.dining_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_dining_content_updated_at
  BEFORE UPDATE ON public.dining_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── EVENTS CONTENT ───────────────────────────────────────────
CREATE TABLE public.events_content (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key   TEXT NOT NULL UNIQUE,
  content_value TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.events_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events content" ON public.events_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage events content" ON public.events_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_events_content_updated_at
  BEFORE UPDATE ON public.events_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── INQUIRIES ────────────────────────────────────────────────
CREATE TABLE public.inquiries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  inquiry_type TEXT NOT NULL DEFAULT 'Room Booking',
  check_in     DATE,
  check_out    DATE,
  guests       INT,
  message      TEXT,
  status       TEXT NOT NULL DEFAULT 'new',
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view inquiries" ON public.inquiries
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage inquiries" ON public.inquiries
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete inquiries" ON public.inquiries
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── STORAGE BUCKET ───────────────────────────────────────────
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

-- ── SEED ROOMS ───────────────────────────────────────────────
INSERT INTO public.rooms (title, description, display_order, features, gallery_images) VALUES
  ('Hotel Wing Room H1',  '', 1,  '[]'::jsonb, '[]'::jsonb),
  ('Hotel Wing Room H2',  '', 2,  '[]'::jsonb, '[]'::jsonb),
  ('Hotel Wing Room H3',  '', 3,  '[]'::jsonb, '[]'::jsonb),
  ('Hotel Wing Room H4',  '', 4,  '[]'::jsonb, '[]'::jsonb),
  ('Hotel Wing Room H5',  '', 5,  '[]'::jsonb, '[]'::jsonb),
  ('Hotel Wing Room H6',  '', 6,  '[]'::jsonb, '[]'::jsonb),
  ('Garden Wing Room G1', '', 7,  '[]'::jsonb, '[]'::jsonb),
  ('Garden Wing Room G2', '', 8,  '[]'::jsonb, '[]'::jsonb),
  ('Garden Wing Room G3', '', 9,  '[]'::jsonb, '[]'::jsonb),
  ('Garden Wing Room G4', '', 10, '[]'::jsonb, '[]'::jsonb),
  ('Garden Wing Room G5', '', 11, '[]'::jsonb, '[]'::jsonb),
  ('Garden Wing Room G6', '', 12, '[]'::jsonb, '[]'::jsonb),
  ('The Rondavel',        '', 13, '[]'::jsonb, '[]'::jsonb);
