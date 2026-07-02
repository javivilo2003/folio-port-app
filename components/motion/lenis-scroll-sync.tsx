"use client"

import { useEffect } from "react"

import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Shared handle to the single Lenis instance so imperative scrolls (nav jumps,
// back-to-top) can go through Lenis instead of fighting it via window.scrollTo.
let activeLenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return activeLenis
}

export function LenisScrollSync() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
    })
    activeLenis = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Keep Lenis' cached scroll limit and ScrollTrigger in sync with the real
    // document height. Without this, content that grows after init (fonts,
    // the 3D canvas, or HMR edits) can leave the last section unreachable.
    const resync = () => {
      lenis.resize()
      ScrollTrigger.refresh()
    }
    const resizeObserver = new ResizeObserver(resync)
    resizeObserver.observe(document.body)
    window.addEventListener("load", resync)
    const settleTimeout = window.setTimeout(resync, 600)

    return () => {
      window.clearTimeout(settleTimeout)
      window.removeEventListener("load", resync)
      resizeObserver.disconnect()
      gsap.ticker.remove(update)
      lenis.destroy()
      if (activeLenis === lenis) {
        activeLenis = null
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}
