export const HorizontalScroll = (e: React.WheelEvent<HTMLDivElement>) => {
  const strength = Math.abs(e.deltaY);
  if (e.deltaY === 0) return;
  const el = e.currentTarget;
  if (
    !(el.scrollLeft === 0 && e.deltaY < 0) &&
    !(
      el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
      e.deltaY > 0
    )
  ) {
    e.preventDefault();
  }
  el.scrollTo({
    left: el.scrollLeft + e.deltaY,
    // large scrolls with smooth animation behavior will lag, so switch to auto
    behavior: strength > 70 ? "auto" : "smooth",
  });
};
