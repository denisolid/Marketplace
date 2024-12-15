interface Subcategory {
  id: string;
  name: string;
}

interface SubcategoryNavProps {
  subcategories: Subcategory[];
  activeSubcategory: string | null;
  onSelect: (subcategoryId: string) => void;
}

export function SubcategoryNav({ subcategories, activeSubcategory, onSelect }: SubcategoryNavProps) {
  return (
    <div className="border-b">
      <div className="container py-4">
        <div className="flex space-x-8">
          {subcategories.map((subcat) => (
            <button
              key={subcat.id}
              onClick={() => onSelect(subcat.id)}
              className={`text-sm font-medium transition-colors ${
                activeSubcategory === subcat.id
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {subcat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}