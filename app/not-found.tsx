import {
  ButtonPrimaryVariantLink,
  Footer,
  InViewReveal,
  Navigation,
} from "@/components/project/interactions";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="page-main">
        <section
          className="not-found-hero"
          aria-labelledby="not-found-heading"
        >
          <div className="not-found-hero-inner">
            <div className="not-found-hero-container">
              <h1 id="not-found-heading" className="not-found-hero-title">
                <span className="u-sr-only">404 — Page not found</span>
                <span
                  className="not-found-hero-title-row"
                  aria-hidden="true"
                >
                  <InViewReveal
                    className="not-found-hero-digit-reveal"
                    rootMargin="0px"
                    threshold={0}
                  >
                    <span className="not-found-hero-digit">4</span>
                  </InViewReveal>
                  <span className="not-found-hero-image-wrap">
                    <InViewReveal
                      className="not-found-hero-image-reveal"
                      rootMargin="0px"
                      threshold={0}
                    >
                      <span className="not-found-hero-image" />
                    </InViewReveal>
                  </span>
                  <InViewReveal
                    className="not-found-hero-digit-reveal"
                    rootMargin="0px"
                    threshold={0}
                  >
                    <span className="not-found-hero-digit">4</span>
                  </InViewReveal>
                </span>
              </h1>
              <InViewReveal
                className="not-found-section-content-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <div className="not-found-section-content">
                  <div className="not-found-section-title">
                    <p className="type-h5 not-found-section-heading">
                      Page Not Found
                    </p>
                    <p className="type-body not-found-section-description">
                      The page you are looking for doesn&apos;t exist or has been
                      moved.
                    </p>
                  </div>
                  <ButtonPrimaryVariantLink href="/" title="Go home" />
                </div>
              </InViewReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
