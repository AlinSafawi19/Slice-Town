"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { InViewReveal } from "./InViewReveal";
import { TestimonialItem } from "./TestimonialItem";

const DESKTOP_MEDIA_QUERY = "(min-width: 1200px)";

type DragBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type DragSession = {
  item: HTMLElement;
  startPointerX: number;
  startPointerY: number;
  startOffsetX: number;
  startOffsetY: number;
  bounds: DragBounds;
};

export function TestimonialsList() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const dragSessionRef = useRef<DragSession | null>(null);
  const itemOffsetsRef = useRef(new Map<HTMLElement, { x: number; y: number }>());
  const [canDrag, setCanDrag] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const update = () => setCanDrag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const setOffsetVars = useCallback((el: HTMLElement | null, x: number, y: number) => {
    if (!el) return;
    el.style.setProperty("--home-testimonials-drag-x", `${x}px`);
    el.style.setProperty("--home-testimonials-drag-y", `${y}px`);
  }, []);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const finishDrag = useCallback(() => {
    dragSessionRef.current = null;
    setDragging(false);
  }, []);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!canDrag || e.button !== 0) return;
      const listEl = listRef.current;
      if (!listEl) return;

      const dragItem = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-testimonial-drag-id]",
      );
      if (!dragItem || !listEl.contains(dragItem)) return;

      const startOffset = itemOffsetsRef.current.get(dragItem) ?? { x: 0, y: 0 };
      const boundsRect = listEl.getBoundingClientRect();
      const itemRect = dragItem.getBoundingClientRect();

      dragSessionRef.current = {
        item: dragItem,
        startPointerX: e.clientX,
        startPointerY: e.clientY,
        startOffsetX: startOffset.x,
        startOffsetY: startOffset.y,
        bounds: {
          minX: boundsRect.left - itemRect.left + startOffset.x,
          maxX: boundsRect.right - itemRect.right + startOffset.x,
          minY: boundsRect.top - itemRect.top + startOffset.y,
          maxY: boundsRect.bottom - itemRect.bottom + startOffset.y,
        },
      };
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [canDrag],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!canDrag || !dragSessionRef.current) return;
      const session = dragSessionRef.current;
      const dx = e.clientX - session.startPointerX;
      const dy = e.clientY - session.startPointerY;
      const nextX = clamp(
        session.startOffsetX + dx,
        session.bounds.minX,
        session.bounds.maxX,
      );
      const nextY = clamp(
        session.startOffsetY + dy,
        session.bounds.minY,
        session.bounds.maxY,
      );

      setOffsetVars(session.item, nextX, nextY);
      itemOffsetsRef.current.set(session.item, { x: nextX, y: nextY });
    },
    [canDrag, setOffsetVars],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      finishDrag();
    },
    [finishDrag],
  );

  return (
    <div
      ref={listRef}
      className={[
        "home-testimonials-list",
        canDrag ? "home-testimonials-list--draggable" : "",
        dragging ? "home-testimonials-list--dragging" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onLostPointerCapture={finishDrag}
    >
      <div className="home-testimonials-list-inner home-testimonials-list-inner--start">
        <div className="home-testimonial-draggable-item" data-testimonial-drag-id="first">
          <TestimonialItem
            quote="I'm not usually a dessert person, but that Nutella pizza changed my life. Unreal!"
            author="Sneha T., New york"
          />
        </div>
        <InViewReveal
          className="home-testimonial-wrap-reveal"
          rootMargin="0px"
          threshold={0.1}
        >
          <div
            className="home-testimonial-wrap home-testimonial-draggable-item"
            data-testimonial-drag-id="second"
          >
            <div className="home-testimonial-wrap-tape" aria-hidden />
            <div className="home-testimonial-wrap-item">
              <div className="home-testimonial-wrap-item-bg" aria-hidden />
              <p className="type-body home-testimonial-wrap-quote">
                The best crust in town - crispy on the outside, soft inside. I
                dream about their Paneer Tandoori pizza!
              </p>
              <p className="type-text-small home-testimonial-wrap-author">
                Mark, Vermont
              </p>
            </div>
          </div>
        </InViewReveal>
      </div>
      <div className="home-testimonials-center">
        <InViewReveal
          className="home-testimonials-center-image-reveal"
          rootMargin="0px"
          threshold={0.1}
        >
          <div
            className="home-testimonials-center-image-wrap home-testimonial-draggable-item"
            data-testimonial-drag-id="center-image"
          >
            <div className="home-testimonials-center-image-tape" aria-hidden />
            <div className="home-testimonials-center-image" aria-hidden />
          </div>
        </InViewReveal>
        <InViewReveal
          className="home-testimonials-center-note-reveal"
          rootMargin="0px"
          threshold={0.1}
        >
          <div
            className="home-testimonials-center-note home-testimonial-draggable-item"
            data-testimonial-drag-id="center-note"
          >
            <div className="home-testimonials-center-note-bg" aria-hidden />
            <p className="type-body home-testimonials-center-note-quote">
              Tried the BBQ Chicken Blaze and now I can't go back to regular
              pizza. It's dangerously good.
            </p>
            <p className="type-text-small home-testimonials-center-note-author">
              Amanda Reed., Tokyo
            </p>
          </div>
        </InViewReveal>
      </div>
      <div className="home-testimonials-list-inner home-testimonials-list-inner--end">
        <InViewReveal
          className="home-testimonial-right-item-reveal"
          rootMargin="0px"
          threshold={0.1}
        >
          <div
            className="home-testimonial-right-item home-testimonial-draggable-item"
            data-testimonial-drag-id="third"
          >
            <div className="home-testimonial-right-item-bg" aria-hidden />
            <div className="home-testimonial-right-item-tape" aria-hidden />
            <p className="type-body home-testimonial-right-item-quote">
              Fast delivery, super fresh, and piping hot! Their combo meal is a
              weekend ritual for me.
            </p>
            <p className="type-text-small home-testimonial-right-item-author">
              Billy Vasquez., California
            </p>
          </div>
        </InViewReveal>
        <InViewReveal
          className="home-testimonials-end-wrap-reveal"
          rootMargin="0px"
          threshold={0.1}
        >
          <div className="home-testimonials-end-wrap">
            <div
              className="home-testimonials-end-image-wrap home-testimonial-draggable-item"
              data-testimonial-drag-id="right-image"
            >
              <div className="home-testimonials-end-image-pin" aria-hidden />
              <div className="home-testimonials-end-image" aria-hidden />
            </div>
          </div>
        </InViewReveal>
      </div>
    </div>
  );
}
