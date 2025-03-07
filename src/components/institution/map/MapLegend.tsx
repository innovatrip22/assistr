
import { ReactNode } from "react";

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem = ({ color, label }: LegendItemProps) => (
  <div className="flex items-center gap-1">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    <span className="text-xs">{label}</span>
  </div>
);

interface MapLegendProps {
  title: string;
  items: { color: string; label: string }[];
  className?: string;
  children?: ReactNode;
}

const MapLegend = ({ title, items, className = "", children }: MapLegendProps) => {
  return (
    <div className={`absolute top-2 right-2 bg-white p-2 rounded-md shadow-md z-10 ${className}`}>
      <div className="text-xs font-semibold mb-1">{title}</div>
      {items.map((item, index) => (
        <LegendItem key={index} color={item.color} label={item.label} />
      ))}
      {children}
    </div>
  );
};

export default MapLegend;
