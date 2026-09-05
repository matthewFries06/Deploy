function AboutUs() {
  return (
    <div className="about-page-container">
      {/* NAGŁÓWEK STRONY */}
      <header className="about-header">
        <h1 className="about-main-title">Nasze DNA</h1>
        <p className="about-subtitle">Antyki Batorego – z pasji do piękna i historii od 1984 roku</p>
      </header>

      {/* SEKCJA 1: Tekst po lewej, zdjęcie po prawej */}
      <section className="about-section">
        <div className="about-text-col">
          <h2>O nas</h2>
          <p>
            Antykwariat działa nieprzerwanie od 1984 roku w Katowicach, przy ul. Batorego 10.
          </p>
          <p>
            Obecnie właścicielem antykwariatu jest Tomasz Kania, historyk sztuki i syn jego założycieli.
          </p>
        </div>
        <div className="about-img-col">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" 
            alt="Wnętrze naszego salonu antyków" 
            className="about-image"
          />
        </div>
      </section>

      {/* SEKCJA 2: Zdjęcie po lewej, tekst po prawej (naprzemiennie) */}
      <section className="about-section reverse">
        <div className="about-text-col">
          <h2>Czym się zajmujemy?</h2>
          <p>
            Zajmujemy się skupem i sprzedażą dzieł sztuki dawnej, antyków oraz sztuki użytkowej okresu PRL. W tym zakresie służymy również fachowym doradztwem.
          </p>
        </div>
        <div className="about-img-col">
          <img 
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800" 
            alt="Klasyczne dzieła sztuki i ramy" 
            className="about-image"
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text-col">
          <h2>Informacje</h2>
          <p>
            Zapraszamy do zapoznania się z naszą ofertą dostępną na stronie internetowej, a także do odwiedzenia antykwariatu.
          </p>
          <p>
            W przypadku pytań zachęcamy do kontaktu telefonicznego lub mailowego.
          </p>
        </div>
        <div className="about-img-col">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" 
            alt="Wnętrze naszego salonu antyków" 
            className="about-image"
          />
        </div>
      </section>
    </div>
  )
}

export default AboutUs;