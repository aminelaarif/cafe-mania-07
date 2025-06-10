
import { Card, CardContent } from '@/components/ui/card';
import { useContent } from '@/contexts/ContentContext';

export const History = () => {
  const { historyContent, images } = useContent();

  const visibleHistoryContent = historyContent.filter(content => !content.hidden);

  const getVisibleImagesForSection = (sectionId: string) => {
    return images
      .filter(img => img.sectionId === sectionId && !img.hidden)
      .sort((a, b) => a.order - b.order);
  };

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
          {visibleHistoryContent
            .sort((a, b) => a.order - b.order)
            .map((content, index) => {
              const sectionImages = getVisibleImagesForSection(content.id);
              
              return (
                <div 
                  key={content.id} 
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-12`}
                >
                  <div className="lg:w-1/2">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        {sectionImages.length > 0 ? (
                          <div className="w-full h-96 bg-muted overflow-hidden">
                            <img 
                              src={sectionImages[0].url} 
                              alt={sectionImages[0].alt}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const sibling = target.nextElementSibling as HTMLElement;
                                if (sibling) {
                                  sibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="hidden w-full h-96 bg-muted items-center justify-center">
                              <span className="text-muted-foreground">Image non disponible</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-96 bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Image à venir</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    {sectionImages.length > 1 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {sectionImages.slice(1, 4).map((image) => (
                          <div key={image.id} className="aspect-square bg-muted rounded overflow-hidden">
                            <img 
                              src={image.url} 
                              alt={image.alt}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const sibling = target.nextElementSibling as HTMLElement;
                                if (sibling) {
                                  sibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="hidden w-full h-full bg-muted items-center justify-center text-xs">
                              Erreur
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
              );
            })}
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
