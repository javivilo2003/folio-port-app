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
  servicesSection: {
    lead: string
    items: {
      tag: string
      title: string
      description: string
      capabilities: string[]
    }[]
    closingNote: string
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
    servicesSection: {
      lead: "A focused set of things I can build and ship for you today — drawn from real product work inside an international healthcare SaaS, where I delivered features across web, mobile, and the pipelines in between, as well as the personal and school projects I have worked on.",
      items: [
        {
          tag: "FULL-STACK",
          title: "Full-Stack Web Applications",
          description:
            "End-to-end product modules with a React and TypeScript frontend over a Java and Spring Boot or NestJS backend. I design the data model, build the REST API, and wire up interfaces that stay clean and structured as the product grows — the way I built an inventory module for a clinical SaaS platform, and the intelligent stock manager I created as my personal TFG project.",
          capabilities: ["React", "TypeScript", "Java", "Spring Boot", "NestJS", "REST APIs", "PostgreSQL", "MySQL"],
        },
        {
          tag: "INTEGRATIONS",
          title: "API & Platform Integrations",
          description:
            "Connecting a product to the services it depends on. I have shipped Google OAuth sign-in and a social module that creates, publishes, and schedules content across LinkedIn, Meta, and X through their public APIs.",
          capabilities: ["OAuth 2.0", "Google Sign-In", "LinkedIn API", "Meta API", "X API", "Webhooks", "Scheduling"],
        },
        {
          tag: "CROSS-PLATFORM",
          title: "Cross-Platform & Mobile Delivery",
          description:
            "Taking one codebase to desktop and mobile with Tauri, then all the way through distribution — managing TestFlight betas and scheduled push notifications so real builds reach real testers.",
          capabilities: ["Tauri", "Android", "TestFlight", "Cross-platform", "Push notifications"],
        },
        {
          tag: "AUTOMATION",
          title: "CI/CD & Workflow Automation",
          description:
            "Pipelines that take the manual effort out of shipping. I build GitHub Actions workflows to automate releases, and I worked on a system that analyzes pull requests and recommends merges against quality rules.",
          capabilities: ["GitHub Actions", "Docker", "Automated releases", "PR analysis", "Quality gates"],
        },
        {
          tag: "QUALITY",
          title: "QA & Pre-Launch Validation",
          description:
            "Making sure it works before anyone sees it. Functional QA in staging to validate stability ahead of demos, deliveries, and production — catching the issues that matter while there is still time to fix them.",
          capabilities: ["Functional QA", "Staging validation", "Pre-demo testing", "Bug triage"],
        },
      ],
      closingNote:
        "I'm early in my career and intentional about it — every capability here is something I have already shipped in a production environment, and the list grows with each project. Open to collaborations, freelance work, and a first full-time engineering role.",
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
    servicesSection: {
      lead: "Un conjunto concreto de cosas que puedo construir y entregar hoy, surgidas de trabajo real de producto dentro de un SaaS internacional de salud, donde desarrolle funcionalidades en web, movil y los pipelines intermedios, asi como de los proyectos personales y academicos en los que he trabajado.",
      items: [
        {
          tag: "FULL-STACK",
          title: "Aplicaciones Web Full-Stack",
          description:
            "Modulos de producto de principio a fin con frontend en React y TypeScript sobre un backend en Java y Spring Boot o NestJS. Diseno el modelo de datos, construyo la API REST y conecto interfaces que se mantienen limpias y estructuradas a medida que el producto crece, como el modulo de inventario que desarrolle para una plataforma SaaS clinica y el gestor de stock inteligente que cree como mi proyecto personal de TFG.",
          capabilities: ["React", "TypeScript", "Java", "Spring Boot", "NestJS", "REST APIs", "PostgreSQL", "MySQL"],
        },
        {
          tag: "INTEGRACIONES",
          title: "Integraciones de APIs y Plataformas",
          description:
            "Conectar un producto con los servicios de los que depende. He implementado inicio de sesion con Google OAuth y un modulo social que crea, publica y programa contenido en LinkedIn, Meta y X a traves de sus APIs publicas.",
          capabilities: ["OAuth 2.0", "Google Sign-In", "API de LinkedIn", "API de Meta", "API de X", "Webhooks", "Programacion"],
        },
        {
          tag: "MULTIPLATAFORMA",
          title: "Entrega Multiplataforma y Movil",
          description:
            "Llevar un mismo codigo a escritorio y movil con Tauri, y despues hasta la distribucion: gestion de betas con TestFlight y notificaciones push programadas para que las builds reales lleguen a testers reales.",
          capabilities: ["Tauri", "Android", "TestFlight", "Multiplataforma", "Notificaciones push"],
        },
        {
          tag: "AUTOMATIZACION",
          title: "CI/CD y Automatizacion de Flujos",
          description:
            "Pipelines que quitan el trabajo manual de los despliegues. Construyo flujos con GitHub Actions para automatizar releases y he trabajado en un sistema que analiza pull requests y recomienda merges segun reglas de calidad.",
          capabilities: ["GitHub Actions", "Docker", "Releases automatizados", "Analisis de PR", "Reglas de calidad"],
        },
        {
          tag: "CALIDAD",
          title: "QA y Validacion Pre-Lanzamiento",
          description:
            "Asegurar que funciona antes de que nadie lo vea. QA funcional en staging para validar la estabilidad antes de demos, entregas y produccion, detectando los problemas que importan cuando aun hay tiempo de corregirlos.",
          capabilities: ["QA funcional", "Validacion en staging", "Pruebas pre-demo", "Triage de bugs"],
        },
      ],
      closingNote:
        "Estoy al inicio de mi carrera y lo asumo con intencion: cada capacidad aqui es algo que ya he entregado en un entorno de produccion, y la lista crece con cada proyecto. Abierto a colaboraciones, trabajo freelance y un primer rol full-time como ingeniero.",
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
