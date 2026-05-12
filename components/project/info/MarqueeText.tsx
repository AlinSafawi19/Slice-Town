const marqueeTextWrapperClass = "marquee-text-wrap";

const marqueeTextTitleClass = "marquee-text-title type-text-lead-bold";

export type MarqueeTextProps = {
  title: string;
  className?: string;
  titleClassName?: string;
};

export function MarqueeText({
  title,
  className = "",
  titleClassName = "",
}: MarqueeTextProps) {
  return (
    <div
      className={[marqueeTextWrapperClass, className].filter(Boolean).join(" ")}
    >
      <p
        className={[marqueeTextTitleClass, titleClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </p>
    </div>
  );
}

export default MarqueeText;
