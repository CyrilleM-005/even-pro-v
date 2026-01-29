import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  ArrowLeft,
  AlertCircle,
  Loader2,
  LogIn,
} from "lucide-react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { getBadgeConfig } from "../../utils/DateHelper";
import PageError from "../../components/PageError";
import Spiner from "../../components/Loaders/Spiner";
import type { AppEvent } from "../../types/AppEvent";

const API_URL = "https://api.react.nos-apps.com/api/groupe-9/evenements";

type registrationResultType = {
  success: boolean | null;
  message: string;
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { registerToEvent, checkRegistration, isRegistering } = useRegistration();

  const [event, setEvent] = useState<AppEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationResult, setRegistrationResult] =
    useState<registrationResultType>({ success: null, message: "" });
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Événement non trouvé");

        const data = await response.json();
        setEvent(data.data ?? data);
      } catch (err) {
        setError("Impossible de charger l'événement");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleRegistration = async () => {
    if (!event || !id) return;

    setRegistrationResult({ success: null, message: "" });
    setShowLoginPrompt(false);

    const result = await registerToEvent(parseInt(id));

    if (result.success) {
      setRegistrationResult({
        success: true,
        message: result.message,
      });

      // Mettre à jour localement le compteur
      setEvent((prev: AppEvent | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          inscriptions_count: prev.inscriptions_count + 1,
        };
      });
    } else {
      if (result.message.includes("connecté")) {
        setShowLoginPrompt(true);
      }

      setRegistrationResult({
        success: false,
        message: result.message,
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/auth", {
      state: { from: `/evenement/${id}` },
    });
  };

  // ------ CHARGEMENT ------
  if (loading) {
    return <Spiner loadContent="Chargement de l'événement..." />;
  }

  // ------- ERREUR -------
  if (error || !event) {
    return (
      <PageError
        error={error}
        errorTitle={"Aucun évenement trouvé"}
        errorDescription={"Cet évenement n'existe pas ou a été suprimmé"}
        buttonContent="Consulter les évenements"
        redirectTo={"/"}
      />
    );
  }

  // ---------- CALCULS ----------
  const placesRestantes = event.capacite_max - event.inscriptions_count;
  const isComplet = placesRestantes <= 0;
  const isAlreadyRegistered = checkRegistration(event.id);
  const canRegister = !isComplet && !isAlreadyRegistered && !isRegistering;
  const dateFormatee = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const badgeConfig = getBadgeConfig("upcoming");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} />
        Retour
      </button>

      {/* En-tête événement */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`badge ${badgeConfig.className}`}>
            {badgeConfig.label}
          </span>
          <span className="badge badge-outline">{event.categorie}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.titre}</h1>

        <div className="flex flex-wrap items-center gap-4 text-base-content/70 mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{dateFormatee}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{event.lieu}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{event.capacite_max} places max</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-bold mb-3">Description</h2>
        <p className="text-base-content/80 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* SECTION INSCRIPTION */}
      <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">
              Participer à cet événement
            </h3>

            {/* Statut inscription */}
            {isAlreadyRegistered && (
              <div className="mb-4">
                <div className="badge badge-success badge-lg gap-2 mb-2">
                  <CheckCircle size={16} />
                  Vous êtes inscrit
                </div>
                <p className="text-sm text-base-content/60">
                  Votre participation a été confirmée. Vous recevrez un rappel
                  avant l'événement.
                </p>
              </div>
            )}

            {/* Messages résultat */}
            {registrationResult.message && (
              <div
                className={`alert ${
                  registrationResult.success ? "alert-success" : "alert-error"
                } mb-4`}
              >
                {registrationResult.success ? "✅" : "❌"}{" "}
                {registrationResult.message}
              </div>
            )}

            {/* Prompt connexion */}
            {showLoginPrompt && (
              <div className="alert alert-warning mb-4">
                <div className="flex items-start gap-3">
                  <LogIn size={20} className="mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold">Connexion requise</h4>
                    <p className="text-sm mt-1 mb-3">
                      Vous devez vous connecter pour vous inscrire à cet
                      événement.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleLoginRedirect}
                        className="btn btn-sm btn-primary"
                      >
                        Se connecter
                      </button>
                      <button
                        onClick={() => setShowLoginPrompt(false)}
                        className="btn btn-sm btn-ghost"
                      >
                        Plus tard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Infos capacité */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`badge badge-lg ${
                    isComplet ? "badge-error" : "badge-success"
                  }`}
                >
                  {isComplet ? (
                    <>
                      <XCircle size={16} className="mr-1" />
                      Complet
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} className="mr-1" />
                      {placesRestantes} places restantes
                    </>
                  )}
                </div>
                <span className="text-base-content/70">
                  {event.inscriptions_count} inscrit(s)
                </span>
              </div>

              {/* Barre progression */}
              <div className="w-full bg-base-300 rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (event.inscriptions_count / event.capacite_max) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            {isAlreadyRegistered ? (
              <button className="btn btn-success btn-lg gap-3 px-8" disabled>
                <CheckCircle size={20} />
                Déjà inscrit
              </button>
            ) : isComplet ? (
              <button className="btn btn-error btn-lg gap-3 px-8" disabled>
                <XCircle size={20} />
                Événement complet
              </button>
            ) : (
              <button
                onClick={handleRegistration}
                disabled={!canRegister}
                className={`btn btn-lg gap-3 px-8 font-semibold ${
                  isRegistering ? "btn-disabled" : "btn-primary hover:scale-105"
                }`}
              >
                {isRegistering ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    S'inscrire
                  </>
                )}
              </button>
            )}

            {/* Alertes places */}
            {!isComplet && placesRestantes < 10 && (
              <div className="flex items-center gap-2 text-warning text-sm">
                <AlertCircle size={14} />
                <span>Plus que {placesRestantes} places !</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Infos pratiques */}
      <div className="mt-6 text-sm text-base-content/60">
        <p>✅ Annulation possible jusqu'à 24h avant l'événement</p>
        {/* <p>📧 Un email de confirmation sera envoyé après inscription</p> */}
      </div>
    </div>
  );
};

export default EventDetail;
