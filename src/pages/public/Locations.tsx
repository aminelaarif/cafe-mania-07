
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockStores } from '@/db/mockdata';
import { Phone, MapPin, Clock } from 'lucide-react';

export const Locations = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  const regions = ['all', ...new Set(mockStores.map(store => store.region))];
  const filteredStores = selectedRegion === 'all' 
    ? mockStores 
    : mockStores.filter(store => store.region === selectedRegion);

  const formatOpeningHours = (hours: any) => {
    return Object.entries(hours).map(([day, time]: [string, any]) => (
      <div key={day} className="flex justify-between text-sm">
        <span className="capitalize">{day}:</span>
        <span>{time.open} - {time.close}</span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos Magasins
          </h1>
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
    </div>
  );
};
