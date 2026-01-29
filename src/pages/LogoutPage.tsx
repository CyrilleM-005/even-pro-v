import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Nettoyer le localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    console.log("✅ Déconnexion effectuée");
    
    // Rediriger après un court délai
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <h2 className="text-2xl font-bold mb-2">Déconnexion...</h2>
        <p className="text-base-content/70">Vous êtes en train de vous déconnecter</p>
      </div>
    </div>
  );
};

export default LogoutPage; 