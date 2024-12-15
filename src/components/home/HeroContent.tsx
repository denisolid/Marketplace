import { Button } from '../ui/Button';

export function HeroContent() {
  return (
    <div className="max-w-2xl text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Discover Ukrainian Fashion
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Exclusive collection from top Ukrainian designers
      </p>
      <Button 
        variant="primary" 
        size="lg" 
        className="bg-white text-black hover:bg-neutral-100"
      >
        View Collection
      </Button>
    </div>
  );
}