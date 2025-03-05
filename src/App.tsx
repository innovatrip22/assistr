
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tourist from "./pages/Tourist";
import Institution from "./pages/Institution";
import Business from "./pages/Business";
import AuthRequired from "./components/AuthRequired";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/institution" element={
              <AuthRequired userType="institution">
                <Institution />
              </AuthRequired>
            } />
            <Route path="/business" element={
              <AuthRequired userType="business">
                <Business />
              </AuthRequired>
            } />
            <Route path="/tourist" element={
              <AuthRequired userType="tourist">
                <Tourist />
              </AuthRequired>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
