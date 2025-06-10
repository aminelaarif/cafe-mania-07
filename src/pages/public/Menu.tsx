
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useContent } from '@/contexts/ContentContext';

export const Menu = () => {
  const { menu } = useContent();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Notre Menu
          </h1>
          <p className="text-xl text-muted-foreground">
            Découvrez nos cafés artisanaux et nos délicieuses pâtisseries
          </p>
        </div>

        <div className="space-y-12">
          {menu.map((category) => (
            <section key={category.id}>
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {category.name}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items
                  .filter(item => item.available)
                  .map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{item.name}</CardTitle>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {item.price.toFixed(2)} €
                            </p>
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
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
