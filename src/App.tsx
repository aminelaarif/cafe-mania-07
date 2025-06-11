
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { ContentProvider } from "@/contexts/ContentContext";

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
import { UserManagement } from "@/pages/admin/UserManagement";
import { SalesReport } from "@/pages/admin/SalesReport";
import { StaffManagement } from "@/pages/admin/StaffManagement";
import { InventoryManagement } from "@/pages/admin/InventoryManagement";
import { PresenceManagement } from "@/pages/admin/PresenceManagement";
import { PersonnelHistory } from "@/pages/admin/PersonnelHistory";

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
          <BrowserRouter>
            <AuthProvider>
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
                <Route path="/admin/users" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
                    <AdminLayout>
                      <UserManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/stores" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout>
                      <div className="p-6">
                        <h1 className="text-3xl font-bold">Gestion des Magasins</h1>
                        <p className="text-muted-foreground mt-2">Fonctionnalité en développement</p>
                      </div>
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
                <Route path="/admin/presence" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <PresenceManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/personnel-history" element={
                  <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
                    <AdminLayout>
                      <PersonnelHistory />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/promotions" element={
                  <ProtectedRoute allowedRoles={['marketing-manager']}>
                    <AdminLayout>
                      <div className="p-6">
                        <h1 className="text-3xl font-bold">Gestion des Promotions</h1>
                        <p className="text-muted-foreground mt-2">Fonctionnalité en développement</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </ContentProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
