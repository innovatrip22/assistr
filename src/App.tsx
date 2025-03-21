
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tourist from "./pages/Tourist";
import Business from "./pages/Business";
import Institution from "./pages/Institution";
import NotFound from "./pages/NotFound";
import ProjectSummary from "./pages/ProjectSummary";
import ProjectMethodology from "./pages/ProjectMethodology";
import AuthRequired from "./components/AuthRequired";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project-summary" element={<ProjectSummary />} />
        <Route path="/project-methodology" element={<ProjectMethodology />} />
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
      <Toaster />
    </Router>
  );
}

export default App;
