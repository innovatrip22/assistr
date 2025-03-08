
import { CardTitle } from "@/components/ui/card";

interface AuthDialogHeaderProps {
  title: string;
  onClose?: () => void;
}

const AuthDialogHeader = ({ title, onClose }: AuthDialogHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <CardTitle>{title}</CardTitle>
    </div>
  );
};

export default AuthDialogHeader;
