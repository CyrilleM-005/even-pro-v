// types/Event.ts
export type AppEvent = {
    id: number;
    titre: string;
    description: string;
    date: string | Date;
    image?: string;
    lieu?: string;
    categorie: string;
    capacite_max: number;
    created_at: string | Date;
    updated_at: string | Date;
    inscriptions_count: number;
}
