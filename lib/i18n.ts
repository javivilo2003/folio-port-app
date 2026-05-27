export type Locale = "en" | "es"

type TopNavItem = {
  href: string
  index: string
  label: string
}

export type Dictionary = {
  brand: string
  switchLabel: string
  topNav: TopNavItem[]
  availability: string
  hero: {
    firstName: string
    lastName: string
  }
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    brand: "Javier Viloria",
    switchLabel: "ES",
    topNav: [
      { href: "#about", index: "01", label: "ABOUT" },
      { href: "#services", index: "02", label: "SERVICES" },
      { href: "#index", index: "03", label: "INDEX" },
      { href: "#contact", index: "04", label: "CONTACT" },
    ],
    availability: "AVAILABLE — Q3 2026",
    hero: {
      firstName: "Javier",
      lastName: "Viloria",
    },
  },
  es: {
    brand: "Javier Viloria",
    switchLabel: "EN",
    topNav: [
      { href: "#about", index: "01", label: "SOBRE MI" },
      { href: "#services", index: "02", label: "SERVICIOS" },
      { href: "#index", index: "03", label: "INDICE" },
      { href: "#contact", index: "04", label: "CONTACTO" },
    ],
    availability: "DISPONIBLE — Q3 2026",
    hero: {
      firstName: "Javier",
      lastName: "Viloria",
    },
  },
}
