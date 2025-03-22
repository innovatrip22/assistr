
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

// Instead of module augmentation, we'll ensure our custom icons are available
// by modifying the runtime module and correctly exporting everything

// First, patch the LucideIcons object directly
// @ts-ignore - We're adding custom icons
LucideIcons.Tool = ToolIcon;
// @ts-ignore - We're adding custom icons
LucideIcons.Switch = SwitchIcon;

// Export our custom icons
export const Tool = ToolIcon;
export const Clock = ClockIcon;
export const Globe = GlobeIcon;
export const Upload = UploadIcon;
export const Share2 = Share2Icon;
export const Switch = SwitchIcon;

// Export a patched version of all icons
export * from 'lucide-react';
