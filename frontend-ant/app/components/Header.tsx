"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Zamyka menu mobilne automatycznie przy zmianie ścieżki (kliknięcie w link)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/exposition?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header-container">
      {/* GÓRNY RZĄD: Dane (lewo) | Logo (środek) | Wyszukiwarka (prawo) */}
      <div className="header-top-row">
        {/* LEWO: Dane kontaktowe (Desktop) */}
        <div className="text-box">
          ANTYKI BATOREGO A.D.1984 TOMASZ KANIA<br />
          KATOWICE, UL. BATOREGO 10<br />
          📞 690-121-131, (32) 2517-878<br />
          ✉️ ANTYKIBATOREGO@GMAIL.COM
        </div>

        {/* ŚRODEK: LOGO */}
        <div className="logo-wrapper">
          <Link href="/">
            <img src="/Logo.png" className="logo" alt="Logo Antyki Batorego" />
          </Link>
        </div>

        {/* PRAWO: Wyszukiwarka (Desktop) */}
        <div className="search-wrapper">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Szukaj w antykwariacie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
            />
            <button type="submit" className="header-search-btn">
              SZUKAJ
            </button>
          </form>
        </div>

        {/* PRZYCISK BURGER (Mobilny) */}
        <button
          type="button"
          className={`hamburger-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Otwórz menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* OVERLAY DLA MOBILE */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* NAVBAR / MOBILE DRAWER */}
      <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
        {/* Wyszukiwarka mobilna wewnątrz drawer-a */}
        <div className="mobile-search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Szukaj w antykwariacie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
            />
            <button type="submit" className="header-search-btn">
              SZUKAJ
            </button>
          </form>
        </div>

        {/* LINKI */}
        <Link href="/aboutUs" className="link">
          O NAS
        </Link>
        <Link href="/exposition" className="link">
          OFERTA
        </Link>
        <Link href="/news" className="link">
          NOWOŚCI
        </Link>
        <Link href="/sell" className="link">
          SPRZEDAJ
        </Link>
        <Link href="/contact" className="link">
          KONTAKT
        </Link>

        {/* Dane w menu mobilnym */}
        <div className="mobile-contact-container">
          <p><strong>ANTYKI BATOREGO A.D.1984</strong></p>
          <p>KATOWICE, UL. BATOREGO 10</p>
          <p>📞 690-121-131, (32) 2517-878</p>
          <p>✉️ ANTYKIBATOREGO@GMAIL.COM</p>
        </div>
      </nav>
    </header>
  );
}

export default Header;