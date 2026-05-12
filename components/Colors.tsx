import { paletteSections } from "@/lib/palette";

const SWATCH_BG: Record<string, string> = {
  black: "bg-black",
  "gray-1": "bg-gray-1",
  "gray-2": "bg-gray-2",
  white: "bg-white",
  "dark-1": "bg-dark-1",
  "dark-2": "bg-dark-2",
  "dark-3": "bg-dark-3",
  "dark-4": "bg-dark-4",
  "primary-1": "bg-primary-1",
  "primary-2": "bg-primary-2",
  "primary-3": "bg-primary-3",
  "primary-4": "bg-primary-4",
  "primary-5": "bg-primary-5",
  "primary-6": "bg-primary-6",
  "primary-7": "bg-primary-7",
  "primary-8": "bg-primary-8",
  "primary-9": "bg-primary-9",
};

function needsEdge(token: string) {
  return token === "gray-1" || token === "white";
}

export function Colors() {
  return (
    <div className="colors-page">
      {paletteSections.map((section) => (
        <section key={section.title} className="colors-section">
          <h2 className="colors-section-title">{section.title}</h2>
          <ul className="colors-grid">
            {section.swatches.map((swatch) => (
              <li
                key={`${section.title}-${swatch.token}`}
                className="colors-swatch-card"
              >
                <div
                  className={[
                    "colors-swatch",
                    SWATCH_BG[swatch.token] ?? "",
                    needsEdge(swatch.token) ? "colors-swatch--edge" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden
                />
                <div className="colors-swatch-body">
                  <p className="colors-swatch-name">{swatch.name}</p>
                  <p className="colors-swatch-mono">{swatch.hex}</p>
                  <p className="colors-swatch-muted">100%</p>
                  <p
                    className="colors-swatch-token"
                    title={`bg-${swatch.token}`}
                  >
                    bg-{swatch.token}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
