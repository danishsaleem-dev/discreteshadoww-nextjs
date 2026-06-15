"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  /** Auto-scroll direction. */
  dir?: "left" | "right";
  /** Auto-scroll speed in px per frame (~60fps). */
  speed?: number;
};

/**
 * Turns a horizontal scroll container into a continuously auto-scrolling,
 * fully draggable "marquee" that works on both touch and mouse:
 *
 *  - Auto-scrolls in `dir` at `speed`, looping seamlessly. Requires the caller
 *    to render its items twice (the loop wraps at half the scrollWidth).
 *  - Touch: native momentum scrolling; auto-scroll pauses while the finger is
 *    down and resumes shortly after release.
 *  - Mouse: click-drag scrolls the row (native overflow doesn't drag with a
 *    mouse), and a drag suppresses the click so cards don't navigate.
 *  - Respects prefers-reduced-motion (no auto-advance, still draggable).
 */
export function useDragScroll(
  ref: RefObject<HTMLElement | null>,
  { dir = "left", speed = 0.4 }: Options = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const step = dir === "right" ? -Math.abs(speed) : Math.abs(speed);

    let raf = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let down = false; // mouse button held
    let dragging = false; // moved enough to count as a drag
    let startX = 0;
    let startScroll = 0;

    const wrap = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0) el.scrollLeft += half;
    };

    // Start "right" rows in the middle so they have room to move backwards.
    requestAnimationFrame(() => {
      if (dir === "right") el.scrollLeft = el.scrollWidth / 2;
    });

    const tick = () => {
      if (!paused && !reduce.matches) el.scrollLeft += step;
      wrap();
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => (paused = false), 1600);
    };

    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType === "mouse") {
        down = true;
        dragging = false;
        startX = e.clientX;
        startScroll = el.scrollLeft;
        el.setPointerCapture?.(e.pointerId);
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) dragging = true;
      el.scrollLeft = startScroll - dx;
      wrap();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (down) {
        down = false;
        el.releasePointerCapture?.(e.pointerId);
      }
      scheduleResume();
    };
    const onClickCapture = (e: MouseEvent) => {
      if (dragging) {
        e.preventDefault();
        e.stopPropagation();
        dragging = false;
      }
    };
    const onDragStart = (e: Event) => e.preventDefault(); // kill image ghost-drag
    const onTouchStart = () => pause();
    const onTouchEnd = () => scheduleResume();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref, dir, speed]);
}
