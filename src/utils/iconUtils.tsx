
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

// Create a custom Tool icon using Wrench
const ToolIcon: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Wrench {...props} />;
};

// Create custom clock icon
const ClockIcon: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Clock {...props} />;
};

// Create Globe icon
const GlobeIcon: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Globe {...props} />;
};

// Create Upload icon
const UploadIcon: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Upload {...props} />;
};

// Create Share2 icon
const Share2Icon: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Share2 {...props} />;
};

// Create Switch icon using ToggleLeft
const SwitchIcon: React.FC<LucideProps> = (props) => {
  return <LucideIcons.ToggleLeft {...props} />;
};

// Module augmentation for TypeScript
declare module 'lucide-react' {
  export const Tool: React.FC<LucideProps>;
  export const Clock: React.FC<LucideProps>;
  export const Globe: React.FC<LucideProps>;
  export const Upload: React.FC<LucideProps>;
  export const Share2: React.FC<LucideProps>;
  export const Switch: React.FC<LucideProps>;
}

// Patch the lucide-react module to include our custom icons
if (typeof window !== 'undefined') {
  // Make sure lucideReact exists on window
  // @ts-ignore - Adding to global namespace
  window.lucideReact = window.lucideReact || LucideIcons;
  
  // Add our custom icons
  // @ts-ignore - We know what we're doing
  window.lucideReact.Tool = ToolIcon;
  // @ts-ignore - We know what we're doing
  window.lucideReact.Clock = ClockIcon;
  // @ts-ignore - We know what we're doing
  window.lucideReact.Globe = GlobeIcon;
  // @ts-ignore - We know what we're doing
  window.lucideReact.Upload = UploadIcon;
  // @ts-ignore - We know what we're doing
  window.lucideReact.Share2 = Share2Icon;
  // @ts-ignore - We know what we're doing
  window.lucideReact.Switch = SwitchIcon;
}

// Also patch the actual module to ensure it works at import time
// @ts-ignore - We know what we're doing
LucideIcons.Tool = ToolIcon;
// @ts-ignore - We know what we're doing
LucideIcons.Clock = ClockIcon;
// @ts-ignore - We know what we're doing
LucideIcons.Globe = GlobeIcon;
// @ts-ignore - We know what we're doing
LucideIcons.Upload = UploadIcon;
// @ts-ignore - We know what we're doing
LucideIcons.Share2 = Share2Icon;
// @ts-ignore - We know what we're doing
LucideIcons.Switch = SwitchIcon;

// Export our custom icons so they can be imported directly from this file
export const Tool = ToolIcon;
export const Clock = ClockIcon;
export const Globe = GlobeIcon;
export const Upload = UploadIcon;
export const Share2 = Share2Icon;
export const Switch = SwitchIcon;

// Re-export all Lucide icons for convenience
export * from 'lucide-react';
