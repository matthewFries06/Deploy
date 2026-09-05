"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const INFO_SLIDES = [
  {
    id: 1,
    title: "Nasz życiorys",
    img: "/Nasz życiorys2.png",
    link: "/aboutUs"
  },
  {
    id: 2,
    title: "SPRZEDAJ OBIEKT",
    img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600",
    link: "/sell"
  },
  {
    id: 3,
    title: "NOWOŚCI",
    img: "/Nowości2.png",
    link: "/news"
  }
];

export default function CarouselInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INFO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="info-carousel-container">
      <div 
        className="info-carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {INFO_SLIDES.map((slide) => (
          <div 
            key={slide.id} 
            className="info-carousel-slide"
            onClick={() => router.push(slide.link)}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="info-carousel-overlay">
              <h2 className="info-slide-text">{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="info-carousel-dots">
        {INFO_SLIDES.map((_, idx) => (
          <button 
            key={idx} 
            className={`info-dot ${idx === currentIndex ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}