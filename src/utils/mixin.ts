export const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const randomNumber = (max: number) => Math.floor(Math.random() * max) + 1;

export const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const formatCurrencyNumber = (number: number): string =>
  `${number}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

export const getCurrentTheme = () => {
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  }

  return "light";
};

export const isFunction = (value: unknown): value is Function => typeof value === "function";

export const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const isProduction = () => !isDevelopment();

export const openInNewTab = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
