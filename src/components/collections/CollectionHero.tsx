interface CollectionHeroProps {
  title: string;
  description: string;
  image: string;
}

export function CollectionHero({ title, description, image }: CollectionHeroProps) {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}