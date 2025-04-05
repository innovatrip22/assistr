
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  AccessibilityIcon, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  ArrowUp, 
  ArrowDown, 
  Sun, 
  Moon, 
  Text, 
  Type, 
  MousePointerClick, 
  Underline,
  PanelRight
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number[]>([16]);
  const [lineHeight, setLineHeight] = useState<number[]>([1.5]);
  const [letterSpacing, setLetterSpacing] = useState<number[]>([0]);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusHighlight, setFocusHighlight] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mousePointer, setMousePointer] = useState<string>("default");
  
  // Apply font size to the root element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0]}px`;
  }, [fontSize]);
  
  // Apply line height
  useEffect(() => {
    document.body.style.lineHeight = `${lineHeight[0]}`;
  }, [lineHeight]);
  
  // Apply letter spacing
  useEffect(() => {
    document.body.style.letterSpacing = `${letterSpacing[0]}px`;
  }, [letterSpacing]);
  
  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  // Apply dyslexic friendly font
  useEffect(() => {
    if (dyslexicFont) {
      document.documentElement.style.fontFamily = "'OpenDyslexic', sans-serif";
      // Add OpenDyslexic font if not already present
      if (!document.getElementById('dyslexic-font')) {
        const link = document.createElement('link');
        link.id = 'dyslexic-font';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/dist/opendyslexic.min.css';
        document.head.appendChild(link);
      }
    } else {
      document.documentElement.style.fontFamily = "";
      // Remove font if no longer needed
      const fontLink = document.getElementById('dyslexic-font');
      if (fontLink) {
        document.head.removeChild(fontLink);
      }
    }
  }, [dyslexicFont]);

  // Apply focus highlight
  useEffect(() => {
    if (focusHighlight) {
      document.body.classList.add("focus-highlighted");
    } else {
      document.body.classList.remove("focus-highlighted");
    }
  }, [focusHighlight]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [darkMode]);

  // Apply reduced motion
  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add("reduced-motion");
    } else {
      document.body.classList.remove("reduced-motion");
    }
  }, [reducedMotion]);

  // Apply cursor size
  useEffect(() => {
    switch(mousePointer) {
      case "large":
        document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 16 16\"><path fill=\"black\" d=\"M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z\" /><path d=\"M5.712 6.96l.167-.167a1.99 1.99 0 0 1 .896-.518 1.99 1.99 0 0 1 .518-.896l.167-.167A3.004 3.004 0 0 0 6 5.499c-.22.46-.316.963-.288 1.46z\" /></svg>'), auto";
        break;
      case "contrast":
        document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 16 16\"><path fill=\"white\" stroke=\"black\" stroke-width=\"1\" d=\"M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z\" /><path fill=\"white\" stroke=\"black\" stroke-width=\"1\" d=\"M5.712 6.96l.167-.167a1.99 1.99 0 0 1 .896-.518 1.99 1.99 0 0 1 .518-.896l.167-.167A3.004 3.004 0 0 0 6 5.499c-.22.46-.316.963-.288 1.46z\" /></svg>'), auto";
        break;
      default:
        document.body.style.cursor = "";
    }
  }, [mousePointer]);
  
  // Toggle screen reader announcements
  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    if (!screenReader) {
      toast.success("Screen reader mode activated", {
        description: "Screen reader functionality is now enabled",
        id: "screen-reader-toast"
      });
      // In a real app, we would initialize an actual screen reader API here
    } else {
      toast.info("Screen reader mode deactivated", {
        id: "screen-reader-toast"
      });
    }
  };

  // Toggle text to speech
  const toggleTextToSpeech = () => {
    setTextToSpeech(!textToSpeech);
    if (!textToSpeech) {
      toast.success("Text to speech activated", {
        description: "Hover over text to hear it read aloud",
        id: "text-to-speech-toast"
      });
      // In a real app, we would initialize text-to-speech functionality here
    } else {
      toast("Text to speech deactivated", {
        id: "text-to-speech-toast"
      });
    }
  };
  
  // Reset all settings to default
  const resetSettings = () => {
    setFontSize([16]);
    setLineHeight([1.5]);
    setLetterSpacing([0]);
    setHighContrast(false);
    setScreenReader(false);
    setTextToSpeech(false);
    setDyslexicFont(false);
    setReducedMotion(false);
    setFocusHighlight(false);
    setDarkMode(false);
    setMousePointer("default");
    
    document.documentElement.style.fontSize = "16px";
    document.body.style.lineHeight = "1.5";
    document.body.style.letterSpacing = "0px";
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("focus-highlighted");
    document.body.classList.remove("reduced-motion");
    document.documentElement.classList.remove("dark");
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.documentElement.style.fontFamily = "";
    document.body.style.cursor = "";
    
    // Remove dyslexic font if loaded
    const fontLink = document.getElementById('dyslexic-font');
    if (fontLink) {
      document.head.removeChild(fontLink);
    }
    
    toast("Accessibility settings reset to default", {
      id: "reset-toast"
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white shadow-md border-2 border-blue-200 hover:bg-blue-50 relative"
            aria-label="Accessibility options"
          >
            <AccessibilityIcon className="h-5 w-5 text-blue-600" />
            {(highContrast || screenReader || textToSpeech || dyslexicFont || darkMode || reducedMotion || fontSize[0] !== 16) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-blue-100 w-80 max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessibility Options</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close menu">
                ×
              </Button>
            </div>
            
            <Tabs defaultValue="text">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
                <TabsTrigger value="visual" className="text-xs">Visual</TabsTrigger>
                <TabsTrigger value="navigation" className="text-xs">Navigation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-6">
                {/* Font Size Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-sm font-medium flex items-center">
                      <Text className="h-4 w-4 mr-2" />
                      Text Size
                    </Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{fontSize[0]}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 p-0" 
                      onClick={() => setFontSize([Math.max(12, fontSize[0] - 1)])}
                      aria-label="Decrease text size"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      value={fontSize}
                      onValueChange={setFontSize}
                      aria-label="Adjust text size"
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 p-0" 
                      onClick={() => setFontSize([Math.min(24, fontSize[0] + 1)])}
                      aria-label="Increase text size"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Line Height Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="line-height" className="text-sm font-medium flex items-center">
                      <Type className="h-4 w-4 mr-2" />
                      Line Spacing
                    </Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{lineHeight[0]}×</span>
                  </div>
                  <Slider
                    id="line-height"
                    min={1}
                    max={2.5}
                    step={0.1}
                    value={lineHeight}
                    onValueChange={setLineHeight}
                    aria-label="Adjust line spacing"
                  />
                </div>
                
                {/* Letter Spacing Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="letter-spacing" className="text-sm font-medium flex items-center">
                      <Underline className="h-4 w-4 mr-2" />
                      Letter Spacing
                    </Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{letterSpacing[0]}px</span>
                  </div>
                  <Slider
                    id="letter-spacing"
                    min={0}
                    max={5}
                    step={0.5}
                    value={letterSpacing}
                    onValueChange={setLetterSpacing}
                    aria-label="Adjust letter spacing"
                  />
                </div>
                
                {/* Dyslexia Friendly Font */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <Label htmlFor="dyslexic-font" className="text-sm font-medium">
                      Dyslexia Friendly Font
                    </Label>
                  </div>
                  <Switch
                    id="dyslexic-font"
                    checked={dyslexicFont}
                    onCheckedChange={setDyslexicFont}
                    aria-label="Toggle dyslexia friendly font"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="visual" className="space-y-6">
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

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <Label htmlFor="dark-mode" className="text-sm font-medium">
                      Dark Mode
                    </Label>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    aria-label="Toggle dark mode"
                  />
                </div>
                
                {/* Focus Highlighting */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4" />
                    <Label htmlFor="focus-highlight" className="text-sm font-medium">
                      Enhanced Focus Indicators
                    </Label>
                  </div>
                  <Switch
                    id="focus-highlight"
                    checked={focusHighlight}
                    onCheckedChange={setFocusHighlight}
                    aria-label="Toggle enhanced focus indicators"
                  />
                </div>
                
                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PanelRight className="h-4 w-4" />
                    <Label htmlFor="reduced-motion" className="text-sm font-medium">
                      Reduce Animations
                    </Label>
                  </div>
                  <Switch
                    id="reduced-motion"
                    checked={reducedMotion}
                    onCheckedChange={setReducedMotion}
                    aria-label="Toggle reduced motion"
                  />
                </div>
                
                {/* Cursor Size */}
                <div className="space-y-2">
                  <Label htmlFor="mouse-pointer" className="text-sm font-medium">
                    Mouse Pointer
                  </Label>
                  <select 
                    id="mouse-pointer"
                    value={mousePointer}
                    onChange={(e) => setMousePointer(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    aria-label="Select mouse pointer style"
                  >
                    <option value="default">Default</option>
                    <option value="large">Large</option>
                    <option value="contrast">High Contrast</option>
                  </select>
                </div>
              </TabsContent>
              
              <TabsContent value="navigation" className="space-y-6">
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
                
                {/* Text to Speech */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Label htmlFor="text-to-speech" className="text-sm font-medium">
                      Text to Speech
                    </Label>
                  </div>
                  <Switch
                    id="text-to-speech"
                    checked={textToSpeech}
                    onCheckedChange={toggleTextToSpeech}
                    aria-label="Toggle text to speech"
                  />
                </div>
                
                <div className="space-y-2 pt-4">
                  <h4 className="text-sm font-medium">Keyboard Shortcuts</h4>
                  <div className="rounded-md bg-gray-50 dark:bg-gray-900 p-2 text-xs">
                    <div className="grid grid-cols-2 gap-y-1">
                      <span>Skip to content:</span>
                      <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + 1</kbd>
                      
                      <span>Main menu:</span>
                      <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + 2</kbd>
                      
                      <span>Search:</span>
                      <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + 3</kbd>
                      
                      <span>Accessibility menu:</span>
                      <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + A</kbd>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Reset Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-6" 
              onClick={resetSettings}
            >
              Reset All Settings
            </Button>
            
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
              <a href="#accessibility-help" className="underline hover:text-blue-600">Learn more about accessibility features</a>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AccessibilityControls;
