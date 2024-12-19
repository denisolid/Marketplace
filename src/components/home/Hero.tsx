import { ViewCollectionButton } from "./ViewCollectionButton";
import "../../styles/components/Hero.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // Сброс к центру
  };

  useEffect(() => {
    const heroSection = document.querySelector(".hero-section") as HTMLElement;
    if (heroSection) {
      heroSection.addEventListener(
        "mousemove",
        handleMouseMove as EventListener
      );
      heroSection.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (heroSection) {
        heroSection.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener
        );
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Нормализуем координаты (от -0.5 до 0.5)
  const x = mousePosition.x / window.innerWidth - 0.5;
  const y = mousePosition.y / window.innerHeight - 0.5;

  // Ограничиваем максимальное смещение (в пикселях)
  const maxTranslate = 30; // Максимальное движение в любую сторону
  const translateX = Math.min(
    Math.max(x * maxTranslate, -maxTranslate),
    maxTranslate
  );
  const translateY = Math.min(
    Math.max(y * maxTranslate, -maxTranslate),
    maxTranslate
  );

  return (
    <section className="hero-section relative h-[70vh] overflow-hidden">
      <div className="hero-background absolute inset-0 -z-10">
        <motion.img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80"
          alt="Background blur"
          className="hero-image-blur"
        />
      </div>

      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80"
          alt="Ukrainian Fashion"
          className="hero-image"
          style={{
            transform: `
              translateX(${translateX}px)
              translateY(${translateY}px)
            `,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
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
