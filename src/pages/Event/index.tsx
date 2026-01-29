import { useEffect, useState } from "react";
import EventsBox from "../../components/EventsBox";
import PageError from "../../components/PageError";
import type { AppEvent } from "../../types/AppEvent";
const url = "https://api.react.nos-apps.com/api/groupe-9/evenements";

const Event = () => {
  const [data, setData] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        // erreur HTTP (404, 500...)
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}`);
        }

        const json = await res.json();

        // on récupère data de l’objet
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-4 mb-4">
      {/* <FilterSecction /> */}
      {!loading && error && (
        // <p className="col-span-full text-error">Une erreur est survenue 😕</p>
        <PageError 
          error={error}
          errorTitle={'Impossible de charger les évenements'}
          errorDescription={'Verifiez votre acces a internet et réessayez '}
          buttonContent="Réessayer"
          redirectTo={'/evenement'}
          />
      )}
      <EventsBox events={data} loading={loading} error={!!error} />
    </div>
  );
};

export default Event;
