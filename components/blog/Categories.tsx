import { Button } from '@/components/ui/button';

export const BLOG_CATEGORIES = {
  all: 'Todos',
  arquitectura: 'Arquitectura',
  construccion: 'Construcción',
  ingenierias: 'Ingenierías',
  interiores: 'Interiores Corporativos',
  business: 'Business Development',
  scrum: 'Scrum y Metodologías Ágiles'
} as const;

export type CategoryId = keyof typeof BLOG_CATEGORIES;

interface CategoriesProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

const Categories = ({ selectedCategory, onSelectCategory }: CategoriesProps) => {
  return (
    <div className="w-full overflow-x-auto py-4 mb-8">
      <div className="flex space-x-2 min-w-max px-4">
        {Object.entries(BLOG_CATEGORIES).map(([id, name]) => (
          <Button
            key={id}
            variant={selectedCategory === id ? "default" : "outline"}
            onClick={() => onSelectCategory(id as CategoryId)}
            className="whitespace-nowrap"
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Categories;