type DateStatus = "today" | "tomorrow" | "upcoming" | "past";


export function formatDateObject(
  day: string | Date,
  {
    locale = "fr-FR",
    timeZone,
    options = {},
  }: {
    locale?: string
    timeZone?: "UTC" | string
    options?: Intl.DateTimeFormatOptions
  } = {}
): { day: string; monthShort: string; time: string | null } {
  const d = typeof day === "string" ? new Date(day) : day

  if (isNaN(d.getTime())) {
    return { day : "Date invalide", monthShort: "", time: null }
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone,
    ...options,
  })

  const monthShortFormatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone,
  })

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  })

  return {
    day: dateFormatter.format(d),
    monthShort: monthShortFormatter.format(d),
    time: timeFormatter.format(d),
  }
}


export function getDateStatus(date: string | Date): DateStatus {
  const d = new Date(date);
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfTarget = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate()
  );

  const diffDays =
    (startOfTarget.getTime() - startOfToday.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  if (diffDays > 1) return "upcoming";
  return "past";
}

// ⏳ Format intelligent (Dans 2 jours, Il y a 1 jour) + i18n auto

export function formatRelativeDate(
  date: string | Date,
  locale: string = navigator.language
): string {
  const d = new Date(date);
  const now = new Date();

  const diffMs = d.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (Math.abs(diffDays) < 1) return rtf.format(0, "day");
  return rtf.format(diffDays, "day");
}

// Badge dynamique (DaisyUI / Tailwind)

export function getBadgeConfig(status: DateStatus) {
  switch (status) {
    case "today":
      return { label: "Aujourd’hui", className: "badge badge-primary font-semibold opacity-50" };
    case "tomorrow":
      return { label: "Demain", className: "badge badge-info opacity-50" };
    case "upcoming":
      return { label: "À venir", className: "badge badge-success opacity-50" };
    default:
      return { label: "Terminé", className: "badge badge-neutral opacity-50" };
  }
}
