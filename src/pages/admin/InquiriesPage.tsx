import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  check_in: string | null;
  check_out: string | null;
  guests: number | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load inquiries");
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { loadInquiries(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      toast.success("Status updated");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Inquiries</h1>
      {inquiries.length === 0 ? (
        <p className="text-muted-foreground">No inquiries yet.</p>
      ) : (
        <div className="bg-card rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell className="text-sm">{format(new Date(inq.created_at), "dd MMM yyyy")}</TableCell>
                  <TableCell className="font-medium">{inq.name}</TableCell>
                  <TableCell>{inq.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{inq.inquiry_type}</Badge>
                  </TableCell>
                  <TableCell>{inq.check_in || "—"}</TableCell>
                  <TableCell>{inq.guests || "—"}</TableCell>
                  <TableCell>
                    <Select value={inq.status} onValueChange={(v) => updateStatus(inq.id, v)}>
                      <SelectTrigger className="w-[130px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(statusColors).map((s) => (
                          <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default InquiriesPage;
