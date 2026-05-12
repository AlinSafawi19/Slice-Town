import type { Metadata } from "next";

import { Footer, InViewReveal, Navigation } from "@/components/project/interactions";
import { fetchPrivacyPolicyFromLegalCategory } from "@/lib/legalPagesCategory";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy — SliceTown",
  description: "How SliceTown handles information when you use our website and services.",
};

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchPrivacyPolicyFromLegalCategory();
  if (!result.ok) return fallbackMetadata;
  const { title, updatedDateLabel } = result.entry;
  return {
    title: `${title} — SliceTown`,
    description:
      updatedDateLabel != null
        ? `${title}. Last updated ${updatedDateLabel}.`
        : `${title}.`,
  };
}

export default async function PrivacyPolicyPage() {
  const result = await fetchPrivacyPolicyFromLegalCategory();

  if (!result.ok) {
    return (
      <>
        <Navigation />
        <main className="page-main">
          <section className="legal-hero" aria-labelledby="privacy-policy-heading">
            <div className="legal-hero-container">
              <div className="legal-hero-title-col">
                <InViewReveal
                  className="legal-hero-heading-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <h1 id="privacy-policy-heading" className="type-h2 legal-hero-heading">
                    Privacy Policy
                  </h1>
                </InViewReveal>
                <p className="type-body legal-hero-date-text legal-hero-load-error">
                  This page could not be loaded from the CMS. Set{" "}
                  <code className="legal-privacy-inline-code">CMS_LEGAL_PAGES_URL</code> if your
                  API is not at the default host, and ensure the legal-pages category includes a
                  privacy policy entry (
                  <code className="legal-privacy-inline-code">slug: privacy-policy</code> or title
                  containing &quot;Privacy Policy&quot;).
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const { title, updatedDateLabel } = result.entry;

  return (
    <>
      <Navigation />
      <main className="page-main">
        <section className="legal-hero" aria-labelledby="privacy-policy-heading">
          <div className="legal-hero-container">
            <div className="legal-hero-title-col">
              <InViewReveal
                className="legal-hero-heading-reveal"
                rootMargin="0px"
                threshold={0}
              >
                <h1 id="privacy-policy-heading" className="type-h2 legal-hero-heading">
                  {title}
                </h1>
              </InViewReveal>
              {updatedDateLabel ? (
                <InViewReveal
                  className="legal-hero-date-row-reveal"
                  rootMargin="0px"
                  threshold={0}
                >
                  <div className="legal-hero-date-row">
                    <span className="type-body legal-hero-date-text">Last updated:</span>
                    <span className="type-body legal-hero-date-text">{updatedDateLabel}</span>
                  </div>
                </InViewReveal>
              ) : null}
            </div>
          </div>
        </section>

        <section className="legal-privacy-section" aria-label="Legal page content">
          <div className="legal-privacy-container">
            <InViewReveal className="legal-privacy-prose-reveal">
              <div
                className="legal-privacy-cms"
                dangerouslySetInnerHTML={{ __html: result.entry.html }}
              />
            </InViewReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
