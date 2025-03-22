
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface ResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRespond: (response: string) => void;
}

const ResponseDialog = ({ open, onOpenChange, onRespond }: ResponseDialogProps) => {
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    if (response.trim()) {
      onRespond(response);
      setResponse("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yanıt Gönder</DialogTitle>
          <DialogDescription>
            Geri bildirime verdiğiniz yanıt kullanıcıya doğrudan iletilecektir.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Yanıtınızı buraya yazın..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
          <Button onClick={handleSubmit}>Yanıt Gönder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;
