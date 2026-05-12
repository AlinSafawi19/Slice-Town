import { HomeAboutGalleryTicker } from "@/components/project/HomeAboutGalleryTicker";
import { HomeOffersCarousel } from "@/components/project/HomeOffersCarousel";
import { HomeHeroHandScroll } from "@/components/project/HomeHeroHandScroll";
import { HomePromoMarquee } from "@/components/project/HomePromoMarquee";
import {
  InstagramItem,
  InstagramItemMedia,
  InstagramVideoCard,
  MenuListItem,
  MenuListItemSingle,
} from "@/components/project/info";
import {
  ButtonPrimaryLink,
  ButtonUberEatsLink,
  Footer,
  InViewReveal,
  MenuItemPrimary,
  Navigation,
  OrderNowPrimary,
  SocialItemPrimary,
  TestimonialsList,
} from "@/components/project/interactions";
import { ReservationForm } from "@/components/project/ReservationForm";
import {
  homeMenuAddons,
  homeMenuDesserts,
  homeMenuNonVegPizzas,
  homeMenuVegPizzas,
} from "@/lib/homeMenuItems";
import Link from "next/link";

const reservationBgImageColumns: string[][] = [
  [
    "https://framerusercontent.com/images/9o6LSw2mhI4hObQhlAox6VdnUxc.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/xWogbYTUwq5lNhA3fYlUvFlyIl4.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/uSCk0OPNXdsCWy31BnjGOm0co.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/9o6LSw2mhI4hObQhlAox6VdnUxc.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/xWogbYTUwq5lNhA3fYlUvFlyIl4.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/uSCk0OPNXdsCWy31BnjGOm0co.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/9o6LSw2mhI4hObQhlAox6VdnUxc.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/xWogbYTUwq5lNhA3fYlUvFlyIl4.jpg?scale-down-to=1024&width=1001&height=1300",
  ],
  [
    "https://framerusercontent.com/images/PoiiEjxydogGMal8EAIFpxMXlX0.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/2URhN0QJZb9WpnYPtUpSSuZM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/CfG9XxQhKVB4EUuDZjHiiyIWWFM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/PoiiEjxydogGMal8EAIFpxMXlX0.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/2URhN0QJZb9WpnYPtUpSSuZM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/CfG9XxQhKVB4EUuDZjHiiyIWWFM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/PoiiEjxydogGMal8EAIFpxMXlX0.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/2URhN0QJZb9WpnYPtUpSSuZM.jpg?scale-down-to=1024&width=1001&height=1300",
  ],
  [
    "https://framerusercontent.com/images/KclqRBMEjBj9p4uo4mIzvDotiM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/PBgBQ6Omyp7j1ipdQGMsT8l9wM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/8KnTZEAT4I2cUSiB9pSFHH7DPA.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/KclqRBMEjBj9p4uo4mIzvDotiM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/PBgBQ6Omyp7j1ipdQGMsT8l9wM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/8KnTZEAT4I2cUSiB9pSFHH7DPA.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/KclqRBMEjBj9p4uo4mIzvDotiM.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/PBgBQ6Omyp7j1ipdQGMsT8l9wM.jpg?scale-down-to=1024&width=1001&height=1300",
  ],
  [
    "https://framerusercontent.com/images/ZEMQTEzDjqO7ZT8nKr4cNbFTORI.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/mwmo08TVx3artpCqsscgFIheLY.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/5wL3iCih4Tejtmv1KagWon0Oic.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/ZEMQTEzDjqO7ZT8nKr4cNbFTORI.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/mwmo08TVx3artpCqsscgFIheLY.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/5wL3iCih4Tejtmv1KagWon0Oic.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/ZEMQTEzDjqO7ZT8nKr4cNbFTORI.jpg?scale-down-to=1024&width=1001&height=1300",
    "https://framerusercontent.com/images/mwmo08TVx3artpCqsscgFIheLY.jpg?scale-down-to=1024&width=1001&height=1300",
  ],
];

export default function Home() {
  const locationCards = [
    {
      title: "Downtown’s Pizza Spot",
      items: [
        {
          icon: "https://framerusercontent.com/images/gyEUUYWb2OWE8siFkSTTUcGQmT4.svg?width=20&height=20",
          text: "7428 Sunset Blvd, Los Angeles, CA 90028",
        },
        {
          icon: "https://framerusercontent.com/images/3gnKx5DYGIp4w4RUUyRdqe7fRYM.svg?width=21&height=20",
          text: "(213) 555-1299",
        },
        {
          icon: "https://framerusercontent.com/images/gkV3Jt5lKoH00b3smF6VzQKSS8.svg?width=21&height=20",
          text: "Mon – Sun: 11:00 AM – 10:30 PM",
        },
      ],
      ctaLabel: "View on Map",
      ctaHref: "https://www.google.com/maps",
    },
    {
      title: "Beachside Buns & Bites",
      items: [
        {
          icon: "https://framerusercontent.com/images/gyEUUYWb2OWE8siFkSTTUcGQmT4.svg?width=20&height=20",
          text: "1501 Ocean Front Walk, Venice, CA 90291",
        },
        {
          icon: "https://framerusercontent.com/images/3gnKx5DYGIp4w4RUUyRdqe7fRYM.svg?width=21&height=20",
          text: "(310) 555-7890",
        },
        {
          icon: "https://framerusercontent.com/images/gkV3Jt5lKoH00b3smF6VzQKSS8.svg?width=21&height=20",
          text: "Mon – Sun: 12:00 PM – 11:00 PM",
        },
      ],
      ctaLabel: "View on Map",
      ctaHref: "https://www.google.com/maps",
    },
    {
      title: "Order Your Fresh Pizza Now",
      description: "Craving pizza? Order in seconds for pickup or delivery.",
      ctaLabel: "Order Now",
      ctaHref: "http://ubereats.com/",
      isMutedCard: true,
    },
  ];

  return (
    <>
      <Navigation />
      <HomeHeroHandScroll />
      <main className="page-main">
        <section className="home-hero" id="home" aria-label="Home">
          <div id="image" aria-hidden="true" />
          <div className="home-hero-content">
            <div className="home-hero-content-col">
              <InViewReveal
                className="home-hero-image-wrap"
                rootMargin="0px"
                threshold={0}
              >
                <div className="home-hero-image" aria-hidden="true" />
                <div className="home-hero-image-hand" aria-hidden="true" />
              </InViewReveal>
              <InViewReveal
                className="home-hero-mobile-hero"
                rootMargin="0px"
                threshold={0}
              >
                <div className="home-hero-mobile-hero-image" aria-hidden="true" />
              </InViewReveal>
              <div className="home-hero-text-content">
                <h1 className="home-hero-section-title-wrap">
                  <span className="home-hero-title-row home-hero-title-row--primary">
                    <span className="home-hero-title-text home-hero-title-text--scroll-x type-h1">
                      Bite it. Love it. Repeat Without Any Pause.
                    </span>
                  </span>
                  <span className="home-hero-title-row home-hero-title-row--secondary">
                    <span className="home-hero-title-text home-hero-title-text--scroll-x-secondary type-h1">
                      Hot Slices. Big Bites. No Regrets Forever More.
                    </span>
                  </span>
                </h1>
              </div>
              <div className="home-hero-shape-one" aria-hidden="true">
                <div className="home-hero-shape-one-image" />
              </div>
              <div className="home-hero-shape-two" aria-hidden="true">
                <div className="home-hero-shape-two-image" />
              </div>
            </div>
          </div>
        </section>
        <section className="home-about" id="about-us" aria-label="About us">
          <div
            className="home-about-pattern home-about-pattern-strip"
            aria-hidden
          />
          <div
            id="about-shape-01"
            className="home-about-shape-one"
            aria-hidden
          />
          <div
            id="about-shape-02"
            className="home-about-shape-two"
            aria-hidden
          />
          <div className="home-about-container">
            <div className="home-about-content">
              <div className="home-about-title-wrap">
                <InViewReveal
                  className="home-about-title-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <h2 className="type-h2">
                    Where Every Perfect Slice Tells a Story
                  </h2>
                </InViewReveal>
                <InViewReveal
                  className="home-about-lead-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <p className="type-text-lead">
                    Our ingredients are fresh, our ovens are hot, and our team
                    is fired up to serve you the best pies in town. From classic
                    Margheritas to loaded flavor bombs, every pizza is made with
                    intention, fun, and a little pizza magic. We believe pizza is
                    more than food, it&apos;s a celebration.
                  </p>
                </InViewReveal>
              </div>
              <InViewReveal
                className="home-about-ubereats-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <ButtonUberEatsLink />
              </InViewReveal>
            </div>
          </div>
          <HomeAboutGalleryTicker />
          <div
            className="home-about-pattern-09 home-about-pattern-09-strip"
            aria-hidden
          />
        </section>
        <section className="home-menu" id="menu" aria-label="Menu">
          <div id="menu-shape-01" className="home-menu-shape-one" aria-hidden />
          <div className="home-menu-shape-two" aria-hidden />
          <div className="home-menu-container">
            <div className="home-menu-title-wrap">
              <InViewReveal
                className="home-menu-title-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <h2 className="type-h2">Pizza Lovers Choice</h2>
              </InViewReveal>
            </div>
            <div className="home-menu-grid">
              <InViewReveal
                className="home-menu-item-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <div id="menu-item-01" className="home-menu-item">
                <div className="home-menu-item-header">
                  <div className="home-menu-item-title-wrap">
                    <span
                      className="home-menu-item-dot"
                      aria-hidden
                    />
                    <p className="type-h5 home-menu-item-title-text">
                      Veg Pizzas
                    </p>
                  </div>
                  <div className="home-menu-item-size">
                    <span className="type-text-small home-menu-item-size-text">
                      Regular
                    </span>
                    <span className="type-text-small home-menu-item-size-text">
                      Large
                    </span>
                  </div>
                </div>
                <div className="home-menu-item-list">
                  {homeMenuVegPizzas.map((row) => (
                    <MenuListItem
                      key={row.itemName}
                      itemName={row.itemName}
                      itemDescription={row.itemDescription}
                      regularPrice={row.regularPrice}
                      largePrice={row.largePrice}
                    />
                  ))}
                </div>
                </div>
              </InViewReveal>
              <InViewReveal
                className="home-menu-item-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <div id="menu-item-02" className="home-menu-item">
                <div className="home-menu-item-header">
                  <div className="home-menu-item-title-wrap">
                    <span
                      className="home-menu-item-dot home-menu-item-dot--nonveg"
                      aria-hidden
                    />
                    <p className="type-h5 home-menu-item-title-text">
                      Non-Veg Pizzas
                    </p>
                  </div>
                  <div className="home-menu-item-size">
                    <span className="type-text-small home-menu-item-size-text">
                      Regular
                    </span>
                    <span className="type-text-small home-menu-item-size-text">
                      Large
                    </span>
                  </div>
                </div>
                <div className="home-menu-item-list">
                  {homeMenuNonVegPizzas.map((row) => (
                    <MenuListItem
                      key={row.itemName}
                      itemName={row.itemName}
                      itemDescription={row.itemDescription}
                      regularPrice={row.regularPrice}
                      largePrice={row.largePrice}
                    />
                  ))}
                </div>
                </div>
              </InViewReveal>
              <InViewReveal
                className="home-menu-item-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <div id="menu-item-03" className="home-menu-item">
                <div className="home-menu-item-header">
                  <div className="home-menu-item-title-wrap">
                    <p className="type-h5 home-menu-item-title-text">
                      Add-ons
                    </p>
                  </div>
                  <div className="home-menu-item-size">
                    <span
                      className="home-menu-item-size-spacer"
                      aria-hidden
                    />
                    <span className="type-text-small home-menu-item-size-text">
                      Price
                    </span>
                  </div>
                </div>
                <div className="home-menu-item-list">
                  {homeMenuAddons.map((row) => (
                    <MenuListItemSingle
                      key={row.itemName}
                      itemName={row.itemName}
                      itemDescription={row.itemDescription}
                      regularPrice={row.regularPrice}
                    />
                  ))}
                </div>
                </div>
              </InViewReveal>
              <InViewReveal
                className="home-menu-item-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <div id="menu-item-04" className="home-menu-item">
                <div className="home-menu-item-header">
                  <div className="home-menu-item-title-wrap">
                    <p className="type-h5 home-menu-item-title-text">
                      Desserts
                    </p>
                  </div>
                  <div className="home-menu-item-size">
                    <span
                      className="home-menu-item-size-spacer"
                      aria-hidden
                    />
                    <span className="type-text-small home-menu-item-size-text">
                      Price
                    </span>
                  </div>
                </div>
                <div className="home-menu-item-list">
                  {homeMenuDesserts.map((row) => (
                    <MenuListItemSingle
                      key={row.itemName}
                      itemName={row.itemName}
                      itemDescription={row.itemDescription}
                      regularPrice={row.regularPrice}
                    />
                  ))}
                </div>
                </div>
              </InViewReveal>
            </div>
          </div>
        </section>
        <section className="home-offer" id="offer" aria-label="Offers">
          <div className="home-offer-bg-pattern" aria-hidden />
          <div
            className="home-offer-pattern home-offer-pattern-strip"
            aria-hidden
          />
          <div className="home-offer-container">
            <div className="home-offer-menu">
              <div className="home-offer-menu-title-wrap">
                <InViewReveal
                  className="home-offer-title-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <h2 className="type-h2 home-offer-menu-title">
                    Delicious Top Picks From Our Oven
                  </h2>
                </InViewReveal>
              </div>
              <div className="home-offer-menu-list">
                <InViewReveal
                  className="home-offer-item-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <MenuItemPrimary
                    imageSrc="https://framerusercontent.com/images/DFCIPAKJFLS81mBnG1q1sIw.jpg?width=600&height=600"
                    name="Spicy peri peri paneer"
                    regularPriceLine2="8"
                    largePriceLine2="12"
                    orderHref="https://www.ubereats.com/"
                  />
                </InViewReveal>
                <InViewReveal
                  className="home-offer-item-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <MenuItemPrimary
                    imageSrc="https://framerusercontent.com/images/mlLVA91IWvGZk1yDVsL4QHqwM.jpg?width=600&height=600"
                    name="Farmhouse supreme"
                    regularPriceLine2="16"
                    largePriceLine2="20"
                    orderHref="https://www.ubereats.com/"
                    badgeText="Hot"
                  />
                </InViewReveal>
                <InViewReveal
                  className="home-offer-item-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <MenuItemPrimary
                    imageSrc="https://framerusercontent.com/images/D8HYmgjL8oStOgmF4VSqDlqfZt4.jpg?width=600&height=600"
                    name="Triple cheese overload"
                    regularPriceLine2="22"
                    largePriceLine2="28"
                    orderHref="https://www.ubereats.com/"
                  />
                </InViewReveal>
                <InViewReveal
                  className="home-offer-item-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <MenuItemPrimary
                    imageSrc="https://framerusercontent.com/images/QqSu6Sf5h7IubedU43KYgevWTfw.jpg?scale-down-to=512&width=600&height=600"
                    name="BBQ chicken blaze"
                    regularPriceLine2="36"
                    largePriceLine2="44"
                    orderHref="https://www.ubereats.com/"
                  />
                </InViewReveal>
              </div>
            </div>
            <div className="home-offer-offer">
              <div className="home-offer-section-title">
                <h2 className="type-h2 home-offer-section-title-text">
                  Hot Deals
                </h2>
              </div>
              <InViewReveal
                className="home-offer-carousel-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <HomeOffersCarousel />
              </InViewReveal>
            </div>
          </div>
        </section>
        <section
          className="home-reservation"
          id="reservation"
          aria-label="Reservation"
        >
          <div className="home-reservation-bg" aria-hidden="true">
            <div className="home-reservation-bg-image-list">
              {reservationBgImageColumns.map((list, listIdx) => (
                <div
                  className={`home-reservation-bg-image-list-wrap${
                    listIdx === 0 || listIdx === 2
                      ? " home-reservation-bg-image-list-wrap--animated"
                      : listIdx === 1 || listIdx === 3
                        ? " home-reservation-bg-image-list-wrap--animated-alt"
                      : ""
                  }`}
                  key={`list-${listIdx}`}
                >
                  <div className="home-reservation-bg-image-loop">
                    {list.map((imageUrl, imageIdx) => (
                      <img
                        className="home-reservation-bg-image"
                        key={`img-${listIdx}-${imageIdx}`}
                        src={imageUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="home-reservation-container-sm">
            <div className="home-reservation-section-title">
              <InViewReveal
                className="home-reservation-title-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <h2 className="type-h2 home-reservation-section-title-text">
                  Reserve a Table
                </h2>
              </InViewReveal>
            </div>
            <InViewReveal
              className="home-reservation-card-reveal"
              rootMargin="0px"
              threshold={0}
            >
              <div className="home-reservation-card">
                <ReservationForm />
              </div>
            </InViewReveal>
          </div>
        </section>
        <section
          className="home-testimonials"
          id="testimonials"
          aria-label="Testimonials"
        >
          <div className="home-testimonials-shape" aria-hidden />
          <div className="home-testimonials-bg-pattern" aria-hidden />
          <div className="home-testimonials-container">
            <div className="home-testimonials-section-title">
              <InViewReveal
                className="home-testimonials-title-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <h2 className="type-h2 home-testimonials-section-title-text">
                  Truly Loved by People Like You
                </h2>
              </InViewReveal>
            </div>
            <TestimonialsList />
          </div>
        </section>
        <HomePromoMarquee />
        <section className="home-location" id="location" aria-label="Where to find us">
          <div className="home-location-bg" aria-hidden>
            <div className="home-location-bg-image" />
            <div className="home-location-bg-overlay" />
          </div>
          <div className="home-location-container">
            <div className="home-location-title-wrap">
              <InViewReveal
                className="home-location-title-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <h2 className="type-h2 home-location-title">Where To Find Us</h2>
              </InViewReveal>
            </div>
            <div className="home-location-grid">
              {locationCards.map((card, index) => (
                <InViewReveal
                  key={card.title}
                  className={`home-location-card-reveal home-location-card-reveal--${
                    index + 1
                  }`}
                  rootMargin="0px"
                  threshold={0}
                >
                  <div
                    className={`home-location-card${
                      card.isMutedCard ? " home-location-card--muted" : ""
                    }`}
                  >
                    <div className="home-location-card-text-wrap">
                      <p className="type-text-lead-bold home-location-card-title">{card.title}</p>
                      {card.items?.length ? (
                        <div className="home-location-list">
                          {card.items.map((item) => (
                            <div className="home-location-list-item" key={`${card.title}-${item.text}`}>
                              <div className="home-location-list-item-icon-wrap" aria-hidden>
                                <img
                                  className="home-location-list-item-icon"
                                  src={item.icon}
                                  alt=""
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                              <p className="type-body home-location-list-item-text">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {card.description ? (
                        <p className="type-body home-location-card-description">
                          {card.description}
                        </p>
                      ) : null}
                    </div>
                    <ButtonPrimaryLink
                      href={card.ctaHref}
                      title={card.ctaLabel}
                      className="home-location-card-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </div>
                </InViewReveal>
              ))}
            </div>
          </div>
        </section>
        <section className="home-location-instagram" id="instagram" aria-label="Instagram">
          <div className="home-location-instagram-container">
            <div className="home-location-instagram-grid">
              <InViewReveal className="home-location-instagram-item home-location-instagram-item--1 home-location-instagram-item-reveal">
                <InstagramItem>
                  <InstagramItemMedia
                    src="https://framerusercontent.com/images/QE7eugMq60UDe9Ypcw4wdiK6JF8.jpg?width=500&height=650"
                    alt="Instagram post from SliceTown"
                  />
                </InstagramItem>
              </InViewReveal>
              <InViewReveal className="home-location-instagram-item home-location-instagram-item--2 home-location-instagram-item-reveal">
                <InstagramVideoCard src="https://framerusercontent.com/assets/RLOPcPgytiMLyVbhpfgmpq4PJVc.mp4" />
              </InViewReveal>
              <InViewReveal className="home-location-instagram-title-wrap home-location-instagram-title-reveal">
                <SocialItemPrimary
                  className="home-location-instagram-social-item"
                  href="https://www.instagram.com/"
                  title="Instagram"
                  iconSrc="https://framerusercontent.com/images/a1dUReg5SzZwEp6PU0Jx24Ct2SU.png?width=76&height=76"
                  iconAlt="Instagram icon"
                />
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-h4 home-location-instagram-title"
                >
                  Follow the fun @Slicetown
                </Link>
              </InViewReveal>
              <InViewReveal className="home-location-instagram-item home-location-instagram-item--3 home-location-instagram-item-reveal">
                <InstagramVideoCard src="https://framerusercontent.com/assets/K49zKTnt7gTpoPxxtukdQPonpFc.mp4" />
              </InViewReveal>
              <InViewReveal className="home-location-instagram-item home-location-instagram-item--4 home-location-instagram-item-reveal">
                <InstagramVideoCard src="https://framerusercontent.com/assets/uzopyuIAk8ew1ab4DVE5LaFgXKg.mp4" />
              </InViewReveal>
            </div>
          </div>
          <div
            className="home-location-instagram-pattern home-location-instagram-pattern-strip"
            aria-hidden
          />
        </section>
      </main>
      {/* Outside <main>: fixed bottom-left sits in the footer/viewport band, so it must not be under main’s overflow-clip */}
      <div className="page-order-now-slot">
        <OrderNowPrimary />
      </div>
      <Footer />
    </>
  );
}
