import Carousel from "./components/Carousel"
import Link from "next/link"
import CarouselInfo from "./components/CarouselInfo";

export default function Home() {
  return (
    <div className="home-page-container">
      <CarouselInfo/>
      {/* SEKCJA 1: Karuzela i Polecane Produkty */}
      <section className="featured-section">
        <h1 className="home-section-title">Nowości</h1>
        <p className="home-section-subtitle">Odkryj wyjątkowe dzieła sztuki i unikalne rzemiosło w naszej kolekcji</p>
        <div className="carousel-wrapper">
          <Carousel />
        </div>
      </section>

      {/* SEKCJA 2: Usługi (Czym się zajmujemy) */}
      <section className="services-section">
        <h1 className="home-section-title">Czym się zajmujemy?</h1>
        <p className="home-section-subtitle">Świadczymy kompleksowe usługi w zakresie obrotu dziełami sztuki i antykami</p>
        
        <div className="services-grid">
          
          {/* KARTA 1: SPRZEDAŻ */}
          <div className="service-card">
            <div className="service-icon">🏺</div>
            <h2 className="service-title">Sprzedaż przedmiotów</h2>
            <p className="service-description">
              Oferujemy starannie wyselekcjonowane meble klasyczne, obrazy mistrzów malarstwa, zabytkową porcelanę oraz unikalne rzemiosło artystyczne. Każdy przedmiot w naszej galerii posiada gwarantowaną autentyczność.
            </p>
            <Link href="/exposition" className="service-btn">
              Zobacz ofertę →
            </Link>
          </div>

          {/* KARTA 2: SKUP */}
          <div className="service-card">
            <div className="service-icon">⚖️</div>
            <h2 className="service-title">Skup i Wycena</h2>
            <p className="service-description">
              Prowadzimy rzetelny skup antyków oraz bezpłatną, wstępną wycenę dzieł sztuki na podstawie zdjęć lub podczas wizyty w naszym salonie w Katowicach. Gwarantujemy poufność, profesjonalizm oraz natychmiastową płatność.
            </p>
            <Link href="/contact" className="service-btn secondary">
              Skontaktuj się →
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}