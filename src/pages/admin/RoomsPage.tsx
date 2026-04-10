import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Room {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  alt_text: string | null;
  display_order: number;
}

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editing, setEditing] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image_url: "", alt_text: "", display_order: 0 });

  const load = async () => {
    const { data } = await supabase.from("rooms").select("*").order("display_order");
    setRooms((data as Room[]) || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", description: "", image_url: "", alt_text: "", display_order: rooms.length + 1 });
    setDialogOpen(true);
  };

  const openEdit = (room: Room) => {
    setEditing(room);
    setForm({ title: room.title, description: room.description, image_url: room.image_url || "", alt_text: room.alt_text || "", display_order: room.display_order });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (editing) {
      const { error } = await supabase.from("rooms").update(form).eq("id", editing.id);
      if (error) { toast.error("Failed to update"); return; }
      toast.success("Room updated");
    } else {
      const { error } = await supabase.from("rooms").insert(form);
      if (error) { toast.error("Failed to create"); return; }
      toast.success("Room created");
    }
    setDialogOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this room?")) return;
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Room deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Rooms</h1>
        <Button onClick={openNew}><Plus size={16} className="mr-2" />Add Room</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                {room.title}
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(room)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(room.id)}><Trash2 size={16} /></Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{room.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Room" : "Add Room"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
            <div><Label>Alt Text</Label><Input value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} /></div>
            <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
            <Button className="w-full" onClick={handleSave}>{editing ? "Save Changes" : "Create Room"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;
