import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const BASE_TITLE = "Benka";
const BASE_URL = "https://benka.uz";

const LANG_TO_LOCALE = {
  ru: "ru_RU",
  en: "en_US",
  uz: "uz_UZ",
};

const LANG_TO_HTML = {
  ru: "ru",
  en: "en",
  uz: "uz",
};

function setMetaTag(selector, attribute, value) {
  const el = document.querySelector(selector);
  if (el && value) {
    el.setAttribute(attribute, value);
  }
}

export default function useSeo({ title, description, keywords }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "ru";

  useEffect(() => {
    // Page title
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;

    // HTML lang attribute
    document.documentElement.lang = LANG_TO_HTML[lang] || lang;

    // Primary meta tags
    setMetaTag('meta[name="description"]', "content", description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', "content", keywords);
    }

    // Open Graph
    setMetaTag('meta[property="og:title"]', "content", title ? `${title} | ${BASE_TITLE}` : BASE_TITLE);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:locale"]', "content", LANG_TO_LOCALE[lang] || "ru_RU");

    // Twitter Card
    setMetaTag('meta[name="twitter:title"]', "content", title ? `${title} | ${BASE_TITLE}` : BASE_TITLE);
    setMetaTag('meta[name="twitter:description"]', "content", description);

    // Canonical URL
    const path = window.location.pathname;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `${BASE_URL}${path}`);
    }

    // Hreflang links
    ["ru", "en", "uz"].forEach((lng) => {
      const id = `hreflang-${lng}`;
      let link = document.getElementById(id);
      if (!link) {
        link = document.createElement("link");
        link.id = id;
        link.rel = "alternate";
        link.hreflang = LANG_TO_HTML[lng];
        document.head.appendChild(link);
      }
      link.href = `${BASE_URL}${path}?lang=${lng}`;
    });

    // x-default hreflang
    let xDefault = document.getElementById("hreflang-x-default");
    if (!xDefault) {
      xDefault = document.createElement("link");
      xDefault.id = "hreflang-x-default";
      xDefault.rel = "alternate";
      xDefault.hreflang = "x-default";
      document.head.appendChild(xDefault);
    }
    xDefault.href = `${BASE_URL}${path}`;
  }, [title, description, keywords, lang]);
}
