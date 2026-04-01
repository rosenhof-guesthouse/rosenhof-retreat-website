import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.checkIn || !form.inquiryType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Thank you! Your enquiry has been submitted. We'll be in touch shortly.");
    onOpenChange(false);
    setForm({ name: "", email: "", inquiryType: "", checkIn: "", checkOut: "", guests: "2", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-foreground">Book Your Stay</DialogTitle>
          <p className="text-muted-foreground text-sm">Fill in your details and we'll confirm your reservation.</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="inquiryType">Type of Inquiry *</Label>
            <Select value={form.inquiryType} onValueChange={(value) => setForm({ ...form, inquiryType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="room-booking">Room Booking</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="checkIn">Check-in *</Label>
              <Input id="checkIn" type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="checkOut">Check-out</Label>
              <Input id="checkOut" type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" type="number" min="1" max="10" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Special Requests</Label>
            <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any special requirements..." rows={3} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Submit Enquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
