
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface AssignReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (unitId: string) => void;
}

const AssignReportDialog = ({ open, onOpenChange, onAssign }: AssignReportDialogProps) => {
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleAssign = () => {
    if (selectedUnit) {
      onAssign(selectedUnit);
      setSelectedUnit("");
      onOpenChange(false);
    }
  };

  const units = [
    { id: "unit-1", name: "KKTC Saha Ekibi 1" },
    { id: "unit-2", name: "KKTC Saha Ekibi 2" },
    { id: "unit-3", name: "KKTC Teknik Servis" },
    { id: "unit-4", name: "KKTC Turizm Müdürlüğü" },
    { id: "unit-5", name: "KKTC Belediye Ekibi" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Raporu Ata</DialogTitle>
          <DialogDescription>
            Raporu ilgili KKTC birimine atayın.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="KKTC birimi seçin" />
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
          <Button onClick={handleAssign} disabled={!selectedUnit}>Ata</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignReportDialog;
