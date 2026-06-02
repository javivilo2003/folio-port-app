"use client"

import Link from "next/link"
import { useState } from "react"

import { LenisScrollSync } from "@/components/motion/lenis-scroll-sync"
import { Button } from "@/components/ui/button"
import { dictionaries, type Locale } from "@/lib/i18n"

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")
  const dictionary = dictionaries[locale]

  function toggleLocale() {
    setLocale(locale === "en" ? "es" : "en")
  }

  return (
    <div className="min-h-screen bg-black text-[#E8DCC4]">
      <LenisScrollSync />

      <header className="sticky top-0 z-50 border-b hairline bg-black/92 backdrop-blur">
        <div className="mx-auto grid w-full max-w-[1800px] grid-cols-12 gap-4 px-6 py-5 md:px-10">
          <div className="col-span-5 md:col-span-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleLocale}
              className="font-utility h-8 border-[#E8DCC4]/30 px-3 text-[#E8DCC4] hover:bg-[#E8DCC4] hover:text-black"
            >
              {dictionary.switchLabel}
            </Button>
          </div>

          <nav className="col-span-7 md:col-span-9">
            <ul className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2 md:gap-x-12">
              {dictionary.topNav.map((item) => (
                <li key={item.index}>
                  <Link
                    href={item.href}
                    className="font-utility utility-dim transition-colors hover:text-[#E8DCC4]"
                  >
                    <span className="mr-2">{item.index}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1800px] px-6 pb-10 md:px-10 md:pb-16">
        <section className="relative mt-4 min-h-[76vh] overflow-hidden p-6 md:p-10">
          <div className="pointer-events-none relative z-20 grid h-full grid-cols-12 gap-4 md:gap-6">
            <p className="font-utility utility-dim col-span-12 md:col-span-5">
              {dictionary.availability}
            </p>

            <div className="relative col-span-12 mt-10 md:mt-20">
              <h1 className="font-display relative z-10 text-[clamp(3.2rem,11vw,10.5rem)] leading-[0.84] tracking-tight">
                {dictionary.hero.firstName} <em className="italic">{dictionary.hero.lastName}</em>
              </h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
