 import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";


interface RegistrationContextType {
  isRegistering: boolean;
  registeredEvents: number[];
  registerToEvent: (eventId: number) => Promise<{ success: boolean; message: string }>;
  checkRegistration: (eventId: number) => boolean;
  cancelRegistration: (eventId: number) => Promise<boolean>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>(() => {
    // Charger depuis localStorage au démarrage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('registeredEvents');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Synchroniser avec l'API pour vérifier les inscriptions réelles
  useEffect(() => {
    const syncRegistrations = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(
          'https://api.react.nos-apps.com/api/groupe-9/mes-inscriptions',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const eventIds = data.map((event: any) => event.id);
          setRegisteredEvents(eventIds);
          localStorage.setItem('registeredEvents', JSON.stringify(eventIds));
        }
      } catch (error) {
        console.error('Erreur synchronisation inscriptions:', error);
      }
    };

    syncRegistrations();
  }, []);

  const registerToEvent = async (eventId: number): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { 
        success: false, 
        message: 'Vous devez être connecté pour vous inscrire à un événement' 
      };
    }

    setIsRegistering(true);

    try {
      const response = await fetch(
        `https://api.react.nos-apps.com/api/groupe-9/evenements/${eventId}/inscription`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      // Mettre à jour l'état local
      const updatedEvents = [...registeredEvents, eventId];
      setRegisteredEvents(updatedEvents);
      localStorage.setItem('registeredEvents', JSON.stringify(updatedEvents));

      return { 
        success: true, 
        message: data.message || 'Inscription réussie !' 
      };

    } catch (error) {
      console.error('Erreur inscription:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Erreur réseau" 
      };
    } finally {
      setIsRegistering(false);
    }
  };

  const cancelRegistration = async (eventId: number): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await fetch(
        `https://api.react.nos-apps.com/api/groupe-9/evenements/${eventId}/desinscrire`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedEvents = registeredEvents.filter(id => id !== eventId);
        setRegisteredEvents(updatedEvents);
        localStorage.setItem('registeredEvents', JSON.stringify(updatedEvents));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur désinscription:', error);
      return false;
    }
  };

  const checkRegistration = (eventId: number): boolean => {
    return registeredEvents.includes(eventId);
  };

  return (
    <RegistrationContext.Provider 
      value={{ 
        isRegistering, 
        registeredEvents, 
        registerToEvent, 
        checkRegistration,
        cancelRegistration
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within RegistrationProvider');
  }
  return context;
};