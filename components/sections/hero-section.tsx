type HeroSectionProps = {
  title: string
}

export function HeroSection({ title }: HeroSectionProps) {
  return (
    <section id="home" className="scroll-mt-24 space-y-4 py-8 sm:py-12">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
    </section>
  )
}
