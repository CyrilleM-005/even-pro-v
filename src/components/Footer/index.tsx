import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 py-4 mt-16 border-t border-base-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code className="text-primary" size={20} />
              <span className="font-bold text-lg">EGES API • Groupe 09</span>
            </div>
            <p className="text-base-content/70 text-sm">
              Projet de Fin de Semestre • Génie Informatique
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-base-content/80 font-medium ">
              Gestionnaire d'Événements et Billetterie
            </p>
            <p className="text-base-content/60 text-sm">
              Utilise TalwindCss • DaisyUI • Framer Motion • React 18 •
              TypeScript • React router
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
