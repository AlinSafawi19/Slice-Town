import type { ReactNode } from "react";

const rows: {
  className: string;
  label: string;
  node: ReactNode;
}[] = [
  { className: "type-h1", label: "Heading 1", node: "SliceTown" },
  { className: "type-h2", label: "Heading 2", node: "Fresh daily" },
  { className: "type-h3", label: "Heading 3", node: "Our menu" },
  { className: "type-h4", label: "Heading 4", node: "Locations" },
  { className: "type-h5", label: "Heading 5", node: "Order online" },
  { className: "type-h6", label: "Heading 6", node: "Hours" },
  { className: "type-heading-small", label: "Heading small", node: "Legal" },
  {
    className: "type-body",
    label: "Body",
    node: (
      <>
        Body copy with <strong>bold</strong> and <em>italic</em>.
      </>
    ),
  },
  { className: "type-button", label: "Button text", node: "Order now" },
  { className: "type-nav", label: "Nav text", node: "Menu" },
  { className: "type-text-lead", label: "Text lead", node: "Lead paragraph style." },
  { className: "type-text-lead-bold", label: "Text lead bold", node: "Lead bold style." },
  { className: "type-text-small", label: "Text small", node: "Small supporting text." },
  { className: "type-text-xs", label: "Text XS", node: "Extra small text." },
  { className: "type-text-xs-bold", label: "Text XS bold", node: "XS bold text." },
];

export function TextStyles() {
  return (
    <div className="text-styles-page">
      <h2 className="text-styles-heading">Text styles</h2>
      <ul className="text-styles-list">
        {rows.map((row) => {
          const isHeading =
            row.className.startsWith("type-h") ||
            row.className === "type-heading-small";
          return (
            <li key={row.className} className="text-styles-row">
              <p className="text-styles-meta">
                {row.label} · <code className="text-foreground">{row.className}</code>
              </p>
              {isHeading ? (
                <div className={row.className}>{row.node}</div>
              ) : (
                <p className={row.className}>{row.node}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
