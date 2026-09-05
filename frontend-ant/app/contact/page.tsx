function Contact() {
  return (
    <div className="contact-page-container">
      <div className="contact-card-wrapper">
        
        {/* LEWA KOLUMNA: DANE I GODZINY */}
        <div className="contact-details">
          <h1 className="contact-main-title">Kontakt</h1>
          
          <div className="contact-info-block">
            <p className="contact-phone">
              <span className="contact-icon">📞</span> 
              <a href="tel:690121131">690-121-131</a>
            </p>
            <p className="contact-address">
              <span className="contact-icon">📍</span> 
              ul. Stefana Batorego 10, 40-061 Katowice
            </p>
          </div>

          <hr className="contact-divider" />

          <div className="opening-hours-block">
            <h3 className="hours-title">Godziny otwarcia</h3>
            <ul className="hours-list">
              <li><span className="day">Poniedziałek</span> <span className="time">10:00 - 18:00</span></li>
              <li><span className="day">Wtorek</span> <span className="time">10:00 - 18:00</span></li>
              <li><span className="day">Środa</span> <span className="time">10:00 - 18:00</span></li>
              <li><span className="day">Czwartek</span> <span className="time">10:00 - 18:00</span></li>
              <li><span className="day">Piątek</span> <span className="time">10:00 - 18:00</span></li>
              <li><span className="day">Sobota</span> <span className="time">10:00 - 14:00</span></li>
              <li className="closed"><span className="day">Niedziela</span> <span className="time">Zamknięte</span></li>
            </ul>
          </div>
        </div>

        {/* PRAWA KOLUMNA: MAPA */}
        <div className="contact-map-wrapper">
          <iframe 
            className="contact-map-iframe" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d637.7318114671882!2d19.015795673831427!3d50.25594309335553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce4630b66013%3A0xd33763354de5e893!2sAntyki%20Batorego%20A.D.1984!5e0!3m2!1spl!2spl!4v1783888698270!5m2!1spl!2spl"
            loading="lazy" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          />
        </div>

      </div>
    </div>
  )
}

export default Contact;