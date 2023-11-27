import useMediaQuery from "./useMediaQuery";

export default function useBreakpoints() {
  const breakpoints = {
    isXs: useMediaQuery("(max-width: 480px)"),
    isSm: useMediaQuery("(min-width: 480px) and (max-width: 767px)"),
    isMd: useMediaQuery("(min-width: 768px) and (max-width: 992px)"),
    isLg: useMediaQuery("(min-width: 992px) and (max-width: 1200px)"),
    isXl: useMediaQuery("(min-width: 1200px)"),
    active: "xs"
  };
  if (breakpoints.isXs) breakpoints.active = "xs";
  if (breakpoints.isSm) breakpoints.active = "sm";
  if (breakpoints.isMd) breakpoints.active = "md";
  if (breakpoints.isLg) breakpoints.active = "lg";
  if (breakpoints.isXl) breakpoints.active = "xl";
  return breakpoints;
}
