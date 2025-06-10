
import { MenuBook } from '@/components/public/MenuBook';

export const Menu = () => {
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

        <MenuBook />
      </div>
    </div>
  );
};
