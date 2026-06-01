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
  section: string;
  content_key: string;
  content_value: string;
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  about: "About Section",
  dining: "Dining Section",
  footer: "Footer",
};

const keyLabels: Record<string, string> = {
  location_label: "Location Label",
  headline: "Headline",
  subheadline: "Sub-headline",
  tag: "Section Tag",
  paragraph_1: "Paragraph 1",
  paragraph_2: "Paragraph 2",
  address: "Address",
  phone: "Phone Number",
  email: "Email",
  pet_policy: "Pet Policy Note",
  instagram_url: "Instagram URL",
  facebook_url: "Facebook URL",
  description: "Description",
  feature_1: "Feature 1",
  feature_2: "Feature 2",
  feature_3: "Feature 3",
};

const IMAGE_SECTIONS = ["about"];

const getStoragePath = (url: string) => url.split("/site-images/")[1];

const ContentEditorPage = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const load = async () => {
      const [{ data: siteData }, { data: diningData }] = await Promise.all([
        supabase.from("site_content").select("*").order("section").order("content_key"),
        supabase.from("dining_content").select("*").order("content_key"),
      ]);
      const dining = (diningData || []).map((d) => ({ ...d, section: "dining" }));
      setContent([...(siteData as ContentItem[] || []), ...(dining as ContentItem[])]);
      setLoading(false);
    };
    load();
  }, []);

  const updateValue = (id: string, value: string) => {
    setContent((prev) => prev.map((c) => (c.id === id ? { ...c, content_value: value } : c)));
  };

  const saveItem = async (item: ContentItem) => {
    setSaving(item.id);
    const table = item.section === "dining" ? "dining_content" : "site_content";
    const { error } = await supabase.from(table).update({ content_value: item.content_value }).eq("id", item.id);
    setSaving(null);
    if (error) toast.error("Failed to save");
    else toast.success("Saved");
  };

  const handleImageUpload = async (section: string, file: File) => {
    setUploadingSection(section);
    try {
      const compressed = await compressImage(file);
      // Delete old image if exists
      const existing = content.find((c) => c.section === section && c.content_key === "image_url");
      if (existing?.content_value) {
        const path = getStoragePath(existing.content_value);
        if (path) await supabase.storage.from("site-images").remove([path]);
      }
      // Upload new image
      const path = `${section}-${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage.from("site-images").upload(path, compressed);
      if (uploadError) { toast.error("Upload failed"); return; }
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      // Save URL to correct table
      if (existing) {
        const table = section === "dining" ? "dining_content" : "site_content";
        await supabase.from(table).update({ content_value: data.publicUrl }).eq("id", existing.id);
        setContent((prev) => prev.map((c) => c.id === existing.id ? { ...c, content_value: data.publicUrl } : c));
      }
      toast.success("Image updated");
    } catch {
      toast.error("Failed to process image");
    } finally {
      setUploadingSection(null);
    }
  };

  const handleClearImage = async (section: string) => {
    const existing = content.find((c) => c.section === section && c.content_key === "image_url");
    if (!existing?.content_value) return;
    const path = getStoragePath(existing.content_value);
    if (path) await supabase.storage.from("site-images").remove([path]);
    const table = section === "dining" ? "dining_content" : "site_content";
    await supabase.from(table).update({ content_value: "" }).eq("id", existing.id);
    setContent((prev) => prev.map((c) => c.id === existing.id ? { ...c, content_value: "" } : c));
    toast.success("Image removed — fallback image will show");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  const grouped = content.reduce((acc, item) => {
    if (item.content_key === "image_url") return acc;
    if (item.section === "dining") return acc; // handled in Dining page
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Site Content</h1>
      <div className="space-y-6">
        {Object.entries(grouped).map(([section, items]) => {
          const imageItem = content.find((c) => c.section === section && c.content_key === "image_url");
          const isImageSection = IMAGE_SECTIONS.includes(section);
          return (
            <Card key={section}>
              <CardHeader>
                <CardTitle>{sectionLabels[section] || section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Image upload for About and Dining */}
                {isImageSection && (
                  <div>
                    <Label>Section Image</Label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => { fileRefs.current[section] = el; }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(section, file);
                        e.target.value = "";
                      }}
                    />
                    {imageItem?.content_value ? (
                      <div className="relative mt-2 w-full max-w-sm">
                        <img src={imageItem.content_value} alt="Section" className="w-full h-40 object-cover rounded-md" />
                        <Button
                          variant="destructive" size="icon"
                          className="absolute top-2 right-2 h-7 w-7"
                          onClick={() => handleClearImage(section)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileRefs.current[section]?.click()}
                        className="mt-2 border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors max-w-sm"
                      >
                        <Upload size={20} className="mx-auto mb-1 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {uploadingSection === section ? "Uploading..." : "Click to upload image"}
                        </p>
                      </div>
                    )}
                    {imageItem?.content_value && (
                      <Button
                        size="sm" variant="outline" className="mt-2"
                        disabled={uploadingSection === section}
                        onClick={() => fileRefs.current[section]?.click()}
                      >
                        <Upload size={14} className="mr-1" />
                        {uploadingSection === section ? "Uploading..." : "Replace Image"}
                      </Button>
                    )}
                  </div>
                )}

                {/* Text fields */}
                {items.map((item) => {
                  const isLong = ["description", "paragraph_1", "paragraph_2", "subheadline"].includes(item.content_key);
                  return (
                    <div key={item.id} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Label className="text-xs text-muted-foreground">
                          {keyLabels[item.content_key] || item.content_key}
                        </Label>
                        {isLong ? (
                          <Textarea value={item.content_value} onChange={(e) => updateValue(item.id, e.target.value)} rows={3} />
                        ) : (
                          <Input value={item.content_value} onChange={(e) => updateValue(item.id, e.target.value)} />
                        )}
                      </div>
                      <Button size="sm" variant="outline" disabled={saving === item.id} onClick={() => saveItem(item)}>
                        <Save size={14} className="mr-1" />
                        {saving === item.id ? "..." : "Save"}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContentEditorPage;
