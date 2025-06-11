
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';

export const MenuBook = () => {
  const { menu } = useContent();
  const { formatPrice, getGlobalConfig } = useGlobalConfig();
  const [activeCategory, setActiveCategory] = useState(menu[0]?.id || '');
  const [configVersion, setConfigVersion] = useState(0);

  // Écouter les changements de configuration globale
  useEffect(() => {
    const handleGlobalConfigUpdate = () => {
      console.log('Configuration globale mise à jour - rechargement du menu');
      setConfigVersion(prev => prev + 1);
    };

    window.addEventListener('global-config-updated', handleGlobalConfigUpdate);
    return () => {
      window.removeEventListener('global-config-updated', handleGlobalConfigUpdate);
    };
  }, []);

  const activeItems = menu.find(cat => cat.id === activeCategory)?.items.filter(item => item.available) || [];
  const activeCategoryName = menu.find(cat => cat.id === activeCategory)?.name || '';

  return (
    <div className="max-w-6xl mx-auto" key={configVersion}>
      {/* Onglets du livre */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {menu.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 text-lg font-medium transition-all duration-300 ${
              activeCategory === category.id 
                ? 'bg-primary text-primary-foreground shadow-lg transform scale-105' 
                : 'hover:bg-muted hover:scale-105 text-foreground'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Contenu du livre */}
      <Card className="bg-card shadow-2xl border-2 border-border">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-3xl font-bold text-center text-foreground">
            {activeCategoryName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {activeItems.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-start p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(item.price)}
                  </p>
                  {!item.available && (
                    <Badge variant="destructive" className="mt-1">
                      Indisponible
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {activeItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Aucun article disponible dans cette catégorie
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
