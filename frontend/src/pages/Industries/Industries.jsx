import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Ui/Container";
import Button from "../../components/Ui/Button";
import Reveal from "../../components/Ui/Reveal/Reveal";
import "./Industries.scss";
import industries from "../../image/industries.mp4";

import img1 from "../../image/1.png";
import img2 from "../../image/2.png";
import img3 from "../../image/3.png";
import img4 from "../../image/4.png";
import img5 from "../../image/5.png";
import img6 from "../../image/6.png";


import compas from "../../image/compas.png";
import calculator from "../../image/calculator.png";
import lightning from "../../image/lightning.png";
import air from "../../image/air.png";
import drops from "../../image/drops.png";
import heat from "../../image/heat.png";
import extinguisher from "../../image/extinguisher.png";
import wifi from "../../image/wifi.png";
import location from "../../image/location.png";

import idea from "../../image/idea1.png";
import diamond from "../../image/diamond.png";
import puzzle from "../../image/puzzle.png";
import selection from "../../image/selection.png";
import categorization from "../../image/categorization.png";
import badge from "../../image/badge.png";


export default function Industries() {
  const { t } = useTranslation();

  // ✅ новые ключи (как на оригинале)
  const statsRaw = t("industriesPage.stats", { returnObjects: true });
  const solutionsRaw = t("industriesPage.solutions", { returnObjects: true });
  const servicesRaw = t("industriesPage.services", { returnObjects: true });
  const whyRaw = t("industriesPage.why.items", { returnObjects: true });

  const stats = Array.isArray(statsRaw) ? statsRaw : [];
  const solutions = Array.isArray(solutionsRaw) ? solutionsRaw : [];
  const services = Array.isArray(servicesRaw) ? servicesRaw : [];
  const why = Array.isArray(whyRaw) ? whyRaw : [];

  const images = [img1, img2, img3, img4, img5, img6];

  const serviceIcons = [compas, calculator, lightning, air, drops, heat, extinguisher, wifi, location];

  const whyIcons = [idea, diamond, puzzle, selection, categorization, badge];

  return (
    <div className="industriesPage">
      {/* HERO */}
      <section className="industriesPage__hero">
        <Container className="industriesPage__heroInner">
          <div className="industriesPage__heroLeft">
            <Reveal variant="up" delay={0}>
              <div className="industriesPage__kicker">{t("industriesPage.kicker")}</div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <h1 className="industriesPage__h1">{t("industriesPage.title")}</h1>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <p className="industriesPage__lead">{t("industriesPage.lead")}</p>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <div className="industriesPage__heroBtns">
                <Button variant="primary" onClick={() => (window.location.href = "/projects")}>
                  {t("industriesPage.btnProjects")}
                </Button>
                <Button variant="ghost" onClick={() => (window.location.href = "/contact")}>
                  {t("cta.consult")}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={120} className="industriesPage__heroRight">
            <div className="industriesPage__heroMedia" aria-hidden="true">
              <video
                    className="industriesPage__heroVideo"
                    src={industries}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
            </div>
          </Reveal>
        </Container>

        {/* STATS */}
        <Container>
          <div className="industriesPage__stats">
            {stats.map((s, idx) => (
              <Reveal key={`${s.n}-${idx}`} variant="up" delay={260 + idx * 80}>
                <div className="iStat">
                  <div className="iStat__n">{s.n}</div>
                  <div className="iStat__t">{s.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SOLUTIONS */}
      <section className="industriesPage__section">
        <Container>
          <Reveal variant="up">
            <div className="industriesPage__sectionKicker">{t("industriesPage.solutionsKicker")}</div>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="industriesPage__h2">{t("industriesPage.solutionsTitle")}</h2>
          </Reveal>
          <Reveal variant="up" delay={140}>
            <p className="industriesPage__muted">{t("industriesPage.solutionsLead")}</p>
          </Reveal>

          <div className="industriesPage__grid">
            {solutions.map((it, idx) => (
              <Reveal key={`${it.title}-${idx}`} variant="up" delay={idx * 80}>
                <article className="indCard">
<div className="indCard__media">
  <img className="indCard__img" src={images[idx]} alt={it.title} />
</div>
              

                  <div className="indCard__body">
                    <div className="indCard__title">{it.title}</div>
                    <div className="indCard__desc">{it.desc}</div>

                    <div className="indCard__tags">
                      {(it.tags || []).map((x, i) => (
                        <span className="tag" key={`${x}-${i}`}>
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVICES LIST */}
      <section className="industriesPage__section">
        <Container>
          <Reveal variant="up">
            <div className="industriesPage__sectionKicker">{t("industriesPage.servicesKicker")}</div>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="industriesPage__h2">{t("industriesPage.servicesTitle")}</h2>
          </Reveal>
          <Reveal variant="up" delay={140}>
            <p className="industriesPage__muted">{t("industriesPage.servicesLead")}</p>
          </Reveal>

<div className="industriesPage__servicesGrid">
  {services.map((s, idx) => (
    <Reveal key={`${s.title}-${idx}`} variant="up" delay={idx * 70}>
      <div className="svcMini">
        {/* ICON */}
        <div
          className="svcMini__icon"
          aria-hidden="true"
          style={{ ["--icon"]: `url(${serviceIcons[idx] || serviceIcons[0]})` }}
        />

        <div className="svcMini__title">{s.title}</div>
        <div className="svcMini__desc">{s.desc}</div>
      </div>
    </Reveal>
  ))}
</div>

        </Container>
      </section>

      {/* WHY */}
<section className="industriesPage__section industriesPage__whySection">
  <Container>
    <Reveal variant="up">
      <div className="industriesPage__sectionKicker">{t("industriesPage.why.kicker")}</div>
    </Reveal>
    <Reveal variant="up" delay={80}>
      <h2 className="industriesPage__h2">{t("industriesPage.why.title")}</h2>
    </Reveal>
    <Reveal variant="up" delay={140}>
      <p className="industriesPage__muted">{t("industriesPage.why.lead")}</p>
    </Reveal>

    {/* ВНЕШНЯЯ ПАНЕЛЬ */}
    <div className="whyPanel2">
      <div className="whyPanel2__grid">
        {why.map((w, idx) => (
          <Reveal key={`${w.title}-${idx}`} variant="up" delay={idx * 80}>
            <article className="whyCard2" style={{ ["--d"]: `${idx * 40}ms` }}>
              <div
                className="whyCard2__icon"
                aria-hidden="true"
                style={{ ["--icon"]: `url(${whyIcons[idx] || whyIcons[0]})` }}
              />

              <div className="whyCard2__content">
                <div className="whyCard2__t">{w.title}</div>
                <div className="whyCard2__d">{w.desc}</div>
              </div>

            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </Container>
</section>


      {/* CTA */}
      <section className="industriesPage__cta">
        <Container className="industriesPage__ctaInner">
          <div>
            <Reveal variant="up">
              <div className="industriesPage__ctaTitle">{t("industriesPage.cta.title")}</div>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <p className="industriesPage__muted">{t("industriesPage.cta.lead")}</p>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <div className="industriesPage__ctaBtns">
                <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                  {t("industriesPage.cta.btn")}
                </Button>
                <a className="pill" href="tel:+998998892586">
                  +998 99 889 25 86
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
