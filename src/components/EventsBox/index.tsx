import { EventCardSkeleton } from "../EventCard/EventCardSkeleton";
import EventCard from "../EventCard";
import type { AppEvent } from "../../types/AppEvent";
import SearchContext from "../../contexts/SearchContext";
import { useContext } from "react";

interface EventsBoxPropsType {
  events: AppEvent[];
  loading: boolean;
  error: boolean;
}

const EventsBox = ({ events, loading, error }: EventsBoxPropsType) => {
  //APPEL DU CONTEXT
  const searchContext = useContext(SearchContext);
  const { searchValue } = searchContext;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full gap-x-4 px-4 justify-center items-center">
      {/* CHARGEMENT */}
      {loading &&
        Array.from({ length: 10 }).map((_, i) => <EventCardSkeleton key={i} />)}

      {/* AFFICHAGE DES DONÉES */}
      {!loading &&
        !error &&
        events
          ?.filter(
            (val) =>
              val.titre
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ||
              val.categorie
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
          )
          .map((evnt: AppEvent) => (
            <EventCard key={evnt.id} event={{ ...evnt, date: String(evnt.date) }} />
          ))}
    </div>
  );
};

export default EventsBox;
