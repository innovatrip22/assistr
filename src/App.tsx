
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tourist from "./pages/Tourist";
import Business from "./pages/Business";
import Institution from "./pages/Institution";
import NotFound from "./pages/NotFound";
import ProjectSummary from "./pages/ProjectSummary";
import ProjectMethodology from "./pages/ProjectMethodology";
import TargetAudience from "./pages/TargetAudience";
import MethodologySlide from "./pages/MethodologySlide";
import AuthRequired from "./components/AuthRequired";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import AccessibilityControls from "./components/AccessibilityControls";
import SkipToContent from "./components/SkipToContent";
import "./styles/accessibility.css";
import "./App.css";

function App() {
  return (
    <TooltipProvider>
      <Router>
        <SkipToContent />
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project-summary" element={<ProjectSummary />} />
            <Route path="/project-methodology" element={<ProjectMethodology />} />
            <Route path="/target-audience" element={<TargetAudience />} />
            <Route path="/methodology-slide" element={<MethodologySlide />} />
            <Route 
              path="/tourist" 
              element={
                <AuthRequired userType="tourist">
                  <Tourist />
                </AuthRequired>
              } 
            />
            <Route 
              path="/business" 
              element={
                <AuthRequired userType="business">
                  <Business />
                </AuthRequired>
              } 
            />
            <Route 
              path="/institution" 
              element={
                <AuthRequired userType="institution">
                  <Institution />
                </AuthRequired>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <AccessibilityControls />
        <Toaster />
      </Router>
    </TooltipProvider>
  );
}

export default App;
