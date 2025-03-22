
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

// Create a Tool icon using Wrench as a substitute
export const Tool: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Wrench {...props} />;
};

// Create Clock icon alias (it exists in lucide-react but there might be a casing issue)
export const Clock: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Clock {...props} />;
};

// Create Globe icon alias
export const Globe: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Globe {...props} />;
};

// Create Upload icon alias
export const Upload: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Upload {...props} />;
};

// Create Share2 icon alias
export const Share2: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Share2 {...props} />;
};

// Create Switch icon alias
export const Switch: React.FC<LucideProps> = (props) => {
  return <LucideIcons.ToggleLeft {...props} />; // Using ToggleLeft as a substitute for Switch
};

// Re-export all existing Lucide icons
export * from 'lucide-react';
