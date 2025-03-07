
import { Car } from "lucide-react";

const TrafficView = () => {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Car className="w-16 h-16 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">Trafik verileri yükleniyor...</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficView;
