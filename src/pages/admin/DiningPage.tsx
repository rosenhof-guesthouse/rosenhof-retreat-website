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

const DiningPage = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

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

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Dining Content</h1>
      <Card>
        <CardHeader><CardTitle>The Rock Restaurant & Bar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {content.map((item) => {
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
