import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { useRegistration } from '../../contexts/RegistrationContext';
import Spiner from '../../components/Loaders/Spiner';

const MesInscriptions = () => {
  const { registeredEvents, cancelRegistration } = useRegistration();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      setLoading(true);
      
      if (registeredEvents.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Récupérer les détails de chaque événement
        const eventsData = await Promise.all(
          registeredEvents.map(async (eventId) => {
            try {
              const response = await fetch(
                `https://api.react.nos-apps.com/api/groupe-9/evenements/${eventId}`
              );
              if (response.ok) {
                const data = await response.json();
                return { ...(data.data || data), id: eventId };
              }
              return null;
            } catch {
              return null;
            }
          })
        );

        setEvents(eventsData.filter(event => event !== null));
      } catch (error) {
        console.error('Erreur chargement événements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [registeredEvents]);

  const handleCancel = async (eventId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir vous désinscrire de cet événement ?')) {
      return;
    }

    setCancellingId(eventId);
    const success = await cancelRegistration(eventId);
    
    if (success) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
    
    setCancellingId(null);
  };

  if (loading) {
    return (
      <Spiner loadContent='Chargement...'/>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 lg:py-8">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary mb-4"
        >
          <ArrowLeft size={18} />
          Retour
        </Link>
        <h1 className="text-3xl font-bold">Mes inscriptions</h1>
        <p className="text-base-content/70 mt-2">
          Retrouvez ici tous les événements auxquels vous êtes inscrit.
        </p>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-2xl border border-base-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4">
            <Calendar size={24} className="text-base-content/70" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucune inscription</h3>
          <p className="text-base-content/70 mb-6 max-w-md mx-auto">
            Vous n'êtes inscrit à aucun événement pour le moment.
          </p>
          <Link to="/" className="btn btn-primary">
            Explorer les événements
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="card-title text-lg mb-2">{event.titre}</h3>
                    <div className="space-y-2 text-sm text-base-content/70">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span className="truncate">{event.lieu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{event.inscriptions_count} participants</span>
                      </div>
                    </div>
                  </div>
                  <div className="badge badge-success badge-sm gap-1">
                    <CheckCircle size={12} />
                    Inscrit
                  </div>
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <Link 
                    to={`/evenement/${event.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Voir détails
                  </Link>
                  <button 
                    onClick={() => handleCancel(event.id)}
                    disabled={cancellingId === event.id}
                    className="btn btn-error btn-sm btn-outline"
                  >
                    {cancellingId === event.id ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Traitement...
                      </>
                    ) : (
                      'Se désinscrire'
                    )} 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-sm text-base-content/60">
        <p>ℹ️ Pour toute question concernant vos inscriptions, contactez les organisateurs.</p>
      </div>
    </div>
  );
};

export default MesInscriptions;