type ContactSectionProps = {
  title: string
}

export function ContactSection({ title }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-24 py-8 sm:py-12">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </section>
  )
}
