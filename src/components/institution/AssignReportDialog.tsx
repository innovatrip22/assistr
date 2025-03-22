
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateReportStatus } from "@/services";
import { toast } from "sonner";

interface AssignReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string | null;
  onSubmitSuccess: () => void;
}

const departments = [
  { id: "tourism", name: "Turizm Departmanı" },
  { id: "consumer", name: "Tüketici Hakları" },
  { id: "security", name: "Güvenlik Birimi" },
  { id: "health", name: "Sağlık Departmanı" },
  { id: "environment", name: "Çevre Koruma" }
];

const AssignReportDialog = ({ open, onOpenChange, selectedId, onSubmitSuccess }: AssignReportDialogProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const handleSubmit = async () => {
    if (!selectedDepartment) {
      toast.error("Lütfen bir departman seçin");
      return;
    }

    if (selectedId) {
      try {
        // Burada normalde assignReportToDepartment gibi bir fonksiyon olabilir
        // Şimdilik updateReportStatus kullanarak durumu "processed" olarak güncelliyoruz
        await updateReportStatus(selectedId, "processed");
        
        toast.success("Rapor ilgili birime atandı");
        onOpenChange(false);
        setSelectedDepartment("");
        onSubmitSuccess();
      } catch (error) {
        console.error("Rapor atama hatası:", error);
        toast.error("Rapor ataması yapılırken bir hata oluştu");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raporu Birime Ata</DialogTitle>
          <DialogDescription>
            Bu şikayeti işlemesi için bir birime yönlendirin.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Bir departman seçin" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSubmit}>
            Ata
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignReportDialog;
