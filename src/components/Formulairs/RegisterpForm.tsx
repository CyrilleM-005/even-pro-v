import { Eye, EyeOff, KeyRound, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!username || !email || !password || !confirm) {
      setError("Remplissez tous les champs.");
      return;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setError("Veuillez entrer une adresse email valide");
    //   return;
    // }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(
        "https://api.react.nos-apps.com/api/groupe-9/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: username, 
            email, 
            password,
            password_confirmation: confirm 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 
          data.error || 
          `Erreur ${response.status}: ${response.statusText}`
        );
      }

      console.log("Compte créé :", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", email)
        navigate("/dashboard");
      } else if (data.user) {
        navigate("/auth/login");
      }

    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Erreur lors de la création du compte. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full xl:w-1/3 flex flex-col gap-4 justify-center p-4 bg-base-200 border-base-content/10 border rounded-xl shadow-md">
      <h1 className="text-base-content text-center text-3xl font-bold">
        Créez un compte
      </h1>

      <form onSubmit={handleSubmit} className="w-full px-4 py-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          
          {/* Champ Nom d'utilisateur */}
          <div className="flex items-center gap-2 px-2 py-1 bg-base-200 rounded-xl w-full">
            <label className="text-base-content floating-label w-full">
              <span className="flex items-center gap-1">
                <User size={18} /> Nom d'utilisateur
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="outline-0 px-2 pt-1 w-full input bg-base-200"
                disabled={loading}
              />
            </label>
          </div>

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
                placeholder="E-mail"
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
                  placeholder="Mot de passe"
                  className="outline-0 px-2 pt-1 w-full input bg-base-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-base-content/70 hover:text-base-content"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          </div>

          {/* Champ Confirmation */}
          <div className="flex items-center gap-2 px-2 py-1 bg-base-200 rounded-xl w-full">
            <label className="flex text-base-content floating-label w-full relative">
              <span className="flex gap-1 items-center">
                <KeyRound size={18} /> Confirmation
              </span>
              <div className="flex items-center w-full">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirmez le mot de passe"
                  className="outline-0 px-2 pt-1 w-full input bg-base-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 text-base-content/70 hover:text-base-content"
                  disabled={loading}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="text-error mt-4 text-center w-full">
              {error}
            </div>
          )}

          {/* Bouton de soumission */}
          <input
            type="submit"
            value={loading ? "Création en cours..." : "Créer un compte"}
            className="btn btn-primary w-2/3 mt-4"
            disabled={loading}
          />
        </div>

        {/* Lien vers login */}
        <div className="flex gap-1.5 items-center justify-center max-md:text-sm opacity-85 w-full mt-8">
          <span>J'ai déjà un compte</span>
          <Link to="/auth/login" className="text-primary">
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;