
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Coffee Shop</h3>
            <p className="text-muted-foreground">
              L'art du café depuis 1985. Découvrez une expérience café unique dans nos établissements artisanaux.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@coffeeshop.fr</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigation</h4>
            <div className="space-y-2">
              <a href="#accueil" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </a>
              <a href="#menu" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Menu
              </a>
              <a href="#histoire" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Notre Histoire
              </a>
              <a href="#reservation" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Réservation
              </a>
              <a href="#magasins" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Nos Magasins
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Services</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">Café sur place</span>
              <span className="block text-sm text-muted-foreground">Vente à emporter</span>
              <span className="block text-sm text-muted-foreground">Livraison</span>
              <span className="block text-sm text-muted-foreground">Événements privés</span>
              <span className="block text-sm text-muted-foreground">Formation barista</span>
            </div>
          </div>

          {/* Horaires */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Horaires généraux</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Lundi - Vendredi:</span>
                <span>7h00 - 19h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi:</span>
                <span>8h00 - 20h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche:</span>
                <span>9h00 - 18h00</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * Les horaires peuvent varier selon les magasins
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Coffee Shop. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">
              Administration
            </Link>
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Mentions légales
            </span>
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Politique de confidentialité
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
