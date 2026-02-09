import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Ui/Container";
import Button from "../../components/Ui/Button";
import Reveal from "../../components/Ui/Reveal/Reveal";
import "./About.scss";

import about from "../../image/about.mp4";

import useCountUp from "../../hooks/useCountUp";
import useInViewOnce from "../../hooks/useInViewOnce";

// ✅ один элемент статистики (хуки здесь — ОК)
function StatItem({ valueText, label, start, delay = 0, duration = 3200 }) {
  const str = String(valueText ?? "");
  const target = parseInt(str.replace(/[^\d]/g, ""), 10) || 0;

  // suffix: "+" / "%" (если есть)
  const suffix = str.match(/[+%]$/)?.[0] || "";

  // ✅ Fallback: если start почему-то false, всё равно запустим через 200мс
  // чтобы никогда не висело на 0
  const safeStart = start || false;

  const value = useCountUp(target, { duration, start: safeStart });

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

export default function About() {
  const { t } = useTranslation();

  const statsRaw = t("aboutPage.stats", { returnObjects: true });
  const featuresRaw = t("aboutPage.features", { returnObjects: true });
  const stepsRaw = t("aboutPage.steps", { returnObjects: true });

  const stats = Array.isArray(statsRaw) ? statsRaw : [];
  const features = Array.isArray(featuresRaw) ? featuresRaw : [];
  const steps = Array.isArray(stepsRaw) ? stepsRaw : [];

  // ✅ наблюдаем за блоком статистики
  const { ref: statsRef, inView } = useInViewOnce({
    // чтобы сработало чуть раньше, чем блок полностью виден
    rootMargin: "0px 0px -25% 0px",
  });

  return (
    <section className="about">
      <Container>
        {/* HERO */}
        <Reveal variant="up">
          <div className="about__hero">
            <div className="about__heroLeft">
              <div className="about__kicker">{t("aboutPage.kicker")}</div>
              <h1 className="about__title">{t("aboutPage.title")}</h1>
              <p className="about__lead">{t("aboutPage.lead")}</p>

              <div className="about__btns">
                <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                  {t("cta.consult")}
                </Button>
                <Button variant="ghost" onClick={() => (window.location.href = "/projects")}>
                  {t("aboutPage.viewProjects")}
                </Button>
              </div>
            </div>

            <div className="about__heroRight">
              <div className="about__media">
                <div className="about__mediaInner">
                  <video
                    className="about__video"
                    src={about}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>

                <div className="about__mediaCaption">
                  <div className="about__mediaTitle">{t("aboutPage.media.title")}</div>
                  <div className="about__mediaText">{t("aboutPage.media.text")}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ✅ STATS
            ref вешаем на простой div, НЕ на Reveal и НЕ на анимируемый элемент
        */}
        <div ref={statsRef}>
          <Reveal variant="up" delay={80}>
            <div className="about__stats">
              {stats.map((s, idx) => (
                <StatItem
                  key={`${s.n}-${idx}`}
                  valueText={s.n}
                  label={s.t}
                  start={inView}
                  delay={120 + idx * 120}
                  duration={3200} // ⬅️ делай больше/меньше
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* FEATURES */}
        <Reveal variant="up" delay={160}>
          <div className="about__block">
            <div className="about__blockHead">
              <div className="about__kicker">{t("aboutPage.featuresKicker")}</div>
              <h2 className="about__h2">{t("aboutPage.featuresTitle")}</h2>
              <p className="about__muted">{t("aboutPage.featuresLead")}</p>
            </div>

            <div className="about__grid">
              {features.map((f, idx) => (
                <Reveal key={`${f.title}-${idx}`} delay={idx * 60} variant="up">
                  <div className="aboutCard aboutCard--soft">
                    <div className="aboutCard__title">{f.title}</div>
                    <div className="aboutCard__desc">{f.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* HOW WE WORK */}
        <Reveal variant="up" delay={240}>
          <div className="about__block">
            <div className="about__blockHead">
              <div className="about__kicker">{t("aboutPage.stepsKicker")}</div>
              <h2 className="about__h2">{t("aboutPage.stepsTitle")}</h2>
              <p className="about__muted">{t("aboutPage.stepsLead")}</p>
            </div>

            <div className="about__steps">
              {steps.map((st, idx) => (
                <div className="stepCard" key={`${st.n}-${idx}`}>
                  <div className="stepCard__n">{st.n}</div>
                  <div className="stepCard__title">{st.title}</div>
                  <div className="stepCard__desc">{st.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal variant="up" delay={320}>
          <div className="about__cta">
            <div>
              <h2 className="about__h2">{t("aboutPage.cta.title")}</h2>
              <p className="about__muted">{t("aboutPage.cta.lead")}</p>
            </div>

            <div className="about__ctaBtns">
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
