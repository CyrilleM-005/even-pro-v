// utils/formatDate.ts
export function formatDate(
    date: string | Date,
    {
        locale = "fr-FR",
        withTime = false,
        timeZone,
        options = {},
    }: {
        locale?: string;
        withTime?: boolean;
        timeZone?: "UTC" | string;
        options?: Intl.DateTimeFormatOptions;
    } = {}
    ): string {
    const d = typeof date === "string" ? new Date(date) : date;

    if (isNaN(d.getTime())) {
        return "Date invalide";
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        ...(withTime && {
        hour: "2-digit",
        minute: "2-digit",
        }),
        ...(timeZone && { timeZone }),
    };

    return new Intl.DateTimeFormat(locale, {
        ...defaultOptions,
        ...options,
    }).format(d);
}


// Exemple 

formatDate("2025-12-21T14:00:00.000000Z");
// → 21 décembre 2025

formatDate("2025-12-21T14:00:00.000000Z", { withTime: true });
// → 21 décembre 2025 à 15:00

formatDate("2025-12-21T14:00:00.000000Z", {
    withTime: true,
    timeZone: "UTC",
});
// → 21 décembre 2025 à 14:00
