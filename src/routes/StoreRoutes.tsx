
import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { POSManagement } from "@/pages/admin/POSManagement";
import { PersonnelManagement } from "@/pages/admin/PersonnelManagement";
import { LoyaltyManagement } from "@/pages/admin/LoyaltyManagement";
import { StoreStock } from "@/pages/admin/StoreStock";
import { Finances } from "@/pages/admin/Finances";
import { FinancialAnalysis } from "@/pages/admin/FinancialAnalysis";
import { FinancialManagement } from "@/pages/admin/FinancialManagement";
import { SalesReport } from "@/pages/admin/SalesReport";
import { StaffManagement } from "@/pages/admin/StaffManagement";
import { InventoryManagement } from "@/pages/admin/InventoryManagement";
import { storesConfig } from "@/config/storesConfig";

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

export const StoreRoutes = () => (
  <>
    {/* Store-specific routes */}
    {storesConfig.map(store => (
      <Route key={`${store.id}-routes`} path={`/admin/stores/${store.id}/*`} element={
        <>
          <Route path="pos" element={
            <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']}>
              <AdminLayoutWrapper>
                <POSManagement />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="personnel" element={
            <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
              <AdminLayoutWrapper>
                <PersonnelManagement />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="loyalty" element={
            <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'marketing-manager']}>
              <AdminLayoutWrapper>
                <LoyaltyManagement />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="stock" element={
            <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
              <AdminLayoutWrapper>
                <StoreStock />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="finances" element={
            <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
              <AdminLayoutWrapper>
                <Finances />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="financial-analysis" element={
            <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
              <AdminLayoutWrapper>
                <FinancialAnalysis />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="financial-management" element={
            <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
              <AdminLayoutWrapper>
                <FinancialManagement />
              </AdminLayoutWrapper>
            </ProtectedRoute>
          } />
        </>
      } />
    ))}

    {/* Direct store routes */}
    <Route path="/admin/stores/:storeId/pos" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']}>
        <AdminLayoutWrapper>
          <POSManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores/:storeId/personnel" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <PersonnelManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores/:storeId/loyalty" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'marketing-manager']}>
        <AdminLayoutWrapper>
          <LoyaltyManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores/:storeId/stock" element={
      <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <StoreStock />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores/:storeId/finances" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <Finances />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores/:storeId/financial-analysis" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <FinancialAnalysis />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/stores/:storeId/financial-management" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <FinancialManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />

    {/* Legacy routes for backwards compatibility */}
    <Route path="/admin/pos" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']}>
        <AdminLayoutWrapper>
          <POSManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/sales" element={
      <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <SalesReport />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/staff" element={
      <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <StaffManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/inventory" element={
      <ProtectedRoute allowedRoles={['store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <InventoryManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/personnel" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <PersonnelManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/loyalty" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'marketing-manager']}>
        <AdminLayoutWrapper>
          <LoyaltyManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/finances" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <Finances />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/financial-analysis" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <FinancialAnalysis />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/admin/financial-management" element={
      <ProtectedRoute allowedRoles={['admin', 'brand-manager', 'store-manager', 'technical-manager']}>
        <AdminLayoutWrapper>
          <FinancialManagement />
        </AdminLayoutWrapper>
      </ProtectedRoute>
    } />
  </>
);
