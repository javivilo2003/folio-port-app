"use client"

import Link from "next/link"
import { useState } from "react"

import { LenisScrollSync } from "@/components/motion/lenis-scroll-sync"
import { dictionaries, type Locale } from "@/lib/i18n"

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")
  const dictionary = dictionaries[locale]
  const isSpanish = locale === "es"

  function toggleLocale() {
    setLocale(locale === "en" ? "es" : "en")
  }

  return (
    <div className="min-h-screen bg-black p-[4px] text-[#E8DCC4]">
      <LenisScrollSync />

      <div className="mx-auto min-h-[calc(100vh-8px)] w-full max-w-[1860px] bg-black">
        <section className="relative hidden min-h-[calc(100vh-10px)] lg:block">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={`Switch language to ${dictionary.switchLabel}`}
            className="absolute left-[3.2407%] top-[1.8805%] font-utility text-[12px] tracking-[0] text-[#E8DCC4] underline decoration-[11%] underline-offset-1 transition-colors hover:text-white"
          >
            {dictionary.switchLabel}
          </button>

          <nav className="absolute right-[clamp(12px,1.45%,30px)] top-[1.8805%]">
            <ul
              className={`flex items-center ${
                isSpanish ? "gap-[clamp(6px,0.55vw,10px)]" : "gap-[clamp(8px,0.85vw,15px)]"
              }`}
            >
              {dictionary.topNav.map((item) => (
                <li key={item.index}>
                  <Link
                    href={item.href}
                    className={`flex h-[30px] items-center justify-center whitespace-nowrap px-[8px] font-utility text-[12px] tracking-[0] text-[#E8DCC4] transition-colors hover:text-white ${
                      isSpanish && item.index === "01" ? "min-w-[110px]" : "min-w-[94px]"
                    }`}
                  >
                    <span className="mr-[6px] text-[14px] text-[#736343]">{item.index}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute left-[4.5139%] right-[4.5718%] top-[6.9382%] border-b border-[#3B342A]" />
          <div className="absolute left-[4.5718%] right-[4.5139%] top-[95.0761%] border-b border-[#3B342A]" />

          <span className="pointer-events-none absolute left-[14.294%] top-[15.7565%] h-5 w-5 border-l border-t border-[#D0C2A8]/85" />
          <span className="pointer-events-none absolute right-[13.1944%] top-[15.7565%] h-5 w-5 border-r border-t border-[#D0C2A8]/85" />
          <span className="pointer-events-none absolute bottom-[15.7565%] left-[14.294%] h-5 w-5 border-b border-l border-[#D0C2A8]/85" />
          <span className="pointer-events-none absolute bottom-[15.7565%] right-[13.1944%] h-5 w-5 border-b border-r border-[#D0C2A8]/85" />

          <section className="absolute left-[9.7222%] right-[37.6157%] top-[31.7816%] grid grid-cols-4 gap-[2.4vw]">
            {dictionary.info.map((item) => (
              <div key={item.label} className="font-utility">
                <p className="text-[14px] tracking-[0] text-[#736343]">{item.label}</p>
                <p className="mt-[6px] text-[14px] tracking-[0] text-[#E8DCC4]">{item.value}</p>
              </div>
            ))}
          </section>

          <h1 className="font-display absolute left-[9.0856%] top-[68.9354%] text-[clamp(56px,4.2vw,72px)] leading-[1.2] tracking-[-0.03em] text-[#E8DCC4]">
            {dictionary.hero.firstName.toUpperCase()} {dictionary.hero.lastName.toUpperCase()}
          </h1>
        </section>

        <section className="flex min-h-[calc(100vh-10px)] flex-col px-6 pb-7 pt-6 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={`Switch language to ${dictionary.switchLabel}`}
              className="font-utility text-[12px] tracking-[0] text-[#E8DCC4] underline decoration-[11%]"
            >
              {dictionary.switchLabel}
            </button>
            <span className="font-utility text-[12px] text-[#736343]">PORTFOLIO</span>
          </div>

          <div className="mt-5 border-b border-[#3B342A]" />

          <div className="mt-12 grid grid-cols-1 gap-6">
            {dictionary.info.map((item) => (
              <div key={item.label} className="font-utility">
                <p className="text-[13px] text-[#736343]">{item.label}</p>
                <p className="mt-1 text-[13px] text-[#E8DCC4]">{item.value}</p>
              </div>
            ))}
          </div>

          <h1 className="font-display mt-auto text-[17vw] leading-[0.95] tracking-[-0.02em] text-[#E8DCC4]">
            {dictionary.hero.firstName.toUpperCase()} {dictionary.hero.lastName.toUpperCase()}
          </h1>

          <div className="mt-10 border-b border-[#3B342A]" />
        </section>
      </div>
    </div>
  )
}
