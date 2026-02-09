import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Ui/Container";
import Button from "../../components/Ui/Button";
import Reveal from "../../components/Ui/Reveal/Reveal";
import "./Services.scss";

import videoplayback from "../../image/videoplayback.mp4";

import dicas from "../../image/dicas.jpg";
import dicas2 from "../../image/dicas2.jpg";
import dicas3 from "../../image/dicas3.jpeg";
import dicas4 from "../../image/dicas4.png";


import magnifier from "../../image/magnifier.png";
import compas from "../../image/compas.png";
import seoreport from "../../image/seoreport.png";
import selection from "../../image/selection.png";

import helmet from "../../image/helmet.png";
import repair from "../../image/repair.png";
import sticker from "../../image/sticker.png";
import d from "../../image/3d.png";
import calculator from "../../image/calculator.png";

import communication from "../../image/communication.png";
import analysis from "../../image/analysis.png";
import business from "../../image/business.png";
import idea from "../../image/idea.png";
import badge from "../../image/badge.png";

import shield from "../../image/shield.png";
import multiple from "../../image/multiple.png";
import support from "../../image/support.png";

import building from "../../image/building.png";
import briefcase from "../../image/briefcase.png";
import time from "../../image/time.png";

import institute from "../../image/institute.png";
import medical from "../../image/medical.png";
import ball from "../../image/ball.png";
import factory from "../../image/factory.png";


import jk from "../../image/jk.jpg";
import km from "../../image/km.jpg";
import zv from "../../image/zv.jpg";

export default function Services() {
  const { t } = useTranslation();

  const main = t("servicesPage.mainServices", { returnObjects: true }) || [];
  const extra = t("servicesPage.extraServices", { returnObjects: true }) || [];
  const steps = t("servicesPage.process.items", { returnObjects: true }) || [];
  const why = t("servicesPage.why.items", { returnObjects: true }) || [];
  const types = t("servicesPage.types.items", { returnObjects: true }) || [];
  const also = t("servicesPage.types.also", { returnObjects: true }) || [];
  const metrics = t("servicesPage.cta.metrics", { returnObjects: true }) || [];

  const svcicons = [magnifier, compas, seoreport, selection];

  // ✅ иконки для "Расширенные возможности" (6 шт)
  const icons = [helmet, repair, sticker, d, calculator, communication];

  // ✅ иконки для шагов процесса (5 шт)
  const stepIcons = [communication, analysis, business, idea, badge];

  const useIcons = [time, shield, multiple, support];

  const badgeIcons = [building, briefcase, analysis];

  const alsoIcons = [institute, medical, ball, factory];


  const svcImages = [dicas, dicas2, dicas3, dicas4];

    const objImages = [jk, km, zv];

  return (
    <div className="servicesPage">
      {/* HERO */}
      <section className="servicesPage__hero">
        <Container className="servicesPage__heroInner">
          <div className="servicesPage__heroLeft">
            <Reveal variant="up">
              <div className="servicesPage__kicker">{t("servicesPage.kicker")}</div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <h1 className="servicesPage__h1">{t("servicesPage.heroTitle")}</h1>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <p className="servicesPage__lead">{t("servicesPage.heroLead")}</p>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <div className="servicesPage__heroBtns">
                <Button variant="ghost" onClick={() => (window.location.href = "#services")}>
                  {t("servicesPage.heroBtnView")}
                </Button>
                <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                  {t("servicesPage.heroBtnContact")}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={120} className="servicesPage__heroRight">

                          <div className="servicesPage__heroMedia" aria-hidden="true" >
              <video
                className="servicesPage__video"
                src={videoplayback}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* MAIN SERVICES (alternating rows) */}
      <section id="services">
        <Container>
          <Reveal variant="up">
            <div className="servicesPage__sectionKicker">{t("servicesPage.mainTitleKicker")}</div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="servicesPage__h2">{t("servicesPage.mainTitle")}</h2>
          </Reveal>

          <div className="svcRows">
            {main.map((s, idx) => {
              const isTextLeft = idx % 2 === 1; // ✅ чередование

const Media = (
  <div className="svcRow__media">
    <img
      src={svcImages[idx] || svcImages[0]}
      alt={s.title}
      className="svcRow__img"
      loading="lazy"
    />
  </div>
);


              const Content = (
                <div className="svcRow__content">
                  <div className="svcRow__top">
                                          <div
  className="svcRow__icon"
  aria-hidden="true"
  style={{ ["--icon"]: `url(${svcicons[idx] || svcicons[0]})` }}
/>
                    <div>
                      <div className="svcRow__badge">
                        {t("servicesPage.serviceLabel")} {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="svcRow__title">{s.title}</div>
                    </div>
                  </div>

                  <div className="svcRow__desc">{s.desc}</div>

                  <ul className="svcRow__list">
                    {(s.bullets || []).map((b, i) => (
                      <li key={i}>
                        <span className="svcRow__check" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a className="svcRow__link" href="/contact">
                    {t("servicesPage.orderService")} <span aria-hidden="true">→</span>
                  </a>
                </div>
              );

              return (
                <Reveal key={`${s.title}-${idx}`} variant="up" delay={idx * 90}>
                  <article className="svcRow">
                    {isTextLeft ? (
                      <>
                        {Content}
                        {Media}
                      </>
                    ) : (
                      <>
                        {Media}
                        {Content}
                      </>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* EXTRA SERVICES */}
      <section>
        <Container>
          <Reveal variant="up">
            <div className="servicesPage__sectionKicker">{t("servicesPage.extraKicker")}</div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="servicesPage__h2">{t("servicesPage.extraTitle")}</h2>
          </Reveal>

          <div className="extraGrid">
            {extra.map((x, idx) => (
              <Reveal key={`${x.title}-${idx}`} variant="up" delay={idx * 70}>
                <div className="extraCard extraCard--dark">
                  <div
                    className="extraCard__icon"
                    style={{ ["--icon"]: `url(${icons[idx] || icons[0]})` }}
                  />

                  <div className="extraCard__title">{x.title}</div>
                  <div className="extraCard__desc">{x.desc}</div>

                  <a className="extraCard__link" href="/contact">
                    {t("servicesPage.more")} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS + WHY */}
      <section className="servicesFlow">
        <Container>
          <div className="servicesFlow__head">
            <Reveal variant="up">
              <div className="servicesPage__sectionKicker">{t("servicesPage.process.kicker")}</div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <h2 className="servicesPage__h2">{t("servicesPage.process.title")}</h2>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <p className="servicesPage__muted">{t("servicesPage.process.lead")}</p>
            </Reveal>
          </div>

          <Reveal variant="up" delay={180}>
            <div className="flowSteps">
              <div className="flowSteps__line" aria-hidden="true" />

              {steps.map((st, idx) => (
                <Reveal key={`${st.n}-${idx}`} variant="up" delay={idx * 90}>
                  <div className="flowStep">
                    <div className="flowStep__iconWrap" aria-hidden="true">
                      <div
                        className="flowStep__icon"
                        style={{ ["--icon"]: `url(${stepIcons[idx] || stepIcons[0]})` }}
                      />
                      <div className="flowStep__badge">{idx + 1}</div>
                    </div>

                    <div className="flowStep__title">{st.title}</div>
                    <div className="flowStep__desc">{st.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <div className="whyPanel">
              <div className="whyPanel__title">{t("servicesPage.why.title")}</div>

              <div className="whyPanel__grid">
                {why.map((w, idx) => (
                  <Reveal key={`${w.title}-${idx}`} variant="up" delay={idx * 90}>
                    <div className="whyItem">
                        
                      <div
  className="whyItem__icon"
  aria-hidden="true"
  style={{ ["--icon"]: `url(${useIcons[idx] || useIcons[0]})` }}
/>

                      <div>
                        <div className="whyItem__t">{w.title}</div>
                        <div className="whyItem__d">{w.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* TYPES */}
      <section className="typesSection">
        <Container>
          <Reveal variant="up">
            <div className="servicesPage__sectionKicker">{t("servicesPage.types.kicker")}</div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="servicesPage__h2">{t("servicesPage.types.title")}</h2>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="servicesPage__muted">{t("servicesPage.types.lead")}</p>
          </Reveal>

          <div className="typesGrid">
            {types.map((tp, idx) => (
              <Reveal key={`${tp.title}-${idx}`} variant="up" delay={idx * 90}>
                <article className="typeCard2">
                  <div className="typeCard2__media">
<div
  className="typeCard2__img"
  aria-hidden="true"
  style={{
    backgroundImage: `url(${objImages[idx] || objImages[0]})`,
  }}
/>
                    <div className="typeCard2__badge" aria-hidden="true">

                                            <div
  className="typeCard2__badgeIcon"
  aria-hidden="true"
  style={{ ["--icon"]: `url(${badgeIcons[idx] || badgeIcons[0]})` }}
/>
                    </div>
                  </div>

                  <div className="typeCard2__body">
                    <div className="typeCard2__title">{tp.title}</div>
                    <div className="typeCard2__desc">{tp.desc}</div>

                    <ul className="typeCard2__list">
                      {(tp.bullets || []).map((b, i) => (
                        <li key={i}>
                          <span className="typeCard2__check" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <a className="typeCard2__link" href="/projects">
                      {t("servicesPage.types.examples")} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={120}>
            <div className="alsoPanel">
              <div className="alsoPanel__title">{t("servicesPage.types.alsoTitle")}</div>

              <div className="alsoPanel__grid">
                {also.map((x, idx) => (
                  <div className="alsoTile" key={`${x}-${idx}`}>
                                                                <div
  className="typeCard2__badgeIcon"
  aria-hidden="true"
  style={{ ["--icon"]: `url(${alsoIcons[idx] || alsoIcons[0]})` }}
/>

                    <div className="alsoTile__text">{x}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="servicesPage__cta">
        <Container className="servicesPage__ctaInner">
          <div>
            <Reveal variant="up">
              <div className="servicesPage__ctaTitle">
                {t("servicesPage.cta.titleLine1")}
                <br />
                {t("servicesPage.cta.titleLine2")}
              </div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <p className="servicesPage__muted">{t("servicesPage.cta.lead")}</p>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <div className="servicesPage__ctaBtns">
                <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                  {t("cta.consult")}
                </Button>
                <a className="pill" href="tel:+998998892586">
                  +998 (99) 889 25 86
                </a>
              </div>
            </Reveal>

            <div className="servicesPage__ctaContacts">
              <Reveal variant="up" delay={180}>
                <div className="servicesPage__contactRow">
                  <div className="servicesPage__contactLabel">{t("servicesPage.cta.emailLabel")}</div>
                  <div>
                    <a href="mailto:info@Benka.uz">info@Benka.uz</a>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={220}>
                <div className="servicesPage__contactRow">
                  <div className="servicesPage__contactLabel">{t("servicesPage.cta.officeLabel")}</div>
                  <div>{t("servicesPage.cta.officeValue")}</div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={260}>
                <div className="servicesPage__contactRow">
                  <div className="servicesPage__contactLabel">{t("servicesPage.cta.hoursLabel")}</div>
                  <div>{t("servicesPage.cta.hoursValue")}</div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="servicesPage__metrics">
            {metrics.map((m, idx) => (
              <Reveal key={`${m.n}-${idx}`} variant="up" delay={idx * 80}>
                <div className="metricCard">
                  <div className="metricCard__n">{m.n}</div>
                  <div className="metricCard__t">{m.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
