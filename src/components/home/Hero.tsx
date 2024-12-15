import { ViewCollectionButton } from './ViewCollectionButton';

export function Hero() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80"
          alt="Ukrainian Fashion"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Ukrainian Fashion
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Exclusive collection from top Ukrainian designers
          </p>
          <ViewCollectionButton 
            categoryId="women"
            className="bg-white text-black hover:bg-neutral-100"
          />
        </div>
      </div>
    </section>
  );
}