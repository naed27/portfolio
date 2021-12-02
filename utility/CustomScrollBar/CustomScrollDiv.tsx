import React, { useState, useCallback, useEffect, useRef } from "react";
import styles from "./CustomScrollDiv.module.scss";

const SCROLL_BOX_MIN_HEIGHT = 20;

export default function CustomScrollDiv({ children, className, ...restProps }:{children: React.ReactNode, className?: string}) {
  const [hovering, setHovering] = useState(false);
  const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT);
  const [scrollThumbTopCoordinate, setScrollThumbTopCoordinate] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const scrollHostRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = useCallback(() => !hovering && setHovering(true), [hovering]);
  const handleMouseOut = useCallback(() => !!hovering && setHovering(false), [hovering]);

  const handleDocumentMouseUp = useCallback(
    e => {
      if (isDragging) {
        e.preventDefault();
        setDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
    event => {
      if (isDragging) {
        event.preventDefault();
        event.stopPropagation();
        if(!scrollHostRef.current) return;
        
        const scrollHostElement = scrollHostRef.current;
        const { scrollHeight, offsetHeight } = scrollHostElement;

        const deltaY = event.clientY - lastScrollThumbPosition;
        const percentage = deltaY * (scrollHeight / offsetHeight);
        const scrollTopLimit = offsetHeight - scrollBoxHeight;
        const scrollBottomLimit = 0;
        const newThumbPosition = scrollThumbTopCoordinate + deltaY

        setScrollThumbPosition(event.clientY);
        setScrollThumbTopCoordinate(
          Math.min(
            scrollTopLimit,
            Math.max(
              newThumbPosition,
              scrollBottomLimit
            )
          )
        );
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollThumbTopCoordinate]
  );

  const handleScrollThumbMouseDown = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
    console.log("handleScrollThumbMouseDown");
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    const scrollHostElement = scrollHostRef.current;
    if(!scrollHostElement) return;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

    let newTop =
      (parseInt(`${scrollTop}`, 10) / parseInt(`${scrollHeight}`, 10)) * offsetHeight;
    // newTop = newTop + parseInt(scrollTop, 10);
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollThumbTopCoordinate(newTop);
  }, [ scrollBoxHeight, scrollHostRef ]);

  useEffect(() => {
    const scrollHostElement = scrollHostRef.current;
    if(!scrollHostElement) return;
    const { clientHeight, scrollHeight } = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      scrollThumbPercentage * clientHeight,
      SCROLL_BOX_MIN_HEIGHT
    );
    setScrollBoxHeight(scrollThumbHeight);
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return function cleanup() {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, [ scrollHostRef, handleScroll ]);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <div
      className={styles.scrollhostContainer}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div
        ref={scrollHostRef}
        className={`${styles.scrollhost} ${className}`}
        {...restProps}
      >
        {children}
      </div>
      <div className={styles.scrollBar} style={{ opacity: hovering ? 1 : 0 }}>
        <div
          className={styles.scrollThumb}
          style={{ height: scrollBoxHeight, top: scrollThumbTopCoordinate }}
          onMouseDown={handleScrollThumbMouseDown}
        />
      </div>
    </div>
  );
}
