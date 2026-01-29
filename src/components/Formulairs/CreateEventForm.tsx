import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, MapPin, Tag, Users, ChevronRight, ChevronLeft 
} from "lucide-react";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    heure: "19:00",
    lieu: "",
    categorie: "concert",
    capacite_max: "50"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Informations", desc: "Nom + catégorie" },
    { id: 2, title: "Détails", desc: "Description + date + lieu" },
    { id: 3, title: "Confirmation", desc: "Vérifiez avant création" }
  ];

  const categories = [
    { id: "concert", label: "Concert" },
    { id: "conference", label: "Conférence" },
    { id: "atelier", label: "Atelier" },
    { id: "sport", label: " Sport" },
    { id: "festival", label: " Festival" },
    { id: "exposition", label: "Exposition" },
    { id: "gastronomie", label: "Gastronomie" },
    { id: "autre", label: "Autre" }
  ];

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep = () => {
    if (currentStep === 1) return formData.titre.trim().length > 0;
    if (currentStep === 2) return formData.description.trim().length > 0 && formData.date && formData.lieu;
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateStep()) return setError("Veuillez remplir tous les champs obligatoires");

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.react.nos-apps.com/api/groupe-9/admin/evenements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            titre: formData.titre,
            description: formData.description,
            date: `${formData.date} ${formData.heure}:00`,
            lieu: formData.lieu,
            categorie: formData.categorie,
            capacite_max: parseInt(formData.capacite_max)
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur de création");

      setSuccess("🎉 Événement créé !");
      setTimeout(() => navigate("/evenement"), 1200);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6">
      {/* TITRE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Créer un événement</h1>
        <p className="text-base-content/60">3 étapes simples</p>
      </div>

      {/* CARD PRINCIPALE */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">

        {/* INDICATEUR */}
        <div className="flex justify-between mb-8">
          {steps.map((st) => (
            <div key={st.id} className="flex-1 text-center">
              <div className={`h-2 rounded-full mx-2 transition-all ${
                currentStep >= st.id ? "bg-primary" : "bg-base-300"
              }`} />
              <p className="mt-2 text-xs text-base-content/60">{st.title}</p>
            </div>
          ))}
        </div>

        {/* ÉTAPE 1 : NOM + CAT */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="font-medium">Nom *</label>
              <input
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Nom de l’événement"
                className="input input-bordered w-full h-12 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">Catégorie *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                {categories.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, categorie: c.id }))}
                    className={`p-3 rounded-lg border text-sm transition ${
                      formData.categorie === c.id
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-base-content/40"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="font-medium">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-32 mt-2"
                placeholder="Décrivez l’événement..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full h-12 mt-2"
                />
              </div>

              <div>
                <label className="font-medium">Heure</label>
                <input
                  type="time"
                  name="heure"
                  value={formData.heure}
                  onChange={handleChange}
                  className="input input-bordered w-full h-12 mt-2"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Lieu *</label>
              <input
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                placeholder="Adresse, salle..."
                className="input input-bordered w-full h-12 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">Places *</label>
              <input
                type="number"
                name="capacite_max"
                value={formData.capacite_max}
                onChange={handleChange}
                className="input input-bordered w-full h-12 mt-2"
              />
            </div>
          </div>
        )}

        {/* ÉTAPE 3 */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="bg-base-200 p-4 rounded-xl">
              <h3 className="font-bold text-lg">{formData.titre}</h3>
              <p className="text-sm text-base-content/60">{formData.description}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-base-100 rounded-lg">
                  <Calendar size={18} className="text-primary" />
                  <p className="font-medium mt-1">{formData.date} — {formData.heure}</p>
                </div>

                <div className="p-3 bg-base-100 rounded-lg">
                  <MapPin size={18} className="text-secondary" />
                  <p className="font-medium mt-1">{formData.lieu}</p>
                </div>

                <div className="p-3 bg-base-100 rounded-lg">
                  <Tag size={18} className="text-accent" />
                  <p className="font-medium mt-1">
                    {categories.find(c => c.id === formData.categorie)?.label}
                  </p>
                </div>

                <div className="p-3 bg-base-100 rounded-lg">
                  <Users size={18} className="text-success" />
                  <p className="font-medium mt-1">{formData.capacite_max} places</p>
                </div>
              </div>
            </div>

            <button disabled={loading} className="btn btn-primary btn-lg w-full">
              {loading ? "Création..." : "Créer l'événement"}
            </button>
          </form>
        )}

        {/* FOOTER NAVIGATION */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => currentStep > 1 && setCurrentStep(s => s - 1)}
            className="btn btn-ghost"
            disabled={currentStep === 1}
          >
            <ChevronLeft /> Retour
          </button>

          {currentStep < 3 && (
            <button
              onClick={() => validateStep() && setCurrentStep(s => s + 1)}
              className="btn btn-primary"
            >
              Suivant <ChevronRight />
            </button>
          )}
        </div>

        <p className="text-center mt-4 text-sm text-base-content/60">
          Étape {currentStep} sur 3
        </p>
      </div>
    </div>
  );
};

export default CreateEventForm;
