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
  aboutSection: {
    introLines: string[]
    statementLines: string[]
    storyParagraphs: string[]
    currentlyLabel: string
    currentlyValue: string
    stackLabel: string
    stackItems: string[]
    toolingLabel: string
    toolingItems: string[]
  }
  sectionPlaceholders: {
    about: string
    services: string
    index: string
    contact: string
  }
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
    aboutSection: {
      introLines: [
        "Junior software engineer with a strong frontend eye and a practical backend mindset.",
        "I build clean, reliable software that connects solid technical execution with real business value. I'm especially interested in creating products that are simple to use, well-structured, and built to solve real problems.",
      ],
      statementLines: [
        "I'm a software engineer focused on turning",
        "complex ideas into clean, usable digital products.",
        "My strength is connecting design, code, and",
        "product thinking to build software that looks",
        "sharp, works reliably, and solves real problems.",
      ],
      storyParagraphs: [
        "I'm Javier. My interest in technology comes from wanting to understand how ideas become real products. I started by building practical applications with Java, databases, and user interfaces, and over time I became especially interested in the connection between frontend design, backend logic, and business value.",
        "Today, I focus on building software that is clean, useful, and easy to understand. I enjoy working on products that involve dashboards, automation, data, APIs, and AI-assisted features because they combine technical execution with real decision-making. My goal is to grow as a software engineer who can contribute not only with code, but also with clarity, product thinking, and attention to detail.",
        "Beyond technical skills, I value creativity and the ability to see opportunities where technology can create meaningful impact. I enjoy exploring new ideas, designing intuitive user experiences, and finding innovative ways to solve problems. My vision is to build solutions that not only work well but also deliver lasting value for users and businesses. By combining creativity with strong engineering principles, I aim to contribute to products that are both practical and forward-thinking.",
      ],
      currentlyLabel: "CURRENTLY",
      currentlyValue: "Looking for my first full-time software engineering role",
      stackLabel: "STACK",
      stackItems: [
        "React",
        "TypeScript",
        "JavaScript",
        "Java",
        "Spring Boot",
        "REST APIs",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "Android",
        "SQLite",
        "Tauri",
        "Docker",
        "Git",
        "GitHub",
        "Postman",
        "Figma",
      ],
      toolingLabel: "TOOLING",
      toolingItems: [
        "IntelliJ IDEA",
        "VS Code",
        "Android Studio",
        "pnpm",
        "Vite",
        "npm",
        "Chrome DevTools",
        "MySQL Workbench",
        "Figma",
        "Firebase Console",
        "Swagger UI",
        "Linux Terminal",
      ],
    },
    sectionPlaceholders: {
      about: "This section is being built and will be published soon.",
      services: "Services details are coming soon.",
      index: "Index details are coming soon.",
      contact: "Contact section coming soon.",
    },
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
    aboutSection: {
      introLines: [
        "Ingeniero de software junior con una fuerte mirada de frontend y una mentalidad practica de backend.",
        "Construyo software limpio y confiable que conecta una ejecucion tecnica solida con valor real de negocio. Me interesa especialmente crear productos simples de usar, bien estructurados y pensados para resolver problemas reales.",
      ],
      statementLines: [
        "Soy un ingeniero de software enfocado en convertir",
        "ideas complejas en productos digitales limpios y utiles.",
        "Mi fortaleza es conectar diseno, codigo y",
        "pensamiento de producto para construir software que",
        "se vea bien, funcione de forma fiable y resuelva problemas reales.",
      ],
      storyParagraphs: [
        "Soy Javier. Mi interes por la tecnologia nace de entender como las ideas se convierten en productos reales. Empece construyendo aplicaciones practicas con Java, bases de datos e interfaces de usuario, y con el tiempo me interese especialmente en la conexion entre diseno frontend, logica backend y valor de negocio.",
        "Hoy me enfoco en construir software limpio, util y facil de entender. Disfruto trabajar en productos con dashboards, automatizacion, datos, APIs y funciones asistidas por IA porque combinan ejecucion tecnica con toma de decisiones real. Mi objetivo es crecer como ingeniero de software que aporte no solo con codigo, sino tambien con claridad, criterio de producto y atencion al detalle.",
        "Mas alla de las habilidades tecnicas, valoro la creatividad y la capacidad de ver oportunidades donde la tecnologia puede generar impacto real. Me gusta explorar ideas nuevas, disenar experiencias de usuario intuitivas y encontrar formas innovadoras de resolver problemas. Mi vision es construir soluciones que no solo funcionen bien, sino que tambien aporten valor duradero para usuarios y negocios. Al combinar creatividad con principios solidos de ingenieria, busco contribuir a productos practicos y con vision de futuro.",
      ],
      currentlyLabel: "ACTUALMENTE",
      currentlyValue: "Buscando mi primer rol full-time en ingenieria de software",
      stackLabel: "STACK",
      stackItems: [
        "React",
        "TypeScript",
        "JavaScript",
        "Java",
        "Spring Boot",
        "REST APIs",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "Android",
        "SQLite",
        "Tauri",
        "Docker",
        "Git",
        "GitHub",
        "Postman",
        "Figma",
      ],
      toolingLabel: "HERRAMIENTAS",
      toolingItems: [
        "IntelliJ IDEA",
        "VS Code",
        "Android Studio",
        "pnpm",
        "Vite",
        "npm",
        "Chrome DevTools",
        "MySQL Workbench",
        "Figma",
        "Firebase Console",
        "Swagger UI",
        "Linux Terminal",
      ],
    },
    sectionPlaceholders: {
      about: "Esta seccion esta en construccion y se publicara pronto.",
      services: "Los detalles de servicios estaran disponibles pronto.",
      index: "Los detalles de indices estaran disponibles pronto.",
      contact: "La seccion de contacto estara disponible pronto.",
    },
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
