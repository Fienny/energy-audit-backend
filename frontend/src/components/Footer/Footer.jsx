import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../Ui/Container";
import { PHONE_HREF, PHONE_DISPLAY, EMAIL_HREF, EMAIL } from "../../config/contacts";
import "./Footer.scss";

const LANGS = ["ru", "uz", "en"];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || "ru").toLowerCase();

  return (
    <footer className="footer">
      <Container className="footer__inner">
        {/* BRAND */}
        <div className="footer__col">
          <div className="footer__brand">Benka</div>
          <div className="footer__desc">{t("footer.desc")}</div>
        </div>

        {/* LINKS */}
        <div className="footer__col">
          <div className="footer__title">{t("footer.linksTitle")}</div>
          <NavLink to="/">{t("nav.home")}</NavLink>
          <NavLink to="/about">{t("nav.about")}</NavLink>
          <NavLink to="/services">{t("nav.services")}</NavLink>
          <NavLink to="/projects">{t("nav.projects")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </div>

        {/* CONTACTS */}
        <div className="footer__col">
          <div className="footer__title">{t("footer.contactsTitle")}</div>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={EMAIL_HREF}>{EMAIL}</a>
          <div className="footer__muted">{t("footer.address")}</div>
        </div>



        {/* BOTTOM */}
        <div className="footer__bottom">
          © {new Date().getFullYear()} Benka. {t("footer.rights")}
        </div>
      </Container>
    </footer>
  );
}
