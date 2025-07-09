import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import ContesPage from "./features/conte/presentation/pages/ContesPage";
import ConteDetailPage from "./features/conte/presentation/pages/ConteDetailPage";
import Devinettes from "./pages/Devinettes";
import NotFound from "./pages/NotFound";
import { configureDependencies } from "./core/di/injection-container";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Configuration des dépendances au démarrage de l'application
    configureDependencies();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contes" element={<ContesPage />} />
            <Route path="/contes/:id" element={<ConteDetailPage />} />
            <Route path="/devinettes" element={<Devinettes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
