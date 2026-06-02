"use client"

import Link from "next/link"
import type { MouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { SplitText } from "gsap/SplitText"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { LenisScrollSync } from "@/components/motion/lenis-scroll-sync"
import { dictionaries, type Locale } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrambleTextPlugin, SplitText)

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")
  const aboutIntroLeadRef = useRef<HTMLParagraphElement>(null)
  const aboutHeadlineRef = useRef<HTMLHeadingElement>(null)
  const aboutPinRef = useRef<HTMLDivElement>(null)
  const aboutDetailsRef = useRef<HTMLDivElement>(null)
  const heroNameRef = useRef<HTMLHeadingElement>(null)
  const navBrandRef = useRef<HTMLAnchorElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
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
    const introLead = aboutIntroLeadRef.current
    if (!introLead) {
      return
    }

    const context = gsap.context(() => {
      const split = new SplitText(introLead, { type: "lines", linesClass: "about-intro-line" })

      gsap.set(split.lines, {
        autoAlpha: 0,
        yPercent: 100,
      })

      gsap.to(split.lines, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.72,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: introLead,
          start: "top 88%",
          end: "bottom 68%",
          toggleActions: "play none none reverse",
        },
      })

      return () => {
        split.revert()
      }
    }, introLead)

    return () => {
      context.revert()
    }
  }, [locale])

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
          // Reveal once and stay revealed — reversing this on scroll-up made the
          // big letters re-hide and glitch as you came back from Services.
          toggleActions: "play none none none",
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

  useEffect(() => {
    const details = aboutDetailsRef.current
    if (!details) {
      return
    }

    const left = details.querySelector<HTMLElement>("[data-about-detail-left]")
    const separator = details.querySelector<HTMLElement>("[data-about-detail-separator]")
    const right = details.querySelector<HTMLElement>("[data-about-detail-right]")

    if (!left || !separator || !right) {
      return
    }

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add("(min-width: 1024px)", () => {
        // No pinning. The whole About block scrolls with the page; the info
        // columns simply slide in beneath the letters as the block enters, hold
        // while it crosses the screen, then slide back out as it nears the top
        // and hands off to Services. Everything is scroll-linked, so it is fully
        // symmetric and gap-free in both directions.
        gsap.set([left, separator, right], { autoAlpha: 0 })
        gsap.set(left, { xPercent: -28 })
        gsap.set(separator, {
          yPercent: -115,
          scaleY: 0,
          transformOrigin: "top center",
        })
        gsap.set(right, { xPercent: 28 })

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: details,
            // From the info entering near the bottom, to it reaching the top as
            // the block scrolls away into Services.
            start: "top 80%",
            end: "top 8%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        timeline
          // Appear: the columns ease in from the sides beneath the letters.
          .to(left, { autoAlpha: 1, xPercent: 0, duration: 0.5, ease: "power2.out" }, 0)
          .to(separator, { autoAlpha: 1, yPercent: 0, scaleY: 1, duration: 0.5, ease: "power2.out" }, 0.05)
          .to(right, { autoAlpha: 1, xPercent: 0, duration: 0.5, ease: "power2.out" }, 0.1)
          // Hold while the block crosses the viewport.
          .to({}, { duration: 0.9 })
          // Leave: the info reverses its appear animation, sliding back out as
          // the block nears the top.
          .to(right, { autoAlpha: 0, xPercent: 28, duration: 0.5, ease: "power2.in" })
          .to(separator, { autoAlpha: 0, yPercent: -115, scaleY: 0, duration: 0.5, ease: "power2.in" }, "<0.05")
          .to(left, { autoAlpha: 0, xPercent: -28, duration: 0.5, ease: "power2.in" }, "<0.05")

        return () => {
          timeline.scrollTrigger?.kill()
          timeline.kill()
        }
      })
    }, details)

    return () => {
      media.revert()
      context.revert()
    }
  }, [locale])

  useEffect(() => {
    const labels = Array.from(document.querySelectorAll<HTMLElement>("[data-scramble-label]"))
    const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-scramble-group]"))
    if (!labels.length) {
      return
    }

    const animateLabel = (label: HTMLElement, delay = 0) => {
      const text = label.dataset.scrambleOriginal ?? label.textContent ?? ""
      label.dataset.scrambleOriginal = text
      gsap.killTweensOf(label)
      gsap.to(label, {
        duration: 0.85,
        delay,
        scrambleText: {
          text,
          chars: "upperCase",
          speed: 0.55,
        },
        ease: "none",
      })
    }

    const labelCleanups = labels.map((label, index) => {
      animateLabel(label, index * 0.035)

      const handleEnter = () => animateLabel(label)
      label.addEventListener("mouseenter", handleEnter)

      return () => {
        label.removeEventListener("mouseenter", handleEnter)
        gsap.killTweensOf(label)
      }
    })

    const groupCleanups = groups.map((group) => {
      const groupLabels = Array.from(group.querySelectorAll<HTMLElement>("[data-scramble-label]"))
      const handleEnter = () => {
        groupLabels.forEach((label) => animateLabel(label))
      }

      group.addEventListener("mouseenter", handleEnter)

      return () => {
        group.removeEventListener("mouseenter", handleEnter)
      }
    })

    return () => {
      labelCleanups.forEach((cleanup) => cleanup())
      groupCleanups.forEach((cleanup) => cleanup())
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
              <span data-scramble-label>{dictionary.switchLabel}</span>
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
                      <span data-scramble-label className="mr-[6px] text-[14px] text-[#736343]">{item.index}</span>
                      <span data-scramble-label>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <section id="page-00" className="relative hidden min-h-[calc(100vh-10px)] lg:block">
          <div className="absolute inset-0 -translate-y-[44px]">
            <div className="absolute left-[4.5718%] right-[4.5139%] top-[95.0761%] border-b border-[#3B342A]" />

            <span className="pointer-events-none absolute left-[14.294%] top-[15.7565%] h-5 w-5 border-l border-t border-[#D0C2A8]/85" />
            <span className="pointer-events-none absolute right-[13.1944%] top-[15.7565%] h-5 w-5 border-r border-t border-[#D0C2A8]/85" />
            <span className="pointer-events-none absolute bottom-[15.7565%] left-[14.294%] h-5 w-5 border-b border-l border-[#D0C2A8]/85" />
            <span className="pointer-events-none absolute bottom-[15.7565%] right-[13.1944%] h-5 w-5 border-b border-r border-[#D0C2A8]/85" />

            <section className="absolute left-[9.7222%] right-[37.6157%] top-[31.7816%] grid grid-cols-4 gap-[2.4vw]">
              {dictionary.info.map((item) => (
                <div key={item.label} className="font-utility">
                  <p data-scramble-label className="text-[14px] tracking-[0] text-[#736343]">{item.label}</p>
                  <p data-scramble-label className="mt-[6px] text-[14px] tracking-[0] text-[#E8DCC4]">{item.value}</p>
                </div>
              ))}
            </section>

            <h1
              ref={heroNameRef}
              className="font-display absolute left-[9.0856%] top-[68.9354%] text-[clamp(68px,5vw,88px)] leading-[1.2] tracking-[-0.03em] text-[#E8DCC4]"
            >
              {dictionary.hero.firstName.toUpperCase()} {dictionary.hero.lastName.toUpperCase()}
            </h1>
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-10px)] flex-col px-6 pb-7 pt-6 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={`Switch language to ${dictionary.switchLabel}`}
              className="font-utility text-[12px] tracking-[0] text-[#E8DCC4] underline decoration-[11%]"
            >
              <span data-scramble-label>{dictionary.switchLabel}</span>
            </button>
            <span data-scramble-label className="font-utility text-[12px] text-[#736343]">PORTFOLIO</span>
          </div>

          <div className="mt-5 border-b border-[#3B342A]" />

          <div className="mt-12 grid grid-cols-1 gap-6">
            {dictionary.info.map((item) => (
              <div key={item.label} className="font-utility">
                <p data-scramble-label className="text-[13px] text-[#736343]">{item.label}</p>
                <p data-scramble-label className="mt-1 text-[13px] text-[#E8DCC4]">{item.value}</p>
              </div>
            ))}
          </div>

          <h1 className="font-display mt-auto text-[19vw] leading-[0.95] tracking-[-0.02em] text-[#E8DCC4]">
            {dictionary.hero.firstName.toUpperCase()} {dictionary.hero.lastName.toUpperCase()}
          </h1>

          <div className="mt-10 border-b border-[#3B342A]" />
        </section>

        <section className="py-10 lg:py-14">
          <div className="px-[2.0856%]">
            <p
              ref={aboutIntroLeadRef}
              className="mt-8 max-w-[980px] text-balance text-[clamp(16px,1.02vw,19px)] leading-[1.65] text-[#7B6F5A] lg:max-w-[1120px]"
            >
              <span className="text-[#E8DCC4]">{dictionary.aboutSection.introLines[0]}</span>{" "}
              <span className="text-[#7B6F5A]">{dictionary.aboutSection.introLines[1]}</span>
            </p>

            <div id="about" className="h-0 translate-y-14 scroll-mt-28" />

            <div data-scramble-group className="mt-28 flex items-center gap-4 font-utility text-[13px] tracking-[0] text-[#7B6F5A] lg:mt-36 lg:ml-[5.4%]">
              <span data-scramble-label className="text-[#E8DCC4]">{aboutNavItem?.index ?? "01"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{aboutNavItem?.label ?? "ABOUT"}</span>
            </div>

            <div ref={aboutPinRef} className="mt-20 lg:mt-40">
              <h2
                ref={aboutHeadlineRef}
                className="font-display mx-auto max-w-[760px] px-[0.1%] text-left text-[clamp(28px,2.7vw,48px)] leading-[1.08] tracking-[-0.02em] text-[#E8DCC4]"
              >
                {dictionary.aboutSection.statementLines.map((line) => (
                  <span key={line} data-about-line className="block will-change-transform">
                    {line}
                  </span>
                ))}
              </h2>

              <div
                ref={aboutDetailsRef}
                className="mt-28 will-change-transform lg:mt-12 lg:grid lg:grid-cols-[1fr_1px_0.86fr] lg:gap-12 lg:pl-[20.2%]"
              >
                <div
                  data-about-detail-left
                  className="space-y-7 text-[clamp(16px,0.98vw,18px)] leading-[1.78] text-[#7B6F5A] will-change-transform"
                >
                  {dictionary.aboutSection.storyParagraphs.map((paragraph) => (
                    <p key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div
                  data-about-detail-separator
                  className="my-10 hidden bg-[#3B342A] will-change-transform lg:block"
                />

                <div
                  data-about-detail-right
                  className="space-y-9 text-[clamp(16px,0.98vw,18px)] leading-[1.6] text-[#D7CCB4] will-change-transform lg:pt-4"
                >
                  <div>
                    <p data-scramble-label className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                      {dictionary.aboutSection.currentlyLabel}
                    </p>
                    <p className="mt-2 max-w-[470px]">{dictionary.aboutSection.currentlyValue}</p>
                  </div>

                  <div>
                    <p data-scramble-label className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                      {dictionary.aboutSection.stackLabel}
                    </p>
                    <p className="mt-2 max-w-[520px]">
                      {dictionary.aboutSection.stackItems.join(" · ")}
                    </p>
                  </div>

                  <div>
                    <p data-scramble-label className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                      {dictionary.aboutSection.toolingLabel}
                    </p>
                    <p className="mt-2 max-w-[520px]">
                      {dictionary.aboutSection.toolingItems.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          ref={servicesSectionRef}
          className="scroll-mt-28 pb-20 pt-10 lg:min-h-[72vh] lg:pb-28 lg:pt-10"
        >
          <div className="px-6 lg:px-[9.0856%]">
            <div data-scramble-group className="flex items-center gap-4 font-utility text-[13px] tracking-[0] text-[#7B6F5A] lg:ml-[-1.6%]">
              <span data-scramble-label className="text-[#E8DCC4]">{servicesNavItem?.index ?? "02"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{servicesNavItem?.label ?? "SERVICES"}</span>
            </div>
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
            <div data-scramble-group className="flex items-center gap-4 font-utility text-[13px] tracking-[0] text-[#7B6F5A] lg:ml-[-1.6%]">
              <span data-scramble-label className="text-[#E8DCC4]">{indexNavItem?.index ?? "03"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{indexNavItem?.label ?? "INDEX"}</span>
            </div>
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
            <div data-scramble-group className="flex items-center gap-4 font-utility text-[13px] tracking-[0] text-[#7B6F5A] lg:ml-[-1.6%]">
              <span data-scramble-label className="text-[#E8DCC4]">{contactNavItem?.index ?? "04"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{contactNavItem?.label ?? "CONTACT"}</span>
            </div>
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
