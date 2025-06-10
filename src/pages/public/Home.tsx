
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockHistoryContent, mockEvents } from '@/db/mockdata';

export const Home = () => {
  const featuredEvents = mockEvents.filter(event => event.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            L'Art du Café
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Découvrez une expérience café unique dans nos cafés artisanaux
          </p>
          <div className="space-x-4">
            <Link to="/menu">
              <Button size="lg" className="text-lg px-8 py-3">
                Voir le Menu
              </Button>
            </Link>
            <Link to="/reservation">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Réserver une Table
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Nos Spécialités
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Espresso Artisanal</h3>
                <p className="text-muted-foreground mb-4">
                  Notre blend signature, torréfié à la perfection
                </p>
                <p className="text-2xl font-bold text-primary">2,50 €</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Cappuccino</h3>
                <p className="text-muted-foreground mb-4">
                  Espresso avec une mousse de lait soyeuse
                </p>
                <p className="text-2xl font-bold text-primary">3,50 €</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Pâtisseries Fraîches</h3>
                <p className="text-muted-foreground mb-4">
                  Croissants et muffins préparés chaque matin
                </p>
                <p className="text-2xl font-bold text-primary">2,20 €</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg">Voir le Menu Complet</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              Événements à Venir
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="w-full h-48 bg-muted"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      <p className="text-sm font-medium text-primary">
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
