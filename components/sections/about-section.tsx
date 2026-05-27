type AboutSectionProps = {
  title: string
}

export function AboutSection({ title }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-24 py-8 sm:py-12">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </section>
  )
}
