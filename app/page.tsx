"use client"

import Link from "next/link"
import type { MouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { SplitText } from "gsap/SplitText"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { LenisScrollSync, getLenis } from "@/components/motion/lenis-scroll-sync"
import { ProjectsShowcase, SHOWCASE_PHONE_COUNT } from "@/components/three/projects-showcase"
import { dictionaries, type Locale } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrambleTextPlugin, SplitText)

// Brand marks for the contact channels, keyed by the channel label in the
// dictionary. Drawn with currentColor so they inherit the link color + hover.
const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.44-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  ),
  GitHub: (
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.61-.02 2.9-.02 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  ),
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileNavBrandRef = useRef<HTMLAnchorElement>(null)
  const mobileHeroNameRef = useRef<HTMLHeadingElement>(null)
  const aboutIntroLeadRef = useRef<HTMLParagraphElement>(null)
  const aboutHeadlineRef = useRef<HTMLHeadingElement>(null)
  const aboutPinRef = useRef<HTMLDivElement>(null)
  const aboutDetailsRef = useRef<HTMLDivElement>(null)
  const heroNameRef = useRef<HTMLHeadingElement>(null)
  const navBrandRef = useRef<HTMLAnchorElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesLeadRef = useRef<HTMLParagraphElement>(null)
  const projectsTrackRef = useRef<HTMLDivElement>(null)
  const projectsCaptionLabelRef = useRef<HTMLSpanElement>(null)
  const projectsCaptionIndexRef = useRef<HTMLSpanElement>(null)
  const projectsProgressRef = useRef<number>(0)
  const projectsActiveIndexRef = useRef<number>(-1)
  const dictionary = dictionaries[locale]
  const isSpanish = locale === "es"
  const aboutNavItem = dictionary.topNav.find((item) => item.href === "#about")
  const servicesNavItem = dictionary.topNav.find((item) => item.href === "#services")
  const projectsNavItem = dictionary.topNav.find((item) => item.href === "#projects")
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

  // A fast, deliberate pull back to the very top that scrolls through every
  // section rather than teleporting. Duration is fixed, so from far down the
  // page it reads as a quick "drag up".
  function handleBackToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    const clearHash = () => {
      window.history.replaceState(null, "", window.location.pathname + window.location.search)
    }

    // Drive the scroll through Lenis so it works the same on touch devices,
    // where animating window.scrollTo directly fights Lenis' own rAF loop and
    // leaves the button doing nothing. Fall back to GSAP if Lenis isn't ready.
    const lenis = getLenis()
    if (lenis) {
      gsap.killTweensOf(window)
      lenis.scrollTo(0, {
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: clearHash,
      })
      return
    }

    gsap.killTweensOf(window)

    gsap.to(window, {
      duration: 0.9,
      ease: "power3.inOut",
      scrollTo: {
        y: 0,
        autoKill: true,
      },
      onComplete: clearHash,
    })
  }

  // Mobile-only nav handler for the dropdown menu. Closes the menu, then routes
  // the scroll through Lenis (with a fallback to GSAP) so it behaves the same on
  // touch devices, leaving room under the ~57px sticky bar via the offset.
  function handleMobileNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    setMenuOpen(false)

    if (!href.startsWith("#")) {
      return
    }

    const target = document.querySelector<HTMLElement>(href)
    if (!target) {
      return
    }

    const finish = () => {
      window.history.replaceState(null, "", href)
    }

    const lenis = getLenis()
    if (lenis) {
      gsap.killTweensOf(window)
      lenis.scrollTo(target, {
        offset: -64,
        duration: 1.0,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: finish,
      })
      return
    }

    gsap.killTweensOf(window)
    gsap.to(window, {
      duration: 1.0,
      ease: "power3.out",
      scrollTo: {
        y: target,
        offsetY: 64,
        autoKill: true,
      },
      onComplete: finish,
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

  // Mobile mirror of the desktop brand-stick behavior: once the big hero name
  // scrolls out of view, the brand fades into the sticky top bar. Scoped to
  // sub-lg widths via matchMedia so it never touches the desktop experience.
  useEffect(() => {
    const heroName = mobileHeroNameRef.current
    const navBrand = mobileNavBrandRef.current

    if (!heroName || !navBrand) {
      return
    }

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add("(max-width: 1023px)", () => {
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
          start: "bottom top+=57",
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

        return () => {
          trigger.kill()
        }
      })
    })

    return () => {
      media.revert()
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

    // Re-capture each label's source text on every run. This effect re-runs on
    // locale change, by which point React has already swapped the DOM text to
    // the new language — refreshing the cached original makes labels scramble
    // to the current language instead of the value captured on first mount.
    labels.forEach((label) => {
      label.dataset.scrambleOriginal = label.textContent ?? ""
    })

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

  useEffect(() => {
    const lead = servicesLeadRef.current
    if (!lead) {
      return
    }

    const context = gsap.context(() => {
      const split = new SplitText(lead, { type: "lines", linesClass: "services-lead-line" })

      gsap.set(split.lines, {
        autoAlpha: 0,
        yPercent: 100,
      })

      gsap.to(split.lines, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: lead,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      return () => {
        split.revert()
      }
    }, lead)

    return () => {
      context.revert()
    }
  }, [locale])

  useEffect(() => {
    const section = servicesSectionRef.current
    if (!section) {
      return
    }

    const rows = Array.from(section.querySelectorAll<HTMLElement>("[data-service-row]"))
    if (!rows.length) {
      return
    }

    const context = gsap.context(() => {
      rows.forEach((row) => {
        const line = row.querySelector<HTMLElement>("[data-service-line]")
        const meta = row.querySelector<HTMLElement>("[data-service-meta]")
        const title = row.querySelector<HTMLElement>("[data-service-title]")
        const description = row.querySelector<HTMLElement>("[data-service-desc]")
        const capabilities = row.querySelectorAll<HTMLElement>("[data-service-cap]")

        // Each row assembles itself as it scrolls into view. Reveal-once
        // (no reverse) so coming back from Index doesn't re-hide and glitch,
        // matching the About headline's note.
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: row,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        })

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" })
          timeline.to(line, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0)
        }

        if (meta) {
          gsap.set(meta, { autoAlpha: 0, x: -16 })
          timeline.to(meta, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.08)
        }

        if (title) {
          gsap.set(title, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)", x: -18 })
          timeline.to(
            title,
            {
              autoAlpha: 1,
              clipPath: "inset(0 0% 0 0)",
              x: 0,
              duration: 0.72,
              clearProps: "clipPath,transform",
            },
            0.12,
          )
        }

        if (description) {
          gsap.set(description, { autoAlpha: 0, y: 16 })
          timeline.to(description, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.24)
        }

        if (capabilities.length) {
          gsap.set(capabilities, { autoAlpha: 0, y: 12, scale: 0.96 })
          timeline.to(
            capabilities,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.05,
              clearProps: "transform",
            },
            0.3,
          )
        }
      })
    }, section)

    return () => {
      context.revert()
    }
  }, [locale])

  useEffect(() => {
    const track = projectsTrackRef.current
    if (!track) {
      return
    }

    const labelEl = projectsCaptionLabelRef.current
    const indexEl = projectsCaptionIndexRef.current

    // The carousel is driven by the scroll position of the tall track section.
    // Progress runs from 0 (first phone center stage) to 1 (last phone) as the
    // pinned canvas scrubs through the track. The 3D scene reads
    // projectsProgressRef.current every frame via useFrame.
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.65,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        projectsProgressRef.current = self.progress

        const activeIndex = Math.min(
          SHOWCASE_PHONE_COUNT - 1,
          Math.max(0, Math.round(self.progress * (SHOWCASE_PHONE_COUNT - 1))),
        )

        if (activeIndex !== projectsActiveIndexRef.current) {
          projectsActiveIndexRef.current = activeIndex
          if (labelEl) {
            labelEl.textContent = `${dictionary.projectsSection.screenLabel} ${String(activeIndex + 1).padStart(2, "0")} / ${String(
              SHOWCASE_PHONE_COUNT,
            ).padStart(2, "0")}`
          }
          if (indexEl) {
            indexEl.textContent = String(activeIndex + 1).padStart(2, "0")
          }
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [locale, dictionary.projectsSection.screenLabel])

  return (
    <div className="min-h-screen bg-[#0B0B0B] p-1 text-[#E8DCC4]">
      <LenisScrollSync />

      <div className="mx-auto min-h-[calc(100vh-8px)] w-full max-w-465 bg-[#0B0B0B]">
        <div className="sticky top-0 z-50 hidden bg-[#0B0B0B]/95 lg:block">
          <div className="mx-[4.55%] flex min-h-18 items-center justify-between border-b border-[#3B342A]">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={`${dictionary.switchAria} ${dictionary.switchLabel}`}
              className="font-utility text-[12px] tracking-normal text-[#E8DCC4] underline decoration-[11%] underline-offset-1 transition-colors hover:text-white"
            >
              <span data-scramble-label>{dictionary.switchLabel}</span>
            </button>

            <a
              ref={navBrandRef}
              href="#page-00"
              onClick={(event) => handleNavClick(event, "#page-00")}
              className="invisible absolute left-1/2 -translate-x-1/2 font-display text-[clamp(20px,1.32vw,30px)] tracking-tight text-[#E8DCC4]/95 opacity-0 transition-colors hover:text-white"
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
                      className={`flex h-7.5 items-center justify-center whitespace-nowrap px-2 font-utility text-[12px] tracking-normal text-[#E8DCC4] transition-colors hover:text-white ${
                        isSpanish && item.index === "01" ? "min-w-27.5" : "min-w-23.5"
                      }`}
                    >
                      <span data-scramble-label className="mr-1.5 text-[14px] text-[#736343]">{item.index}</span>
                      <span data-scramble-label>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <section id="page-00" className="relative hidden min-h-[calc(100vh-10px)] lg:block">
          <div className="absolute inset-0 -translate-y-11">
            <div className="absolute left-[4.5718%] right-[4.5139%] top-[95.0761%] border-b border-[#3B342A]" />

            <span className="pointer-events-none absolute left-[14.294%] top-[15.7565%] h-5 w-5 border-l border-t border-[#D0C2A8]/85" />
            <span className="pointer-events-none absolute right-[13.1944%] top-[15.7565%] h-5 w-5 border-r border-t border-[#D0C2A8]/85" />
            <span className="pointer-events-none absolute bottom-[15.7565%] left-[14.294%] h-5 w-5 border-b border-l border-[#D0C2A8]/85" />
            <span className="pointer-events-none absolute bottom-[15.7565%] right-[13.1944%] h-5 w-5 border-b border-r border-[#D0C2A8]/85" />

            <section className="absolute left-[9.7222%] right-[37.6157%] top-[31.7816%] grid grid-cols-4 gap-[2.4vw]">
              {dictionary.info.map((item) => (
                <div key={item.label} className="font-utility">
                  <p data-scramble-label className="text-[14px] tracking-normal text-[#736343]">{item.label}</p>
                  <p data-scramble-label className="mt-1.5 text-[14px] tracking-normal text-[#E8DCC4]">{item.value}</p>
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

        {/* Mobile sticky top bar — mirrors the desktop nav: an always-available
            language toggle, a brand mark that pins in once the hero scrolls
            past, and a dropdown menu exposing the same nav targets. Scoped to
            lg:hidden so the desktop bar above is untouched. */}
        <div className="sticky top-0 z-50 lg:hidden">
          <div className="relative bg-[#0B0B0B]/95">
            <div className="flex min-h-14 items-center justify-between border-b border-[#3B342A] px-6">
              <button
                type="button"
                onClick={toggleLocale}
                aria-label={`${dictionary.switchAria} ${dictionary.switchLabel}`}
                className="font-utility text-[12px] tracking-normal text-[#E8DCC4] underline decoration-[11%] underline-offset-1"
              >
                <span data-scramble-label>{dictionary.switchLabel}</span>
              </button>

              <a
                ref={mobileNavBrandRef}
                href="#top"
                onClick={handleBackToTop}
                className="invisible absolute left-1/2 -translate-x-1/2 font-display text-[16px] tracking-tight text-[#E8DCC4]/95 opacity-0"
              >
                {dictionary.brand.toUpperCase()}
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label={dictionary.menuAria}
                className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
              >
                <span
                  className={`h-px w-5 bg-[#E8DCC4] transition-transform duration-300 ${
                    menuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-5 bg-[#E8DCC4] transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>

            {menuOpen && (
              <nav className="absolute inset-x-0 top-full border-b border-[#3B342A] bg-[#0B0B0B]">
                <ul className="flex flex-col px-6">
                  {dictionary.topNav.map((item) => (
                    <li key={item.index}>
                      <Link
                        href={item.href}
                        onClick={(event) => handleMobileNavClick(event, item.href)}
                        className="flex items-center gap-3 border-b border-[#3B342A]/50 py-3.5 font-utility text-[13px] tracking-normal text-[#E8DCC4] transition-colors last:border-b-0 hover:text-white"
                      >
                        <span className="text-[13px] text-[#736343]">{item.index}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <section className="flex min-h-[calc(100vh-57px)] flex-col px-6 pb-7 pt-10 lg:hidden">
          <div className="grid grid-cols-1 gap-6">
            {dictionary.info.map((item) => (
              <div key={item.label} className="font-utility">
                <p data-scramble-label className="text-[13px] text-[#736343]">{item.label}</p>
                <p data-scramble-label className="mt-1 text-[13px] text-[#E8DCC4]">{item.value}</p>
              </div>
            ))}
          </div>

          <h1
            ref={mobileHeroNameRef}
            className="font-display mt-auto text-[19vw] leading-[0.95] tracking-[-0.02em] text-[#E8DCC4]"
          >
            {dictionary.hero.firstName.toUpperCase()} {dictionary.hero.lastName.toUpperCase()}
          </h1>

          <div className="mt-10 border-b border-[#3B342A]" />
        </section>

        <section className="py-10 lg:py-14">
          <div className="px-[2.0856%]">
            <p
              key={locale}
              ref={aboutIntroLeadRef}
              className="mt-8 max-w-245 text-balance text-[clamp(16px,1.02vw,19px)] leading-[1.65] text-[#7B6F5A] lg:max-w-280"
            >
              <span className="block text-[#E8DCC4]">{dictionary.aboutSection.introLines[0]}</span>
              <span className="block text-[#7B6F5A]">{dictionary.aboutSection.introLines[1]}</span>
            </p>

            <div id="about" className="h-0 translate-y-14 scroll-mt-28" />

            <div data-scramble-group className="mt-28 flex items-center gap-4 font-utility text-[13px] tracking-normal text-[#7B6F5A] lg:mt-36 lg:ml-[5.4%]">
              <span data-scramble-label className="text-[#E8DCC4]">{aboutNavItem?.index ?? "01"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{aboutNavItem?.label ?? "ABOUT"}</span>
            </div>

            <div ref={aboutPinRef} className="mt-20 lg:mt-40">
              <h2
                ref={aboutHeadlineRef}
                className="font-display mx-auto max-w-190 px-[0.1%] text-left text-[clamp(28px,2.7vw,48px)] leading-[1.08] tracking-[-0.02em] text-[#E8DCC4]"
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
                    <p className="mt-2 max-w-117.5">{dictionary.aboutSection.currentlyValue}</p>
                  </div>

                  <div>
                    <p data-scramble-label className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                      {dictionary.aboutSection.stackLabel}
                    </p>
                    <p className="mt-2 max-w-130">
                      {dictionary.aboutSection.stackItems.join(" · ")}
                    </p>
                  </div>

                  <div>
                    <p data-scramble-label className="font-utility text-[12px] tracking-[0.08em] text-[#4B4335]">
                      {dictionary.aboutSection.toolingLabel}
                    </p>
                    <p className="mt-2 max-w-130">
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
          className="scroll-mt-28 pb-24 pt-10 lg:pb-36 lg:pt-16"
        >
          <div className="px-6 lg:px-[9.0856%]">
            <div data-scramble-group className="flex items-center gap-4 font-utility text-[13px] tracking-normal text-[#7B6F5A] lg:ml-[-1.6%]">
              <span data-scramble-label className="text-[#E8DCC4]">{servicesNavItem?.index ?? "02"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{servicesNavItem?.label ?? "SERVICES"}</span>
            </div>

            <p
              key={locale}
              ref={servicesLeadRef}
              className="mt-10 max-w-230 text-balance text-[clamp(20px,1.7vw,30px)] leading-[1.4] tracking-[-0.01em] text-[#7B6F5A] lg:mt-12 lg:ml-[8.2%]"
            >
              {dictionary.servicesSection.lead}
            </p>

            <div className="mt-16 lg:mt-28">
              {dictionary.servicesSection.items.map((item, index) => (
                <article
                  key={item.title}
                  data-service-row
                  data-scramble-group
                  className="group relative grid grid-cols-1 gap-6 border-t border-[#3B342A] py-9 will-change-transform last:border-b lg:grid-cols-[110px_minmax(0,1fr)_minmax(0,330px)] lg:gap-12 lg:py-12"
                >
                  <span
                    data-service-line
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#5A5040]"
                  />

                  <div data-service-meta className="flex items-baseline gap-4 will-change-transform lg:flex-col lg:gap-5">
                    <span data-scramble-label className="font-utility text-[14px] text-[#736343]">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <span data-scramble-label className="font-utility text-[11px] tracking-[0.14em] text-[#4B4335]">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3
                      data-service-title
                      className="font-display text-[clamp(24px,2.1vw,34px)] leading-[1.12] tracking-[-0.015em] text-[#E8DCC4] transition-colors duration-300 will-change-transform group-hover:text-white"
                    >
                      {item.title}
                    </h3>
                    <p
                      data-service-desc
                      className="mt-4 max-w-140 text-[clamp(15px,0.98vw,17px)] leading-[1.7] text-[#7B6F5A] will-change-transform"
                    >
                      {item.description}
                    </p>
                  </div>

                  <ul className="flex flex-wrap content-start gap-x-2.5 gap-y-2.5 font-utility text-[12px] tracking-[0.02em] lg:justify-end">
                    {item.capabilities.map((capability) => (
                      <li
                        key={capability}
                        data-service-cap
                        className="whitespace-nowrap rounded-full border border-[#3B342A] px-2.75 py-1.25 text-[#A99C87] transition-colors duration-300 will-change-transform group-hover:border-[#5A5040] group-hover:text-[#D7CCB4]"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className="mt-16 max-w-170 font-utility text-[12px] leading-[1.85] tracking-[0.04em] text-[#4B4335]">
              {dictionary.servicesSection.closingNote}
            </p>
          </div>
        </section>
        
        <section id="projects" className="scroll-mt-28 pb-12 pt-10 lg:pt-16">
          <div className="px-6 lg:px-[9.0856%]">
            <div data-scramble-group className="flex items-center gap-4 font-utility text-[13px] tracking-normal text-[#7B6F5A] lg:ml-[-1.6%]">
              <span data-scramble-label className="text-[#E8DCC4]">{projectsNavItem?.index ?? "03"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{projectsNavItem?.label ?? "PROJECTS"}</span>
            </div>
            <h2 className="font-display mt-5 text-[clamp(40px,3.85vw,64px)] leading-[1.08] tracking-[-0.02em] text-[#E8DCC4]">
              {dictionary.projectsSection.title}
            </h2>
            <p className="mt-10 max-w-190 text-balance text-[clamp(16px,1.02vw,19px)] leading-[1.65] text-[#7B6F5A] lg:mt-12 lg:ml-[8.2%]">
              {dictionary.projectsSection.lead}
            </p>
          </div>
        </section>

        <section
          ref={projectsTrackRef}
          className="relative w-full"
          style={{ height: "320vh" }}
        >
          <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-[#0B0B0B]">
            {/* Push the eyebrow row below the sticky page navbar (desktop)
                — on mobile there is no navbar so we only need a small inset. */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-7 lg:px-[9.0856%] lg:pt-26">
              <div data-scramble-group className="flex items-baseline gap-4 font-utility text-[12px] tracking-[0.14em] text-[#7B6F5A]">
                <span data-scramble-label className="text-[#E8DCC4]">
                  {dictionary.projectsSection.project.kicker}
                </span>
                <span className="h-px w-10 bg-[#3B342A]" />
                <span data-scramble-label>{dictionary.projectsSection.eyebrow}</span>
              </div>
              <div className="hidden text-right font-utility text-[12px] tracking-[0.14em] text-[#4B4335] lg:block">
                <span ref={projectsCaptionLabelRef}>{dictionary.projectsSection.screenLabel} 01 / {String(SHOWCASE_PHONE_COUNT).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Canvas bounds are responsive: mobile needs less top inset (no
                navbar) and more bottom inset (the stacked caption block is
                taller); desktop reserves the navbar height up top and a
                shorter caption block at the bottom. */}
            <div className="absolute inset-x-0 top-16 bottom-75 lg:top-35 lg:bottom-47.5">
              <ProjectsShowcase progressRef={projectsProgressRef} />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 grid grid-cols-1 gap-6 px-6 pb-12 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-12 lg:px-[9.0856%] lg:pb-16">
              <div className="max-w-105">
                <p className="font-utility text-[11px] tracking-[0.18em] text-[#4B4335]">
                  {dictionary.projectsSection.project.role}
                </p>
                <h3 className="font-display mt-3 text-[clamp(24px,2.1vw,34px)] leading-[1.1] tracking-[-0.015em] text-[#E8DCC4]">
                  {dictionary.projectsSection.project.name}
                </h3>
                <p className="font-utility mt-3 text-[12px] tracking-[0.12em] text-[#736343]">
                  {dictionary.projectsSection.project.period}
                </p>
              </div>

              <div className="hidden flex-col items-center font-utility text-[11px] tracking-[0.2em] text-[#4B4335] lg:flex">
                <span className="font-display text-[clamp(40px,3vw,56px)] leading-none tracking-[-0.02em] text-[#E8DCC4]/85">
                  <span ref={projectsCaptionIndexRef}>01</span>
                </span>
                <span className="mt-2">{dictionary.projectsSection.project.scrollHint.toUpperCase()}</span>
              </div>

              <div className="max-w-105 lg:ml-auto lg:text-right">
                <p className="text-[clamp(14px,0.95vw,16px)] leading-[1.65] text-[#7B6F5A]">
                  {dictionary.projectsSection.project.summary}
                </p>
              </div>
            </div>

            <span className="pointer-events-none absolute left-[4.5%] top-37.5 hidden h-5 w-5 border-l border-t border-[#3B342A] lg:block" />
            <span className="pointer-events-none absolute right-[4.5%] top-37.5 hidden h-5 w-5 border-r border-t border-[#3B342A] lg:block" />
            <span className="pointer-events-none absolute bottom-[8%] left-[4.5%] hidden h-5 w-5 border-b border-l border-[#3B342A] lg:block" />
            <span className="pointer-events-none absolute bottom-[8%] right-[4.5%] hidden h-5 w-5 border-b border-r border-[#3B342A] lg:block" />
          </div>
        </section>

        <section className="scroll-mt-28 py-20 lg:py-28">
          <div className="px-6 lg:px-[9.0856%]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <div>
                <p data-scramble-label className="font-utility text-[12px] tracking-[0.14em] text-[#4B4335]">
                  {dictionary.projectsSection.stackLabel}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-2.5 gap-y-2.5 font-utility text-[12px] tracking-[0.02em]">
                  {dictionary.projectsSection.project.stack.map((item) => (
                    <li
                      key={item}
                      className="whitespace-nowrap rounded-full border border-[#3B342A] px-2.75 py-1.25 text-[#A99C87]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p data-scramble-label className="font-utility text-[12px] tracking-[0.14em] text-[#4B4335]">
                  {dictionary.projectsSection.builtLabel}
                </p>
                <ul className="mt-6 divide-y divide-[#3B342A]">
                  {dictionary.projectsSection.project.features.map((feature) => (
                    <li key={feature.label} className="grid grid-cols-1 gap-3 py-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
                      <p className="font-display text-[clamp(16px,1.05vw,19px)] leading-tight tracking-[-0.01em] text-[#E8DCC4]">
                        {feature.label}
                      </p>
                      <p className="text-[clamp(14px,0.92vw,16px)] leading-[1.65] text-[#7B6F5A]">
                        {feature.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-5 border-t border-[#3B342A] pt-8 lg:mt-20 lg:pt-10">
              <span className="font-utility text-[12px] tracking-[0.14em] text-[#4B4335]">{dictionary.projectsSection.moreLabel}</span>
              <p className="max-w-155 text-[clamp(13px,0.9vw,15px)] leading-[1.65] text-[#7B6F5A]">
                {dictionary.projectsSection.expandNote}
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16 lg:py-20">
          <div className="px-6 lg:px-[9.0856%]">
            <div data-scramble-group className="flex items-center gap-4 font-utility text-[13px] tracking-normal text-[#7B6F5A] lg:ml-[-1.6%]">
              <span data-scramble-label className="text-[#E8DCC4]">{contactNavItem?.index ?? "04"}</span>
              <span className="h-px w-14 bg-[#3B342A]" />
              <span data-scramble-label>{contactNavItem?.label ?? "CONTACT"}</span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              <div>
                <h2 className="font-display whitespace-pre-line text-[clamp(32px,3vw,50px)] leading-[1.03] tracking-[-0.02em] text-[#E8DCC4]">
                  {dictionary.contactSection.heading}
                </h2>
                <p className="mt-5 max-w-155 text-[clamp(13px,0.9vw,15px)] leading-[1.6] text-[#7B6F5A]">
                  {dictionary.contactSection.lead}
                </p>
                <div className="mt-6">
                  <p className="font-utility text-[12px] tracking-[0.14em] text-[#4B4335]">
                    {dictionary.contactSection.emailLabel}
                  </p>
                  <a
                    href={`mailto:${dictionary.contactSection.email}`}
                    className="font-display mt-2 inline-block text-[clamp(19px,1.5vw,26px)] leading-tight tracking-[-0.01em] text-[#E8DCC4] transition-colors hover:text-[#F5EBD3]"
                  >
                    {dictionary.contactSection.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:pt-1">
                <div>
                  <p className="font-utility text-[12px] tracking-[0.14em] text-[#4B4335]">
                    {dictionary.contactSection.availabilityLabel}
                  </p>
                  <p className="mt-2 text-[clamp(14px,0.95vw,16px)] leading-[1.6] text-[#A99C87]">
                    {dictionary.contactSection.availabilityValue}
                  </p>
                </div>

                <div>
                  <p className="font-utility text-[12px] tracking-[0.14em] text-[#4B4335]">
                    {dictionary.contactSection.channelsLabel}
                  </p>
                  <ul className="mt-3 divide-y divide-[#3B342A] border-t border-[#3B342A]">
                    {dictionary.contactSection.channels.map((channel) => (
                      <li key={channel.label}>
                        <a
                          href={channel.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between py-3 transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="h-4.5 w-4.5 shrink-0 fill-[#736343] transition-colors group-hover:fill-[#E8DCC4]"
                            >
                              {CHANNEL_ICONS[channel.label]}
                            </svg>
                            <span className="font-display text-[clamp(16px,1.05vw,19px)] tracking-[-0.01em] text-[#E8DCC4] transition-colors group-hover:text-[#F5EBD3]">
                              {channel.label}
                            </span>
                          </span>
                          <span className="font-utility text-[12px] tracking-[0.06em] text-[#736343] transition-colors group-hover:text-[#A99C87]">
                            {channel.value}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-[#3B342A] pt-6 lg:mt-14">
              <span className="font-utility text-[11px] tracking-[0.18em] text-[#4B4335]">{dictionary.contactSection.footerNote}</span>
              <a
                href="#top"
                onClick={handleBackToTop}
                className="font-utility text-[11px] tracking-[0.18em] text-[#736343] transition-colors hover:text-[#A99C87]"
              >
                {dictionary.contactSection.backToTop}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
