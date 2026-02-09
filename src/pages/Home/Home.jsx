import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Ui/Container";
import Button from "../../components/Ui/Button";
import Reveal from "../../components/Ui/Reveal/Reveal";
import "./Home.scss";
import home from "../../image/home.mp4";
import one from "../../image/one.mp4";
import two from "../../image/two.mp4";
import three from "../../image/three.mp4";
import useCountUp from "../../hooks/useCountUp";
import useInViewOnce from "../../hooks/useInViewOnce";

import phone from "../../image/handshake.png";
import doc from "../../image/building.png";
import pen from "../../image/compas.png";
import eye from "../../image/multiple.png";

function StatItem({ valueText, label, start, delay = 0 }) {
  const target = parseInt(String(valueText).replace(/[^\d]/g, ""), 10) || 0;
  const suffix = String(valueText).replace(/[\d\s]/g, ""); // например "+" если есть

  const value = useCountUp(target, { duration: 3000, start });

  return (
    <Reveal variant="up" delay={delay}>
      <div className="stat">
        <div className="stat__n">
          {value}
          {suffix}
        </div>
        <div className="stat__t">{label}</div>
      </div>
    </Reveal>
  );
}


const specVideos = [one, two, three];

export default function Home() {
  const { t } = useTranslation();

  const services = t("home.services.items", { returnObjects: true }) || [];
  const reasons = t("home.why.items", { returnObjects: true }) || [];
  const steps = t("home.process.items", { returnObjects: true }) || [];
  const specs = t("home.spec.items", { returnObjects: true }) || [];


const statsData = [
  { n: t("home.stats.a.n"), t: t("home.stats.a.t") },
  { n: t("home.stats.b.n"), t: t("home.stats.b.t") },
  { n: t("home.stats.c.n"), t: t("home.stats.c.t") },
];


  const { ref: statsRef, inView } = useInViewOnce();

  const processIcons = [phone, doc, pen, eye];

  return (
    <div className="home">
      {/* HERO */}
      <section className="home__hero">
        <Container className="home__heroInner">
          <div className="home__heroLeft">
            <Reveal variant="up" delay={0}>
              <div className="home__badge">{t("home.badge")}</div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <h1 className="home__h1">{t("home.title")}</h1>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <p className="home__lead">{t("home.lead")}</p>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <div className="home__cta">
                <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                  {t("cta.consult")}
                </Button>
                <Button variant="ghost" onClick={() => (window.location.href = "/services")}>
                  {t("nav.services")}
                </Button>
              </div>
            </Reveal>

<div className="home__stats" ref={statsRef}>
  {statsData.map((s, idx) => (
    <StatItem
      key={idx}
      valueText={s.n}
      label={s.t}
      start={inView}
      delay={260 + idx * 80}
    />
  ))}
</div>

          </div>

          <div className="home__heroRight">
            <Reveal variant="scale" delay={120}>
<div className="home__heroCard">
  <div className="home__heroMedia">
    <video
      className="home__heroVideo"
      src={home}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  </div>

  <div className="home__heroNote">
    <div className="home__heroNoteTitle">{t("home.heroCard.title")}</div>
    <div className="home__heroNoteText">{t("home.heroCard.text")}</div>
  </div>
</div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section>
        <Container>
          <Reveal variant="up">
            <h2 className="home__h2">{t("home.servicesTitle")}</h2>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <p className="home__muted">{t("home.servicesLead")}</p>
          </Reveal>

          <div className="grid grid--3">
            {services.map((item, idx) => (
              <Reveal key={`${item.title}-${idx}`} variant="up" delay={idx * 70}>
                <div className="card">
                  <div className="card__title">{item.title}</div>
                  <div className="card__desc">{item.desc}</div>
                  <a className="card__link" href="/services">
                    {t("common.more")} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY US */}
      <section>
        <Container>
          <div className="twoCol">
            <div>
              <Reveal variant="up">
                <div className="kicker">{t("home.whyKicker")}</div>
              </Reveal>
              <Reveal variant="up" delay={60}>
                <h2 className="home__h2">{t("home.whyTitle")}</h2>
              </Reveal>
              <Reveal variant="up" delay={120}>
                <p className="home__muted">{t("home.whyLead")}</p>
              </Reveal>
              <Reveal variant="up" delay={180}>
                <a className="link" href="/about">
                  {t("home.learnMore")} →
                </a>
              </Reveal>
            </div>

            <div className="grid grid--1">
              {reasons.map((item, idx) => (
                <Reveal key={`${item.title}-${idx}`} variant="up" delay={idx * 80}>
                  <div className="card">
                    <div className="card__title">{item.title}</div>
                    <div className="card__desc">{item.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
<section className="homeProcess">
  <Container>
    <Reveal variant="up">
      <div className="kicker">{t("home.processKicker")}</div>
    </Reveal>

    <Reveal variant="up" delay={60}>
      <h2 className="home__h2">{t("home.processTitle")}</h2>
    </Reveal>



    <div className="homeProcess__rail" aria-hidden="true" />

    <div className="homeProcess__grid">
      {steps.map((item, idx) => (
        <Reveal key={`${item.n}-${idx}`} variant="up" delay={160 + idx * 90}>
          <article className="pStep" style={{ ["--d"]: `${idx * 60}ms` }}>
            <div className="pStep__top">
              <div className="pStep__num">{String(idx + 1).padStart(2, "0")}</div>

              <div
                className="pStep__miniIcon"
                aria-hidden="true"
                style={{ ["--icon"]: `url(${processIcons[idx] || processIcons[0]})` }}
              />
            </div>

            <div className="pStep__t">{item.title}</div>
            <div className="pStep__d">{item.desc}</div>

            {/* маленький коннектор вправо (как на картинке) */}
            <div className="pStep__connector" aria-hidden="true" />
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal variant="up" delay={240}>
      <div className="homeProcess__cta">
        <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
          {t("cta.startProject")} <span aria-hidden="true">→</span>
        </Button>
      </div>
    </Reveal>
  </Container>
</section>

      {/* SPECIALIZATION */}
      <section>
        <Container>
          <Reveal variant="up">
            <div className="kicker">{t("home.specKicker")}</div>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="home__h2">{t("home.specTitle")}</h2>
          </Reveal>

<div className="grid grid--3">
  {specs.map((item, idx) => (
    <Reveal key={`${item.title}-${idx}`} variant="up" delay={idx * 70}>
      <div className="card card--media">
        <div className="card__media">
          <video
            className="card__video"
            src={specVideos[idx % specVideos.length]}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="card__title">{item.title}</div>
        <div className="card__desc">{item.desc}</div>
        <a className="card__link" href="/projects">
          {t("home.viewProjects")} →
        </a>
      </div>
    </Reveal>
  ))}
</div>

        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="home__finalCta">
        <Container className="home__finalInner">
          <Reveal variant="up">
            <div>
              <h2 className="home__h2">{t("home.finalTitle")}</h2>
              <p className="home__muted">{t("home.finalLead")}</p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="home__finalBtns">
              <a className="pill" href="tel:+998998892586">
                (+99899) 889 25 86
              </a>
              <a className="pill" href="mailto:info@benka.uz">
                info@benka.uz
              </a>
              <Button variant="primary1" onClick={() => (window.location.href = "/contact")}>
                {t("cta.contactUs")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
