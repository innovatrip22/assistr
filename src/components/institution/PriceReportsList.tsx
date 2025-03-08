
import { useState, useEffect } from "react";
import { ShoppingCart, Calendar, Clock, CheckCircle, ReplyAll, Share2 } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { getReports, updateReportStatus } from "@/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface PriceReportsListProps {
  onOpenResponseDialog: (id: string, type: 'report') => void;
  onAssignReport: (id: string) => void;
  loadData: () => void;
  limit?: number;
}

const PriceReportsList = ({ onOpenResponseDialog, onAssignReport, loadData, limit }: PriceReportsListProps) => {
  return null; // This component is now disabled
};

export default PriceReportsList;
