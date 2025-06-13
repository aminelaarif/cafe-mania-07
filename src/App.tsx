
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ContentProvider } from "@/contexts/ContentContext";
import { AuthProvider } from "@/hooks/useAuth";

// Public Pages
import { SinglePageHome } from "@/pages/public/SinglePageHome";
import { Menu } from "@/pages/public/Menu";
import { History } from "@/pages/public/History";
import { Reservation } from "@/pages/public/Reservation";
import { Locations } from "@/pages/public/Locations";

// Admin Pages
import { Dashboard } from "@/pages/admin/Dashboard";
import { GlobalConfig } from "@/pages/admin/GlobalConfig";
import { ContentManagement } from "@/pages/admin/ContentManagement";
import { SalesReport } from "@/pages/admin/SalesReport";
import { StaffManagement } from "@/pages/admin/StaffManagement";
import { InventoryManagement } from "@/pages/admin/InventoryManagement";
import { PersonnelManagement } from "@/pages/admin/PersonnelManagement";
import { POSManagement } from "@/pages/admin/POSManagement";
import { FinancialAnalysis } from "@/pages/admin/FinancialAnalysis";
import { FinancialManagement } from "@/pages/admin/FinancialManagement";
import { LoyaltyManagement } from "@/pages/admin/LoyaltyManagement";
import { Finances } from "@/pages/admin/Finances";
import { Stores } from "@/pages/admin/Stores";
import { StoreStock } from "@/pages/admin/StoreStock";

// POS Pages
import { POSApp } from "@/pages/pos/POSApp";

// Layout Components
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Admin Layout Component
const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex bg-background">
    <AdminSidebar />
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  </div>
);

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

                {/* Main Single Page Route */}
                <Route path="/" element={
                  <PublicLayout>
                    <SinglePageHome />
                  </PublicLayout>
                } />

                {/* Legacy Public Routes (for compatibility) */}
                <Route path="/menu" element={
                  <PublicLayout>
                    <Menu />
                  </PublicLayout>
                } />
                <Route path="/histoire" element={
                  <PublicLayout>
                    <History />
                  </PublicLayout>
                } />
                <Route path="/reservation" element={
                  <PublicLayout>
                    <Reservation />
                  </PublicLayout>
                } />
                <Route path="/magasins" element={
                  <PublicLayout>
                    <Locations />
                  </PublicLayout>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/config" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
                    <AdminLayout>
                      <GlobalConfig />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/content" element={
                  <ProtectedRoute allowedRoles={['marketing-manager']}>
                    <AdminLayout>
                      <ContentManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />

                {/* Finances Routes */}
                <Route path="/admin/finances" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <Finances />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/financial-analysis" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <FinancialAnalysis />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/financial-management" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <FinancialManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />

                {/* Stores Routes */}
                <Route path="/admin/stores" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
                    <AdminLayout>
                      <Stores />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/stores/:storeId/pos" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']}>
                    <AdminLayout>
                      <POSManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/stores/:storeId/personnel" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <PersonnelManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/stores/:storeId/loyalty" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'marketing-manager']}>
                    <AdminLayout>
                      <LoyaltyManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/stores/:storeId/stock" element={
                  <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <StoreStock />
                    </AdminLayout>
                  </ProtectedRoute>
                } />

                {/* Legacy routes for backwards compatibility */}
                <Route path="/admin/pos" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']}>
                    <AdminLayout>
                      <POSManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/sales" element={
                  <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <SalesReport />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/staff" element={
                  <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <StaffManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/inventory" element={
                  <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <InventoryManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/personnel" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <PersonnelManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/loyalty" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'marketing-manager']}>
                    <AdminLayout>
                      <LoyaltyManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />

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
