"use client";

import { useState, useEffect } from "react";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_API_URL;

interface PayloadImage {
  id: number;
  url: string;
  alt?: string;
  filename: string;
}

interface GalleryItem {
  id: string;
  image: PayloadImage;
}

interface ProductCategory {
  id: string | number;
  title: string; 
  slug?: string;
}

interface Product {
  id: number;
  title: string | null;
  description: string | null;
  gallery: GalleryItem[];
  inventory: number;
  priceInUSD: number | null;
  categories: ProductCategory[]; 
  _status: string;
}

export default function ExpositionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // Stan odpowiedzialny za otwarty produkt w modalu
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${PAYLOAD_URL}/api/products?limit=1000`),
          fetch(`${PAYLOAD_URL}/api/categories?limit=100`)
        ]);
        
        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Nie można pobrać danych z Payload CMS. Sprawdź, czy serwer na porcie 3001 działa.");
        }
        
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        if (categoriesData && categoriesData.docs) {
          setCategories(categoriesData.docs);
        }

        if (productsData && productsData.docs) {
          const publishedProducts = productsData.docs.filter(
            (p: Product) => p._status === "published" && p.title !== null
          );
          setProducts(publishedProducts);
        }
      } catch (err: any) {
        console.error("Błąd API:", err);
        setError(err.message || "Wystąpił problem z ładowaniem danych.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Blokowanie przewijania strony, gdy modal jest otwarty
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProduct]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const titleSafe = product.title ? product.title.toLowerCase() : "";
    const matchesSearch = titleSafe.includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "" ||
      product.categories.some((cat) => {
        const catId = typeof cat === "object" ? String(cat.id) : String(cat);
        return catId === selectedCategory;
      });

    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) return <div className="container"><p>Ładowanie asortymentu...</p></div>;
  if (error) return <div className="container"><p style={{ color: "red" }}>Błąd: {error}</p></div>;

  return (
    <div className="container">
      <h1 className="title">Nasze produkty</h1>

      {/* Kontrolki wyszukiwania */}
      <div className="controls">
        <input
          type="text"
          placeholder="Szukaj po tytule..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="selectInput"
        >
          <option value="">Wszystkie kategorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title || "Bez nazwy"}
            </option>
          ))}
        </select>
      </div>

      {/* Siatka produktów */}
      <div className="productsGrid">
        {currentItems.length > 0 ? (
          currentItems.map((product) => {
            let imageUrl = "";
            let imageAlt = "Zdjęcie produktu";
            
            if (product.gallery && product.gallery.length > 0 && product.gallery[0].image) {
              imageUrl = `${PAYLOAD_URL}${product.gallery[0].image.url}`;
              if (product.gallery[0].image.alt) {
                imageAlt = product.gallery[0].image.alt;
              }
            }

            return (
              <div 
                key={product.id} 
                className="productCard"
                onClick={() => setSelectedProduct(product)} // Kliknięcie otwiera modal
              >
                {imageUrl && (
                  <div style={{ width: "100%", height: "200px", overflow: "hidden", marginBottom: "15px", position: "relative" }}>
                    <img 
                      src={imageUrl} 
                      alt={imageAlt} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} 
                    />
                  </div>
                )}
                
                <h3 className="productName">{product.title}</h3>
                
                {product.categories && product.categories.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    {product.categories.map((cat: any) => (
                      <span key={cat.id} className="productCategory" style={{ marginRight: "5px" }}>
                        {cat.title || "Kategoria"}
                      </span>
                    ))}
                  </div>
                )}

                <p className="productPrice">
                  {product.priceInUSD !== null ? `${product.priceInUSD.toFixed(2)} USD` : "Zapytaj o cenę"}
                </p>
              </div>
            );
          })
        ) : (
          <p>Nie znaleziono żadnych opublikowanych produktów spełniających kryteria.</p>
        )}
      </div>

      {/* Paginacja */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pageButton"
          >
            Poprzednia
          </button>
          
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`pageButton ${currentPage === index + 1 ? "pageButtonActive" : ""}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pageButton"
          >
            Następna
          </button>
        </div>
      )}

      {/* --- MODAL DETALI PRODUKTU (WIDOK PEŁNOEKRANOWY) --- */}
      {selectedProduct && (
        <div className="modalOverlay" onClick={() => setSelectedProduct(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseButton" onClick={() => setSelectedProduct(null)}>
              &times;
            </button>
            
            <div className="modalBody">
              {/* Sekcja zdjęć (Lewa strona / Góra na mobile) */}
              <div className="modalGallerySection">
                {selectedProduct.gallery && selectedProduct.gallery.length > 0 ? (
                  <div className="modalMainImageWrapper">
                    <img 
                      src={`${PAYLOAD_URL}${selectedProduct.gallery[0].image.url}`} 
                      alt={selectedProduct.gallery[0].image.alt || "Zdjęcie produktu"} 
                      className="modalMainImage"
                    />
                  </div>
                ) : (
                  <div className="modalNoImage">Brak zdjęcia</div>
                )}
                
                {/* Miniaturki jeśli jest więcej zdjęć */}
                {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                  <div className="modalThumbnails">
                    {selectedProduct.gallery.map((item) => (
                      <img 
                        key={item.id}
                        src={`${PAYLOAD_URL}${item.image.url}`}
                        alt={item.image.alt || "Miniaturka"}
                        className="modalThumbnail"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Sekcja informacji (Prawa strona / Dół na mobile) */}
              <div className="modalInfoSection">
                <h2 className="modalTitle">{selectedProduct.title}</h2>
                
                <p className="modalPrice">
                  {selectedProduct.priceInUSD !== null ? `${selectedProduct.priceInUSD.toFixed(2)} USD` : "Zapytaj o cenę"}
                </p>

                {selectedProduct.categories && selectedProduct.categories.length > 0 && (
                  <div className="modalCategories">
                    {selectedProduct.categories.map((cat: any) => (
                      <span key={cat.id} className="productCategory">
                        {cat.title || "Kategoria"}
                      </span>
                    ))}
                  </div>
                )}

                <hr className="modalDivider" />

                <div className="modalDescription">
                  <h4>Opis produktu:</h4>
                  <p>{selectedProduct.description || "Brak opisu dla tego produktu."}</p>
                </div>

                <div className="modalInventory">
                  <span>Dostępność: <strong>{selectedProduct.inventory} szt.</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}