
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

// Patch global namespace to include our custom icons
// This will make them available when importing from 'lucide-react'
if (typeof window !== 'undefined') {
  // @ts-ignore - We know we're adding to the module
  window.lucideReact = window.lucideReact || LucideIcons;
  
  // @ts-ignore - Add our custom icons
  window.lucideReact.Tool = ToolIcon;
  // @ts-ignore - Add our custom icons
  window.lucideReact.Clock = ClockIcon;
  // @ts-ignore - Add our custom icons
  window.lucideReact.Globe = GlobeIcon;
  // @ts-ignore - Add our custom icons
  window.lucideReact.Upload = UploadIcon;
  // @ts-ignore - Add our custom icons
  window.lucideReact.Share2 = Share2Icon;
  // @ts-ignore - Add our custom icons
  window.lucideReact.Switch = SwitchIcon;
}

// We need to export the icons so they can be imported directly from this file
export const Tool = ToolIcon;
export const Clock = ClockIcon;
export const Globe = GlobeIcon;
export const Upload = UploadIcon;
export const Share2 = Share2Icon;
export const Switch = SwitchIcon;

// Re-export all Lucide icons for convenience
export * from 'lucide-react';
