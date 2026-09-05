"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_API_URL;

interface PayloadImage {
  id: number;
  url: string;
  alt?: string;
}

interface GalleryItem {
  id: string;
  image: PayloadImage;
}

interface Product {
  id: number;
  title: string | null;
  gallery: GalleryItem[];
  _status: string;
  createdAt: string;
}

export default function Carousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarouselProducts() {
      try {
        const response = await fetch(`${PAYLOAD_URL}/api/products?limit=10&sort=-createdAt`);
        if (!response.ok) throw new Error("Błąd pobierania danych do karuzeli");
        
        const data = await response.json();
        
        if (data && data.docs) {
          const validProducts = data.docs.filter(
            (p: Product) => 
              p._status === "published" && 
              p.title !== null && 
              p.gallery && 
              p.gallery.length > 0 && 
              p.gallery[0].image
          );
          
          setProducts(validProducts.slice(0, 6));
        }
      } catch (err) {
        console.error("Karuzela błąd API:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCarouselProducts();
  }, []);

  const nextSlide = () => {
    if (products.length === 0) return;
    const maxIndex = Math.max(0, products.length - 3);
    
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  useEffect(() => {
    if (isPaused || products.length <= 3) return;

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused, products]);

  if (loading) {
    return (
      <div className="carousel-container-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: '#375b3c', fontWeight: 'bold' }}>
        Ładowanie karuzeli...
      </div>
    );
  }

  if (products.length === 0) {
    return null; 
  }

  const totalDots = Math.max(1, products.length - 2);

  return (
    <div 
      className="carousel-container-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentIndex * 33.3333}%)` }}
      >
        {products.map((product) => {
          const imageUrl = `${PAYLOAD_URL}${product.gallery[0].image.url}`;
          const imageAlt = product.gallery[0].image.alt || product.title || "Zdjęcie karuzeli";

          return (
            <div key={product.id} className="carousel-slide-triple">
              <Link href={`/exposition#product-${product.id}`} className="carousel-product-link">
                <div className="product-card-wrapper">
                  <img src={imageUrl} alt={imageAlt} />
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {products.length > 3 && (
        <div className="carousel-dots">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Przejdź do sekcji ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}