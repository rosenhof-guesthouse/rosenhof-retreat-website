import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * One-click backup. Pulls rooms + site/dining/events content + inquiries
 * and downloads a timestamped JSON file the owner can keep off-site.
 */
const BackupExport = () => {
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const [rooms, site, dining, events, inquiries] = await Promise.all([
        supabase.from("rooms").select("*"),
        supabase.from("site_content").select("*"),
        supabase.from("dining_content").select("*"),
        supabase.from("events_content").select("*"),
        supabase.from("inquiries").select("*"),
      ]);

      const dump = {
        exported_at: new Date().toISOString(),
        rooms: rooms.data ?? [],
        site_content: site.data ?? [],
        dining_content: dining.data ?? [],
        events_content: events.data ?? [],
        inquiries: inquiries.data ?? [],
      };

      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `rosenhof-backup-${stamp}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Backup downloaded");
    } catch {
      toast.error("Backup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport} disabled={busy}>
      <Download size={16} className="mr-2" />
      {busy ? "Exporting…" : "Download backup"}
    </Button>
  );
};

export default BackupExport;
