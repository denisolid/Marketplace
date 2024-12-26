import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function Categories() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections of premium Ukrainian fashion for
            every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[16/9]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 mb-4">{category.description}</p>
                  <div className="flex items-center text-white group-hover:underline">
                    <span>View Collection</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
