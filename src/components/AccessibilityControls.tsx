
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AccessibilityIcon, Eye, EyeOff, Volume2, VolumeX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number[]>([16]);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  
  // Apply font size to the root element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0]}px`;
  }, [fontSize]);
  
  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);
  
  // Toggle screen reader announcements
  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    if (!screenReader) {
      toast("Screen reader mode activated", {
        description: "Screen reader functionality is now enabled"
      });
      // In a real app, we would initialize an actual screen reader API here
    } else {
      toast("Screen reader mode deactivated");
    }
  };
  
  // Reset all settings to default
  const resetSettings = () => {
    setFontSize([16]);
    setHighContrast(false);
    setScreenReader(false);
    document.documentElement.style.fontSize = "16px";
    document.body.classList.remove("high-contrast");
    toast("Accessibility settings reset to default");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white shadow-md border-2 border-blue-200 hover:bg-blue-50"
            aria-label="Accessibility options"
          >
            <AccessibilityIcon className="h-5 w-5 text-blue-600" />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-blue-100 w-72"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility Options</h3>
            
            <div className="space-y-6">
              {/* Font Size Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size" className="text-sm font-medium">
                    Text Size
                  </Label>
                  <span className="text-xs text-gray-500">{fontSize}px</span>
                </div>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={fontSize}
                  onValueChange={setFontSize}
                  aria-label="Adjust text size"
                />
              </div>

              {/* High Contrast Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {highContrast ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  <Label htmlFor="high-contrast" className="text-sm font-medium">
                    High Contrast Mode
                  </Label>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                  aria-label="Toggle high contrast mode"
                />
              </div>

              {/* Screen Reader Support */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {screenReader ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <Label htmlFor="screen-reader" className="text-sm font-medium">
                    Screen Reader
                  </Label>
                </div>
                <Switch
                  id="screen-reader"
                  checked={screenReader}
                  onCheckedChange={toggleScreenReader}
                  aria-label="Toggle screen reader"
                />
              </div>

              {/* Reset Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={resetSettings}
              >
                Reset to Default
              </Button>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AccessibilityControls;
