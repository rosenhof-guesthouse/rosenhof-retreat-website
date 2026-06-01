import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BedDouble, Clock } from "lucide-react";
import BackupExport from "@/components/admin/BackupExport";

const DashboardHome = () => {
  const [stats, setStats] = useState({ inquiries: 0, newInquiries: 0, rooms: 0 });

  useEffect(() => {
    const load = async () => {
      const [{ count: inquiries }, { count: newInquiries }, { count: rooms }] = await Promise.all([
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("rooms").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        inquiries: inquiries ?? 0,
        newInquiries: newInquiries ?? 0,
        rooms: rooms ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Total Inquiries", value: stats.inquiries, icon: MessageSquare },
    { label: "New Inquiries", value: stats.newInquiries, icon: Clock },
    { label: "Rooms Listed", value: stats.rooms, icon: BedDouble },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <BackupExport />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
