import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  // ------------------------- ÉTATS (STATES) --------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Hook pour la navigation entre pages
  const navigate = useNavigate();

  // ------------------------- GESTION DE LA SOUMISSION --------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      return setError("Veuillez remplir tous les champs");
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://api.react.nos-apps.com/api/groupe-9/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      // Vérification si la requête a réussi
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      // Stockage du token dans le localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", email )
        console.log("Connexion réussie, utilisateur et token stockés");

        // Redirection vers la page d'accueil
        navigate("/evenement");
      }
    } catch (err) {
      // Gestion des erreurs
      console.error("Erreur de connexion:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Identifiants incorrects. Veuillez réessayer."
      );
    } finally {
      // Arrête le chargement dans tous les cas
      setLoading(false);
    }
  };

  // ------------------------- RENDU DU COMPOSANT --------------------------
  return (
    <div className="w-full xl:w-1/3 flex flex-col gap-4 justify-center p-4 bg-base-200 border-base-content/10 border rounded-xl shadow-md">
      {/* Titre de la page */}
      <h1 className="text-base-content text-center text-3xl font-bold">
        Se connecter
      </h1>

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="w-full px-4 py-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          {/* Champ Email */}
          <div className="flex items-center gap-2 px-2 py-1 bg-base-200 rounded-xl w-full">
            <label className="text-base-content floating-label w-full">
              <span className="flex items-center gap-1">
                <Mail size={18} /> E-mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse email"
                className="outline-0 px-2 pt-1 w-full input bg-base-200"
                disabled={loading}
              />
            </label>
          </div>

          {/* Champ Mot de passe */}
          <div className="flex items-center gap-2 px-2 py-1 bg-base-200 rounded-xl w-full">
            <label className="flex text-base-content floating-label w-full relative">
              <span className="flex gap-1 items-center">
                <KeyRound size={18} /> Mot de passe
              </span>
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="outline-0 px-2 pt-1 w-full input bg-base-200"
                  disabled={loading}
                />
                {/* Bouton pour afficher/masquer le mot de passe */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-base-content/70 hover:text-base-content"
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="text-error mt-4 text-center w-full">{error}</div>
          )}

          {/* Bouton de soumission */}
          <input
            type="submit"
            value={loading ? "Connexion..." : "Se connecter"}
            className="btn btn-primary w-2/3 mt-4"
            disabled={loading}
          />
        </div>

        {/* Lien vers la page d'inscription */}
        <div className="flex gap-1.5 items-center justify-center max-md:text-sm opacity-85 w-full mt-8">
          <span>Je n'ai pas de compte</span>
          <Link to="/auth/signup" className="text-primary hover:underline">
            Créer un compte
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
