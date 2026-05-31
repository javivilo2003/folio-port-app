"use client"

import Link from "next/link"
import type { MouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { LenisScrollSync } from "@/components/motion/lenis-scroll-sync"
import { dictionaries, type Locale } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")
  const aboutHeadlineRef = useRef<HTMLHeadingElement>(null)
  const heroNameRef = useRef<HTMLHeadingElement>(null)
  const navBrandRef = useRef<HTMLAnchorElement>(null)
  const dictionary = dictionaries[locale]
  const isSpanish = locale === "es"
  const aboutNavItem = dictionary.topNav.find((item) => item.href === "#about")
  const servicesNavItem = dictionary.topNav.find((item) => item.href === "#services")
  const indexNavItem = dictionary.topNav.find((item) => item.href === "#index")
  const contactNavItem = dictionary.topNav.find((item) => item.href === "#contact")

  function toggleLocale() {
    setLocale(locale === "en" ? "es" : "en")
  }

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) {
      return
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()

    const target = document.querySelector<HTMLElement>(href)
    if (!target) {
      return
    }

    gsap.killTweensOf(window)

    gsap.to(window, {
      duration: 1.08,
      ease: "power3.out",
      scrollTo: {
        y: target,
        offsetY: 84,
        autoKill: true,
      },
      onComplete: () => {
        window.history.replaceState(null, "", href)
      },
    })
  }

  useEffect(() => {
    const headline = aboutHeadlineRef.current
    if (!headline) {
      return
    }

    const lines = headline.querySelectorAll<HTMLElement>("[data-about-line]")
    if (!lines.length) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(lines, {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
        x: -22,
      })

      gsap.to(lines, {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        x: 0,
        duration: 0.78,
        ease: "power2.out",
        stagger: 0.26,
        clearProps: "clipPath,opacity,visibility,transform",
        scrollTrigger: {
          trigger: headline,
          start: "top 88%",
          end: "top 62%",
          toggleActions: "play none none reverse",
        },
      })
    }, headline)

    return () => {
      context.revert()
    }
  }, [locale])

  useEffect(() => {
    const heroName = heroNameRef.current
    const navBrand = navBrandRef.current

    if (!heroName || !navBrand) {
      return
    }

    const context = gsap.context(() => {
      const showNavBrand = () => {
        gsap.to(navBrand, {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
          overwrite: "auto",
        })
      }

      const hideNavBrand = () => {
        gsap.to(navBrand, {
          autoAlpha: 0,
          y: -10,
          duration: 0.34,
          ease: "power2.out",
          overwrite: "auto",
        })
      }

      gsap.set(navBrand, { autoAlpha: 0, y: -10 })

      const trigger = ScrollTrigger.create({
        trigger: heroName,
        start: "bottom top+=72",
        end: "max",
        onEnter: showNavBrand,
        onEnterBack: showNavBrand,
        onLeaveBack: hideNavBrand,
      })

      if (trigger.isActive) {
        showNavBrand()
      } else {
        hideNavBrand()
      }
    })

    return () => {
      context.revert()
    }
  }, [locale])

  return (
    <div className="min-h-screen bg-black p-[4px] text-[#E8DCC4]">
      <LenisScrollSync />

      <div className="mx-auto min-h-[calc(100vh-8px)] w-full max-w-[1860px] bg-black">
        <div className="sticky top-0 z-50 hidden bg-black/95 lg:block">
          <div className="mx-[4.55%] flex min-h-[72px] items-center justify-between border-b border-[#3B342A]">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={`Switch language to ${dictionary.switchLabel}`}
              className="font-utility text-[12px] tracking-[0] text-[#E8DCC4] underline decoration-[11%] underline-offset-1 transition-colors hover:text-white"
            >
              {dictionary.switchLabel}
            </button>

            <a
              ref={navBrandRef}
              href="#page-00"
              onClick={(event) => handleNavClick(event, "#page-00")}
              className="invisible absolute left-1/2 -translate-x-1/2 font-display text-[clamp(20px,1.32vw,30px)] tracking-[-0.025em] text-[#E8DCC4]/95 opacity-0 transition-colors hover:text-white"
            >
              {dictionary.brand.toUpperCase()}
            </a>

            <nav>
              <ul
                className={`flex items-center ${
                  isSpanish ? "gap-[clamp(6px,0.55vw,10px)]" : "gap-[clamp(8px,0.85vw,15px)]"
                }`}
              >
                {dictionary.topNav.map((item) => (
                  <li key={item.index}>
                    <Link
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
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
          </div>
        </div>

        <section id="page-00" className="relative hidden min-h-[calc(100vh-10px)] lg:block">
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

          <h1
            ref={heroNameRef}
            className="font-display absolute left-[9.0856%] top-[68.9354%] text-[clamp(56px,4.2vw,72px)] leading-[1.2] tracking-[-0.03em] text-[#E8DCC4]"
          >
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

        <section id="about" className="scroll-mt-28 py-10 lg:py-14">
          <div className="px-[2.0856%]">
            <div className="mt-14 max-w-[760px] space-y-1.5 text-[clamp(16px,1.02vw,19px)] leading-[1.65] text-[#7B6F5A]">
              {dictionary.aboutSection.introLines.map((line, index) => (
                <p key={line} className={index === 0 ? "text-[#E8DCC4]" : "text-[#7B6F5A]"}>
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-28 flex items-center gap-4 font-utility text-[13px] tracking-[0] text-[#7B6F5A] lg:mt-36 lg:ml-[5.4%]">
              <span className="text-[#E8DCC4]">{aboutNavItem?.index ?? "01"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span>{aboutNavItem?.label ?? "ABOUT"}</span>
            </div>

            <h2
              ref={aboutHeadlineRef}
              className="font-display mt-20 max-w-[1200px] text-[clamp(44px,5.35vw,96px)] leading-[1.03] tracking-[-0.035em] text-[#E8DCC4] lg:mt-28 lg:ml-[20.2%] px-[0.1%]"
            >
              {dictionary.aboutSection.statementLines.map((line) => (
                <span key={line} data-about-line className="block will-change-transform">
                  {line}
                </span>
              ))}
            </h2>

            <div className="mt-24 lg:mt-32 lg:grid lg:grid-cols-[1fr_1px_0.86fr] lg:gap-12 lg:pl-[20.2%]">
              <div className="space-y-7 text-[clamp(16px,0.98vw,18px)] leading-[1.78] text-[#7B6F5A]">
                {dictionary.aboutSection.storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="my-10 hidden bg-[#3B342A] lg:block" />

              <div className="space-y-9 text-[clamp(16px,0.98vw,18px)] leading-[1.6] text-[#D7CCB4] lg:pt-4">
                <div>
                  <p className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                    {dictionary.aboutSection.currentlyLabel}
                  </p>
                  <p className="mt-2 max-w-[470px]">{dictionary.aboutSection.currentlyValue}</p>
                </div>

                <div>
                  <p className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                    {dictionary.aboutSection.stackLabel}
                  </p>
                  <p className="mt-2 max-w-[520px]">
                    {dictionary.aboutSection.stackItems.join(" · ")}
                  </p>
                </div>

                <div>
                  <p className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                    {dictionary.aboutSection.toolingLabel}
                  </p>
                  <p className="mt-2 max-w-[520px]">
                    {dictionary.aboutSection.toolingItems.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 py-20 lg:min-h-[72vh] lg:py-28">
          <div className="px-6 lg:px-[9.0856%]">
            <p className="font-utility text-[14px] tracking-[0] text-[#736343]">
              {servicesNavItem?.index ?? "02"}
            </p>
            <h2 className="font-display mt-5 text-[clamp(40px,3.85vw,64px)] leading-[1.08] tracking-[-0.02em] text-[#E8DCC4]">
              {servicesNavItem?.label ?? "SERVICES"}
            </h2>
            <p className="font-utility mt-8 max-w-[780px] text-[13px] leading-[1.8] tracking-[0.08em] text-[#A99C87]">
              {dictionary.sectionPlaceholders.services}
            </p>
          </div>
        </section>
        
        <section id="index" className="scroll-mt-28 py-20 lg:min-h-[72vh] lg:py-28">
          <div className="px-6 lg:px-[9.0856%]">
            <p className="font-utility text-[14px] tracking-[0] text-[#736343]">
              {indexNavItem?.index ?? "03"}
            </p>
            <h2 className="font-display mt-5 text-[clamp(40px,3.85vw,64px)] leading-[1.08] tracking-[-0.02em] text-[#E8DCC4]">
              {indexNavItem?.label ?? "INDEX"}
            </h2>
            <p className="font-utility mt-8 max-w-[780px] text-[13px] leading-[1.8] tracking-[0.08em] text-[#A99C87]">
              {dictionary.sectionPlaceholders.index}
            </p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-20 lg:min-h-[56vh] lg:py-28">
          <div className="px-6 lg:px-[9.0856%]">
            <p className="font-utility text-[14px] tracking-[0] text-[#736343]">
              {contactNavItem?.index ?? "04"}
            </p>
            <h2 className="font-display mt-5 text-[clamp(40px,3.85vw,64px)] leading-[1.08] tracking-[-0.02em] text-[#E8DCC4]">
              {contactNavItem?.label ?? "CONTACT"}
            </h2>
            <p className="font-utility mt-8 max-w-[780px] text-[13px] leading-[1.8] tracking-[0.08em] text-[#A99C87]">
              {dictionary.sectionPlaceholders.contact}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
