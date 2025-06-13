
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ContentProvider } from "@/contexts/ContentContext";
import { AuthProvider } from "@/hooks/useAuth";
import { POSApp } from "@/pages/pos/POSApp";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { StoreRoutes } from "@/routes/StoreRoutes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <ContentProvider>
          <AuthProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                {/* POS Route */}
                <Route path="/pos" element={<POSApp />} />

                {/* Public Routes */}
                {PublicRoutes()}

                {/* Admin Routes */}
                {AdminRoutes()}

                {/* Store Routes */}
                {StoreRoutes()}

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ContentProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
