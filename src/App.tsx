
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tourist from "./pages/Tourist";
import Business from "./pages/Business";
import Institution from "./pages/Institution";
import NotFound from "./pages/NotFound";
import ProjectSummary from "./pages/ProjectSummary";
import AuthRequired from "./components/AuthRequired";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project-summary" element={<ProjectSummary />} />
        <Route 
          path="/tourist" 
          element={
            <AuthRequired>
              <Tourist />
            </AuthRequired>
          } 
        />
        <Route 
          path="/business" 
          element={
            <AuthRequired>
              <Business />
            </AuthRequired>
          } 
        />
        <Route 
          path="/institution" 
          element={
            <AuthRequired>
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
