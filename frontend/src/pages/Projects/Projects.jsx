import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Ui/Container";
import Button from "../../components/Ui/Button";
import Reveal from "../../components/Ui/Reveal/Reveal";

export default function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) || [];

  return (
    <section className="page">
      <Container>
        <div className="page__head">
          <Reveal variant="up" delay={0}>
            <div className="page__kicker">{t("projects.kicker")}</div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h1 className="page__title">{t("projects.title")}</h1>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="page__lead">{t("projects.lead")}</p>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                {t("cta.consult")}
              </Button>
              <Button variant="ghost" onClick={() => (window.location.href = "/services")}>
                {t("nav.services")}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="page__grid page__grid--3">
          {items.map((p, idx) => (
            <Reveal key={`${p.title}-${idx}`} variant="up" delay={idx * 70}>
              <div className="pcard">
                <div className="pcard__title">{p.title}</div>
                <div className="pcard__desc">{p.desc}</div>
                <div className="pcard__meta">{p.meta}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
