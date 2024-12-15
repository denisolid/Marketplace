interface Brand {
  id: string;
  name: string;
  image: string;
  description: string;
}

const FEATURED_BRANDS: Brand[] = [
  {
    id: '1',
    name: 'FROLOV',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80',
    description: 'Сучасний український бренд високої моди'
  },
  {
    id: '2',
    name: 'BEVZA',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    description: 'Мінімалістичний дизайн з українським характером'
  },
  {
    id: '3',
    name: 'LAKE Studio',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80',
    description: 'Елегантність у кожній деталі'
  }
];

export function FeaturedBrands() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Українські бренди</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_BRANDS.map((brand) => (
            <div key={brand.id} className="group relative overflow-hidden rounded-lg">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
                <p className="text-neutral-200">{brand.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}