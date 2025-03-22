
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

// Create a Tool icon using Wrench as a substitute
export const Tool: React.FC<LucideProps> = (props) => {
  return <LucideIcons.Wrench {...props} />;
};

// Re-export all existing Lucide icons
export * from 'lucide-react';
