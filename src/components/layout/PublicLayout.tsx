
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const PublicLayout = ({ children, showFooter = true }: PublicLayoutProps) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    {children}
    {showFooter && <Footer />}
  </div>
);
