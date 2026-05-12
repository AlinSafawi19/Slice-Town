/** SliceTown palette — keep `app/globals.css` @theme colors in sync. */

export type PaletteSwatch = {
  name: string;
  /** Tailwind token: `bg-${token}`, `text-${token}`, etc. */
  token: string;
  hex: string;
};

export type PaletteSection = {
  title: string;
  swatches: readonly PaletteSwatch[];
};

export const paletteSections: readonly PaletteSection[] = [
  {
    title: "Neutrals",
    swatches: [
      { name: "Black", token: "black", hex: "#000000" },
      { name: "Gray 1", token: "gray-1", hex: "#F8F4E0" },
      { name: "Gray 2", token: "gray-2", hex: "#4D4D4D" },
      { name: "White", token: "white", hex: "#FFFFFF" },
    ],
  },
  {
    title: "Dark colors",
    swatches: [
      { name: "Dark 1", token: "dark-1", hex: "#3D2101" },
      { name: "Dark 2", token: "dark-2", hex: "#4B2B07" },
      { name: "Dark 3", token: "dark-3", hex: "#57350F" },
      { name: "Dark 4", token: "dark-4", hex: "#51381B" },
    ],
  },
  {
    title: "Primary colors",
    swatches: [
      { name: "Primary 1", token: "primary-1", hex: "#FAB037" },
      { name: "Primary 2", token: "primary-2", hex: "#E57300" },
      { name: "Primary 3", token: "primary-3", hex: "#FF9A27" },
      { name: "Primary 4", token: "primary-4", hex: "#FFAB36" },
      { name: "Primary 5", token: "primary-5", hex: "#FFB948" },
      { name: "Primary 6", token: "primary-6", hex: "#FFAB36" },
      { name: "Primary 7", token: "primary-7", hex: "#FF9A27" },
      { name: "Primary 8", token: "primary-8", hex: "#E57300" },
      { name: "Primary 9", token: "primary-9", hex: "#C56714" },
    ],
  },
] as const;
