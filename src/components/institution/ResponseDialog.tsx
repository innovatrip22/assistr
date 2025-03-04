
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addFeedbackResponse, addReportResponse } from "@/services/dataService";
import { toast } from "sonner";

interface ResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string | null;
  selectedType: 'feedback' | 'report' | null;
  onSubmitSuccess: () => void;
}

const ResponseDialog = ({ open, onOpenChange, selectedId, selectedType, onSubmitSuccess }: ResponseDialogProps) => {
  const [responseText, setResponseText] = useState("");

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      toast.error("Lütfen bir yanıt girin");
      return;
    }

    if (selectedType === 'feedback' && selectedId) {
      addFeedbackResponse(selectedId, responseText);
      toast.success("Yanıtınız başarıyla gönderildi");
    } else if (selectedType === 'report' && selectedId) {
      addReportResponse(selectedId, responseText);
      toast.success("Yanıtınız başarıyla gönderildi");
    }

    onOpenChange(false);
    setResponseText("");
    onSubmitSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yanıt Gönder</DialogTitle>
          <DialogDescription>
            Kullanıcıya gönderilecek yanıtı yazın. Bu yanıt kullanıcının turist panelinde görüntülenecektir.
          </DialogDescription>
        </DialogHeader>
        
        <Textarea
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Yanıtınızı buraya yazın..."
          className="min-h-[120px]"
        />
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSubmitResponse}>
            Yanıt Gönder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;
