
import { Route } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SinglePageHome } from "@/pages/public/SinglePageHome";
import { Menu } from "@/pages/public/Menu";
import { History } from "@/pages/public/History";
import { Reservation } from "@/pages/public/Reservation";
import { Locations } from "@/pages/public/Locations";

export const PublicRoutes = () => (
  <>
    <Route path="/" element={
      <PublicLayout>
        <SinglePageHome />
      </PublicLayout>
    } />
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
  </>
);
