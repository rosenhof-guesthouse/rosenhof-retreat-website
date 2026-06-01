import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Upload, X } from "lucide-react";
import { compressImage } from "@/lib/compressImage";

interface ContentItem {
  id: string;
  content_key: string;
  content_value: string;
}

const keyLabels: Record<string, string> = {
  tag: "Section Tag",
  headline: "Headline",
  description: "Description",
  feature_1: "Feature 1",
  feature_2: "Feature 2",
  feature_3: "Feature 3",
};

const getStoragePath = (url: string) => url.split("/site-images/")[1];

const DiningPage = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("dining_content").select("*").order("content_key");
      setContent((data as ContentItem[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const updateValue = (id: string, value: string) => {
    setContent((prev) => prev.map((c) => (c.id === id ? { ...c, content_value: value } : c)));
  };

  const saveItem = async (item: ContentItem) => {
    setSaving(item.id);
    const { error } = await supabase.from("dining_content").update({ content_value: item.content_value }).eq("id", item.id);
    setSaving(null);
    if (error) toast.error("Failed to save");
    else toast.success("Saved");
  };

  const imageItem = content.find((c) => c.content_key === "image_url");

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      if (imageItem?.content_value) {
        const path = getStoragePath(imageItem.content_value);
        if (path) await supabase.storage.from("site-images").remove([path]);
      }
      const path = `dining-${crypto.randomUUID()}.jpg`;
      const { error } = await supabase.storage.from("site-images").upload(path, compressed);
      if (error) { toast.error("Upload failed"); return; }
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      if (imageItem) {
        await supabase.from("dining_content").update({ content_value: data.publicUrl }).eq("id", imageItem.id);
        setContent((prev) => prev.map((c) => c.id === imageItem.id ? { ...c, content_value: data.publicUrl } : c));
      } else {
        const { data: inserted } = await supabase.from("dining_content").insert({ content_key: "image_url", content_value: data.publicUrl }).select().single();
        if (inserted) setContent((prev) => [...prev, inserted as ContentItem]);
      }
      toast.success("Image updated");
    } catch {
      toast.error("Failed to process image");
    } finally {
      setUploading(false);
    }
  };

  const handleClearImage = async () => {
    if (!imageItem?.content_value) return;
    const path = getStoragePath(imageItem.content_value);
    if (path) await supabase.storage.from("site-images").remove([path]);
    await supabase.from("dining_content").update({ content_value: "" }).eq("id", imageItem.id);
    setContent((prev) => prev.map((c) => c.id === imageItem.id ? { ...c, content_value: "" } : c));
    toast.success("Image removed — fallback image will show");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  const textItems = content.filter((c) => c.content_key !== "image_url");

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Dining Content</h1>
      <Card>
        <CardHeader><CardTitle>The Rock Restaurant & Bar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* Image upload */}
          <div>
            <Label>Restaurant Image</Label>
            <input type="file" accept="image/*" className="hidden" ref={fileRef}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }}
            />
            {imageItem?.content_value ? (
              <div className="relative mt-2 w-full max-w-sm">
                <img src={imageItem.content_value} alt="Restaurant" className="w-full h-40 object-cover rounded-md" />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleClearImage}>
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div onClick={() => fileRef.current?.click()}
                className="mt-2 border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors max-w-sm"
              >
                <Upload size={20} className="mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Click to upload restaurant image"}</p>
              </div>
            )}
            {imageItem?.content_value && (
              <Button size="sm" variant="outline" className="mt-2" disabled={uploading} onClick={() => fileRef.current?.click()}>
                <Upload size={14} className="mr-1" />{uploading ? "Uploading..." : "Replace Image"}
              </Button>
            )}
          </div>

          {/* Text fields */}
          {textItems.map((item) => {
            const isLong = item.content_key === "description";
            return (
              <div key={item.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">{keyLabels[item.content_key] || item.content_key}</Label>
                  {isLong ? (
                    <Textarea value={item.content_value} onChange={(e) => updateValue(item.id, e.target.value)} rows={3} />
                  ) : (
                    <Input value={item.content_value} onChange={(e) => updateValue(item.id, e.target.value)} />
                  )}
                </div>
                <Button size="sm" variant="outline" disabled={saving === item.id} onClick={() => saveItem(item)}>
                  <Save size={14} className="mr-1" />{saving === item.id ? "..." : "Save"}
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiningPage;
