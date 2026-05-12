import { InViewReveal } from "./InViewReveal";

export function TestimonialItem({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <InViewReveal
      className="home-testimonial-item-reveal"
      rootMargin="0px"
      threshold={0.1}
    >
      <div className="home-testimonial-item">
        <div className="home-testimonial-item-bg" aria-hidden />
        <p className="type-body home-testimonial-item-quote">{quote}</p>
        <p className="type-text-small home-testimonial-item-author">{author}</p>
      </div>
    </InViewReveal>
  );
}
