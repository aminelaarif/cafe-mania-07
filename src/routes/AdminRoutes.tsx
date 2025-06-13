
import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Dashboard } from "@/pages/admin/Dashboard";
import { Analytics } from "@/pages/admin/Analytics";
import { UserManagement } from "@/pages/admin/UserManagement";
import { ReportsCenter } from "@/pages/admin/ReportsCenter";
import { Marketing } from "@/pages/admin/Marketing";
import { MobileConfig } from "@/pages/admin/MobileConfig";
import { SystemMaintenance } from "@/pages/admin/SystemMaintenance";
import { AdvancedCustomization } from "@/pages/admin/AdvancedCustomization";
import { GlobalConfig } from "@/pages/admin/GlobalConfig";
import { ContentManagement } from "@/pages/admin/ContentManagement";
import { FinancesOverview } from "@/pages/admin/FinancesOverview";
import { FinancesAnalysis } from "@/pages/admin/FinancesAnalysis";
import { Stores } from "@/pages/admin/Stores";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

const AdminLayoutWrapper = ({ children }: AdminLayoutWrapperProps) => {
  const AdminSidebar = require("@/components/layout/AdminSidebar").AdminSidebar;
  
  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export const AdminRoutes = () => (
  <>
    <Route path="/admin" element={
      <ProtectedRoute>
        <AdminLayoutWrapper>
          <Dashboard />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/dashboard" element={
      <ProtectedRoute>
        <AdminLayoutWrapper>
          <Dashboard />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/analytics" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'marketing-manager']}>
        <AdminLayoutWrapper>
          <Analytics />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/users" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <UserManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/reports" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager']}>
        <AdminLayoutWrapper>
          <ReportsCenter />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/marketing" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'marketing-manager']}>
        <AdminLayoutWrapper>
          <Marketing />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/mobile-config" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <MobileConfig />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/maintenance" element={
      <ProtectedRoute allowedRoles={['admin', 'technical-manager']}>
        <AdminLayoutWrapper>
          <SystemMaintenance />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/customization" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <AdvancedCustomization />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/config" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <GlobalConfig />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/content" element={
      <ProtectedRoute allowedRoles={['marketing-manager']}>
        <AdminLayoutWrapper>
          <ContentManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/finances-overview" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <FinancesOverview />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/finances-analysis" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <FinancesAnalysis />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager']}>
        <AdminLayoutWrapper>
          <Stores />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
  </>
);
