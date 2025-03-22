
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

// Define our custom icons that wrap existing Lucide icons
export const Tool: React.FC<LucideProps> = (props) => <LucideIcons.Wrench {...props} />;
export const Clock: React.FC<LucideProps> = (props) => <LucideIcons.Clock {...props} />;
export const Globe: React.FC<LucideProps> = (props) => <LucideIcons.Globe {...props} />;
export const Upload: React.FC<LucideProps> = (props) => <LucideIcons.Upload {...props} />;
export const Share2: React.FC<LucideProps> = (props) => <LucideIcons.Share2 {...props} />;
export const Switch: React.FC<LucideProps> = (props) => <LucideIcons.ToggleLeft {...props} />;

// Re-export all standard Lucide icons alongside our custom ones
export * from 'lucide-react';
