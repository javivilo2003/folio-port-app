export type Locale = "en" | "es"

type TopNavItem = {
  href: string
  index: string
  label: string
}

type InfoItem = {
  label: string
  value: string
}

export type Dictionary = {
  brand: string
  switchLabel: string
  topNav: TopNavItem[]
  info: InfoItem[]
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
    info: [
      { label: "INDEX Nº 00", value: "PORTFOLIO / 2026" },
      { label: "DISCIPLINE", value: "SOFTWARE ENGINEER" },
      { label: "BASED IN", value: "MADRID, SPAIN" },
      { label: "STATUS", value: "OPEN TO WORK" },
    ],
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
    info: [
      { label: "INDICE Nº 00", value: "PORTAFOLIO / 2026" },
      { label: "DISCIPLINA", value: "INGENIERO DE SOFTWARE" },
      { label: "BASADO EN", value: "MADRID, ESPANA" },
      { label: "ESTADO", value: "ABIERTO A TRABAJAR" },
    ],
    hero: {
      firstName: "Javier",
      lastName: "Viloria",
    },
  },
}
