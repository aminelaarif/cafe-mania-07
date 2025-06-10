
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockMenu, mockHistoryContent, mockEvents, mockStores } from '@/db/mockdata';
import { Phone, MapPin, Clock } from 'lucide-react';

export const SinglePageHome = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    store: ''
  });
  const { toast } = useToast();

  const featuredEvents = mockEvents.filter(event => event.featured);
  const regions = ['all', ...new Set(mockStores.map(store => store.region))];
  const filteredStores = selectedRegion === 'all' 
    ? mockStores 
    : mockStores.filter(store => store.region === selectedRegion);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation data:', formData);
    
    toast({
      title: "Réservation confirmée !",
      description: "Nous vous confirmerons votre réservation par email.",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      store: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatOpeningHours = (hours: any) => {
    return Object.entries(hours).map(([day, time]: [string, any]) => (
      <div key={day} className="flex justify-between text-sm">
        <span className="capitalize">{day}:</span>
        <span>{time.open} - {time.close}</span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            L'Art du Café
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Découvrez une expérience café unique dans nos cafés artisanaux
          </p>
          <div className="space-x-4">
            <a href="#menu">
              <Button size="lg" className="text-lg px-8 py-3">
                Voir le Menu
              </Button>
            </a>
            <a href="#reservation">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Réserver une Table
              </Button>
            </a>
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
            <a href="#menu">
              <Button size="lg">Voir le Menu Complet</Button>
            </a>
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

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Notre Menu
            </h2>
            <p className="text-xl text-muted-foreground">
              Découvrez nos cafés artisanaux et nos délicieuses pâtisseries
            </p>
          </div>

          <div className="space-y-12">
            {mockMenu.map((category) => (
              <div key={category.id}>
                <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                  {category.name}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{item.name}</CardTitle>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {item.price.toFixed(2)} €
                            </p>
                            {!item.available && (
                              <Badge variant="destructive" className="mt-1">
                                Indisponible
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section id="histoire" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Notre Histoire
            </h2>
            <p className="text-xl text-muted-foreground">
              Une passion pour le café qui traverse les générations
            </p>
          </div>

          <div className="space-y-16">
            {mockHistoryContent
              .sort((a, b) => a.order - b.order)
              .map((content, index) => (
                <div 
                  key={content.id} 
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-12`}
                >
                  <div className="lg:w-1/2">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="w-full h-96 bg-muted"></div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="lg:w-1/2 space-y-6">
                    <h3 className="text-3xl font-bold text-foreground">
                      {content.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-20 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Rejoignez Notre Communauté
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Chaque tasse raconte une histoire. Venez découvrir la vôtre dans l'un de nos cafés.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Réservation
            </h2>
            <p className="text-xl text-muted-foreground">
              Réservez votre table pour une expérience café inoubliable
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Détails de la réservation</CardTitle>
              <CardDescription>
                Réservez pour 1 à 12 personnes dans l'un de nos cafés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="store">Choisir un café *</Label>
                  <Select onValueChange={(value) => handleInputChange('store', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un café" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStores.map((store) => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.name} - {store.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Heure *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Nombre de personnes *</Label>
                    <Select onValueChange={(value) => handleInputChange('guests', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Personnes" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'personne' : 'personnes'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Confirmer la Réservation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Magasins Section */}
      <section id="magasins" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nos Magasins
            </h2>
            <p className="text-xl text-muted-foreground">
              Trouvez le café le plus proche de chez vous
            </p>
          </div>

          <div className="mb-8 max-w-md mx-auto">
            <Select onValueChange={setSelectedRegion} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {regions.slice(1).map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {store.name}
                    <Badge variant="secondary">{store.region}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-full h-48 bg-muted rounded-lg"></div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="text-sm">
                        <p>{store.address}</p>
                        <p>{store.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{store.phone}</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="text-sm space-y-1 w-full">
                        <p className="font-medium mb-2">Horaires d'ouverture:</p>
                        {formatOpeningHours(store.openingHours)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Aucun magasin trouvé dans cette région.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
