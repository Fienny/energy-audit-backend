import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Ui/Container";
import Button from "../../components/Ui/Button";
import Reveal from "../../components/Ui/Reveal/Reveal";
import useSeo from "../../hooks/useSeo";
import { PHONE_HREF, PHONE_DISPLAY, EMAIL_HREF, EMAIL, YANDEX_MAP_WIDGET, YANDEX_MAP_LINK } from "../../config/contacts";
import "./Contact.scss";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export default function Contact() {
  const { t } = useTranslation();

  useSeo({
    title: t("seo.contact.title"),
    description: t("seo.contact.description"),
    keywords: t("seo.contact.keywords"),
  });

  const yandexSrc = YANDEX_MAP_WIDGET;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${API_URL}/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="page">
      <Container>
        <div className="page__head">
          <Reveal variant="up" delay={0}>
            <div className="page__kicker">{t("contact.kicker")}</div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h1 className="page__title">{t("contact.title")}</h1>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="page__lead">{t("contact.lead")}</p>
          </Reveal>
        </div>

        {/* TOP: contacts + form */}
        <div className="page__grid page__grid--2">
          {/* LEFT CARD */}
          <Reveal variant="up" delay={0}>
            <div className="pcard">
              <div className="pcard__title">{t("contact.info.title")}</div>
              <div className="pcard__desc">{t("contact.info.desc")}</div>

              <div className="pcard__meta contactMeta">
                <div>
                  <b>{t("contact.info.phoneLabel")}:</b>{" "}
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> 
                </div>

                <div className="contactMeta__row">
                  <b>{t("contact.info.emailLabel")}:</b>{" "}
                  <a href={EMAIL_HREF}>{EMAIL}</a>
                </div>

                <div className="contactMeta__row">
                  <b>{t("contact.info.addrLabel")}:</b> {t("contact.info.addr")}
                </div>
              </div>
    </div>
          </Reveal>

          {/* FORM */}
          <Reveal variant="up" delay={80}>
            <form className="pcard contactForm" onSubmit={onSubmit}>
              <div className="pcard__title">{t("contact.form.title")}</div>
              <div className="pcard__desc">{t("contact.form.desc")}</div>

              <div className="contactForm__grid">
                <Reveal variant="up" delay={0}>
                  <input
                    className="contactForm__input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder={t("contact.form.name")}
                  />
                </Reveal>

                <Reveal variant="up" delay={70}>
                  <input
                    className="contactForm__input"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder={t("contact.form.phone")}
                  />
                </Reveal>

                <Reveal variant="up" delay={140}>
                  <input
                    className="contactForm__input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder={t("contact.form.email")}
                  />
                </Reveal>

                <Reveal variant="up" delay={210}>
                  <textarea
                    className="contactForm__input"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder={t("contact.form.message")}
                    rows={5}
                  />
                </Reveal>

                <Reveal variant="up" delay={280}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="contactForm__btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? t("contact.form.sending", "Отправка...")
                      : status === "sent"
                        ? t("contact.form.sent", "Отправлено ✓")
                        : status === "error"
                          ? t("contact.form.error", "Ошибка, попробуйте ещё")
                          : t("contact.form.submit")}
                  </Button>
                </Reveal>
              </div>
            </form>
          </Reveal>
        </div>

        {/* BOTTOM: map full width */}
        <div className="contactMapBlock">
          <Reveal variant="up" delay={0}>
            <div className="pcard">
              <div className="pcard__title">{t("contact.map.title")}</div>
              <div className="pcard__desc">{t("contact.map.desc")}</div>

              <div className="mapBox">
                <iframe
                  title="Office map"
                  className="mapBox__frame"
                  src={yandexSrc}
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="mapActions">
                <a
                  className="pillMap"
                  href={YANDEX_MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("contact.map.open")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
