import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ContentItem {
  id: string;
  section: string;
  content_key: string;
  content_value: string;
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  about: "About Section",
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
};

const ContentEditorPage = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_content").select("*").order("section").order("content_key");
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
    const { error } = await supabase
      .from("site_content")
      .update({ content_value: item.content_value })
      .eq("id", item.id);
    setSaving(null);
    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Saved");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  const grouped = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Site Content</h1>
      <div className="space-y-6">
        {Object.entries(grouped).map(([section, items]) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle>{sectionLabels[section] || section}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const isLong = item.content_value.length > 80;
                return (
                  <div key={item.id} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">
                        {keyLabels[item.content_key] || item.content_key}
                      </Label>
                      {isLong ? (
                        <Textarea
                          value={item.content_value}
                          onChange={(e) => updateValue(item.id, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          value={item.content_value}
                          onChange={(e) => updateValue(item.id, e.target.value)}
                        />
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={saving === item.id}
                      onClick={() => saveItem(item)}
                    >
                      <Save size={14} className="mr-1" />
                      {saving === item.id ? "..." : "Save"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentEditorPage;
