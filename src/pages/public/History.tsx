
import { Card, CardContent } from '@/components/ui/card';
import { mockHistoryContent } from '@/db/mockdata';

export const History = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Notre Histoire
          </h1>
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
                  <h2 className="text-3xl font-bold text-foreground">
                    {content.title}
                  </h2>
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
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Rejoignez Notre Communauté
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Chaque tasse raconte une histoire. Venez découvrir la vôtre dans l'un de nos cafés.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
