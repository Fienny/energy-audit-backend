import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../Ui/Container";
import Button from "../Ui/Button";
import "./Header.scss";
import logo from "../../image/header_logo_down4.png";
const nav = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/industries", key: "nav.industries" },
  { to: "/projects", key: "nav.projects" },
  { to: "/contact", key: "nav.contact" },
];

const LANGS = ["ru", "uz", "en"];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const { t, i18n } = useTranslation();

  // ✅ language dropdown state
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const current = (i18n.resolvedLanguage || "ru").toLowerCase();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  // ✅ close lang on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!langRef.current) return;
      if (!langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setLangOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // ✅ lock body scroll when menu open + close on ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setOpenMenu(false);
    };

    if (openMenu) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onEsc);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [openMenu]);

  // ✅ close menu when route changes by clicking link
  const closeMenu = () => setOpenMenu(false);

  return (
    <header className="header">
      <Container className="header__inner">
        <NavLink to="/" className="header__brand" aria-label="Benka" onClick={closeMenu}>
          <img className="header__logo" src={logo} alt="Benka" />
        </NavLink>

        {/* desktop nav (оставляем как есть для больших экранов) */}
        <nav className="header__navDesktop">
          {nav.map((i) => (
            <NavLink key={i.to} to={i.to} className="header__link">
              {t(i.key)}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          {/* ✅ LANG SWITCHER */}
          <div className={`langSwitch ${langOpen ? "is-open" : ""}`} ref={langRef}>
            <button
              type="button"
              className="langSwitch__toggle"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Language"
              aria-expanded={langOpen}
            >
              {current.toUpperCase()}
            </button>

            <div className="langSwitch__panel" role="menu" aria-hidden={!langOpen}>
              {LANGS.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  role="menuitem"
                  className={`langSwitch__item ${current === lng ? "is-active" : ""}`}
                  onClick={() => setLang(lng)}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* ❌ кнопку консультации убрали из хедера */}

          <button
            className={`header__burger ${openMenu ? "is-open" : ""}`}
            onClick={() => setOpenMenu((v) => !v)}
            aria-label="Меню"
            aria-expanded={openMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>

      {/* ✅ overlay + offcanvas menu */}
      <div className={`menuOverlay ${openMenu ? "is-open" : ""}`} onClick={closeMenu} />

      <aside className={`menuPanel ${openMenu ? "is-open" : ""}`} aria-hidden={!openMenu}>
        <div className="menuPanel__top">
          <div className="menuPanel__brand">
            <span className="header__logo" />
            <div className="menuPanel__brandText">
              <div className="menuPanel__brandName">Benka</div>

            </div>
          </div>

          <button className="menuPanel__close" onClick={closeMenu} aria-label="Close">
            ✕
          </button>
        </div>

        <nav className="menuPanel__nav">
          {nav.map((i, idx) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `menuPanel__link ${isActive ? "is-active" : ""}`
              }
              onClick={closeMenu}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {t(i.key)}
              <span className="menuPanel__chev" aria-hidden="true">→</span>
            </NavLink>
          ))}
        </nav>

        {/* ✅ bottom CTA */}
        <div className="menuPanel__bottom">
          <div className="menuPanel__divider" />
          <Button
            variant="primary"
            className="menuPanel__cta"
            onClick={() => {
              closeMenu();
              window.location.href = "/contact";
            }}
          >
            {t("cta.consult")}
          </Button>

          <div className="menuPanel__contacts">
            <a className="menuPanel__pill" href="tel:+998998892586">
              (+99899) 889 25 86
            </a>
            <a className="menuPanel__pill" href="mailto:info@benka.uz">
              info@benka.uz
            </a>
          </div>
        </div>
      </aside>
    </header>
  );
}
