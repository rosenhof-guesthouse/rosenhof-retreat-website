import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from("rooms").select("*").order("display_order");
    setRooms((data as Room[]) || []);
  };

  useEffect(() => { load(); }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, image_url: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("room-images").upload(path, file);
    if (error) { toast.error("Image upload failed"); return null; }
    const { data } = supabase.storage.from("room-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", description: "", image_url: "", alt_text: "", display_order: rooms.length + 1 });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDialogOpen(true);
  };

  const openEdit = (room: Room) => {
    setEditing(room);
    setForm({ title: room.title, description: room.description, image_url: room.image_url || "", alt_text: room.alt_text || "", display_order: room.display_order });
    setImageFile(null);
    setImagePreview(room.image_url || null);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setUploading(true);
    let imageUrl = form.image_url;
    if (imageFile) {
      const url = await uploadImage(imageFile);
      if (!url) { setUploading(false); return; }
      imageUrl = url;
    }
    const payload = { ...form, image_url: imageUrl || null };
    if (editing) {
      const { error } = await supabase.from("rooms").update(payload).eq("id", editing.id);
      if (error) { toast.error("Failed to update"); setUploading(false); return; }
      toast.success("Room updated");
    } else {
      const { error } = await supabase.from("rooms").insert(payload);
      if (error) { toast.error("Failed to create"); setUploading(false); return; }
      toast.success("Room created");
    }
    setUploading(false);
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
            {room.image_url && (
              <img src={room.image_url} alt={room.alt_text || room.title} className="w-full h-40 object-cover rounded-t-lg" />
            )}
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
            <div>
              <Label>Room Image</Label>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
              {imagePreview ? (
                <div className="relative mt-2">
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={clearImage}><X size={14} /></Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 border-2 border-dashed border-border rounded-md p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload an image</p>
                </div>
              )}
            </div>
            <div><Label>Alt Text</Label><Input value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} /></div>
            <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
            <Button className="w-full" onClick={handleSave} disabled={uploading}>{uploading ? "Uploading…" : editing ? "Save Changes" : "Create Room"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;
