
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface AssignReportDialogProps {
  open: boolean;
  onClose: () => void;
  onAssign: (unitId: string) => void;
}

const AssignReportDialog = ({ open, onClose, onAssign }: AssignReportDialogProps) => {
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleAssign = () => {
    if (selectedUnit) {
      onAssign(selectedUnit);
      setSelectedUnit("");
    }
  };

  const units = [
    { id: "unit-1", name: "Saha Ekibi 1" },
    { id: "unit-2", name: "Saha Ekibi 2" },
    { id: "unit-3", name: "Teknik Servis" },
    { id: "unit-4", name: "Müşteri Hizmetleri" },
    { id: "unit-5", name: "Yönetim" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Raporu Ata</DialogTitle>
          <DialogDescription>
            Raporu ilgili birime atayın.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Birim seçin" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>İptal</Button>
          <Button onClick={handleAssign} disabled={!selectedUnit}>Ata</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignReportDialog;
