import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

export const useSiteContent = (section: string) => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("content_key, content_value")
      .eq("section", section)
      .then(({ data }) => {
        if (data) {
          const map: ContentMap = {};
          data.forEach((row) => { map[row.content_key] = row.content_value; });
          setContent(map);
        }
        setLoading(false);
      });
  }, [section]);

  return { content, loading };
};

export const useDiningContent = () => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("dining_content")
      .select("content_key, content_value")
      .then(({ data }) => {
        if (data) {
          const map: ContentMap = {};
          data.forEach((row) => { map[row.content_key] = row.content_value; });
          setContent(map);
        }
        setLoading(false);
      });
  }, []);

  return { content, loading };
};

export const useEventsContent = () => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("events_content")
      .select("content_key, content_value")
      .then(({ data }) => {
        if (data) {
          const map: ContentMap = {};
          data.forEach((row) => { map[row.content_key] = row.content_value; });
          setContent(map);
        }
        setLoading(false);
      });
  }, []);

  return { content, loading };
};

export const useRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("rooms")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data) setRooms(data);
        setLoading(false);
      });
  }, []);

  return { rooms, loading };
};
