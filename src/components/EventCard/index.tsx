import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { formatDateObject, getBadgeConfig, getDateStatus } from "../../utils/DateHelper";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: {
    id: number;
    titre: string;
    date: string;
    lieu?: string;
    categorie?: string;
    capacite_max?: number;
    inscriptions_count?: number;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const { id, titre, date, lieu, capacite_max, inscriptions_count } = event;
  
  const dateStatus = getDateStatus(date);
  const { day, monthShort, time } = formatDateObject(date);
  const { label, className } = getBadgeConfig(dateStatus);
  
  // Calcul des places restantes
  const placesRestantes = capacite_max && inscriptions_count 
    ? capacite_max - inscriptions_count 
    : null;
  const isComplet = placesRestantes !== null && placesRestantes <= 0;

  // Image épurée avec seed basé sur l'ID
  const imageUrl = `https://picsum.photos/seed/event-${id}/600/300`;

  return (
    <article className="group">
      <Link
        to={`/evenement/${id}`}
        className="block bg-base-100 mb-2 rounded-xl border border-base-300 hover:border-base-400 transition-all duration-200 hover:shadow-sm overflow-hidden"
      >
        {/* Image épurée */}
        <div className="relative h-40 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={imageUrl}
            alt={titre}
            loading="lazy"
          />
          
          {/* Overlay léger sur l'image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
          
          {/* Badge de statut en haut à gauche */}
          <span className={`absolute top-3 left-3 badge badge-sm ${className} px-2 py-1 backdrop-blur-sm`}>
            {label}
          </span>
          
          {/* Indicateur de places restantes en haut à droite */}
          {capacite_max !== undefined && (
            <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded backdrop-blur-sm ${
              isComplet 
                ? 'bg-error/20 text-error' 
                : 'bg-success/20 text-success'
            }`}>
              {isComplet ? 'Complet' : `${placesRestantes} places`}
            </span>
          )}
        </div>

        {/* Contenu de la carte */}
        <div className="p-4">
          {/* Titre */}
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {titre}
          </h3>

          {/* Infos essentielles */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-base-content">
              <Calendar size={14} className="text-base-content/60" />
              <span>{day} {monthShort} • {time}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-base-content">
              <MapPin size={14} className="text-base-content/60" />
              <span className="line-clamp-1">{lieu}</span>
            </div>
          </div>

          {/* CTA minimaliste */}
          <div className="flex items-center justify-between pt-3 border-t border-base-300">
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <Users size={14} />
              <span>{inscriptions_count || 0}/{capacite_max} participants</span>
            </div>
            
            <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
              <span>Détails</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default EventCard;