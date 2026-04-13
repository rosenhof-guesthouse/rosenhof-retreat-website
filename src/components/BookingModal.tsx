import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.checkIn || !form.inquiryType) {
      toast.error(t("booking.fillFields"));
      return;
    }

    const { error } = await supabase.from("inquiries").insert({
      name: form.name,
      email: form.email,
      inquiry_type: form.inquiryType,
      check_in: form.checkIn || null,
      check_out: form.checkOut || null,
      guests: parseInt(form.guests) || null,
      message: form.message || null,
    });

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    toast.success(t("booking.success"));
    onOpenChange(false);
    setForm({ name: "", email: "", inquiryType: "", checkIn: "", checkOut: "", guests: "2", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-foreground">{t("booking.title")}</DialogTitle>
          <p className="text-muted-foreground text-sm">{t("booking.subtitle")}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t("booking.name")} *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("booking.email")} *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="inquiryType">{t("booking.inquiryType")} *</Label>
            <Select value={form.inquiryType} onValueChange={(value) => setForm({ ...form, inquiryType: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t("booking.selectType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Room Booking">{t("booking.roomBooking")}</SelectItem>
                <SelectItem value="Wedding">{t("booking.wedding")}</SelectItem>
                <SelectItem value="Conference">{t("booking.conference")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="checkIn">{t("booking.checkIn")} *</Label>
              <Input id="checkIn" type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="checkOut">{t("booking.checkOut")}</Label>
              <Input id="checkOut" type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="guests">{t("booking.guests")}</Label>
              <Input id="guests" type="number" min="1" max="10" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">{t("booking.specialRequests")}</Label>
            <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t("booking.specialPlaceholder")} rows={3} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            {t("booking.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
