import { Zap, Sparkles, Move, GitBranch } from "lucide-react";
import ReactSvg from "../../../public/React.svg";
import ViteSvg from "../../../public/Vite.js.svg";
import TypeScriptSvg from "../../../public/TypeScript.svg";
import TailwindSvg from "../../../public/Tailwind CSS.svg";
import DaisySvg from "../../../public/daisy-svgrepo-com.svg";
import ReactRouterSvg from "../../../public/react-router-svgrepo-com.svg";

const ListOfTechnos = () => {
  const technos = [
    {
      name: "React 18",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      icon: <img src={ReactSvg} alt="React" className="w-5 h-5" />,
    },
    {
      name: "TypeScript",
      color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
      icon: <img src={TypeScriptSvg} alt="TypeScript" className="w-5 h-5" />,
    },
    {
      name: "Tailwind CSS",
      color: "bg-teal-500/10 text-teal-600 border-teal-500/20",
      icon: <img src={TailwindSvg} alt="Tailwind" className="w-5 h-5" />,
    },
    {
      name: "DaisyUI",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      icon: <img src={DaisySvg} alt="daisy ui" className="w-5 h-5" />,
    },
    {
      name: "Framer Motion",
      color: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      icon: <Move size={18} />,
    },
    {
      name: "React Router",
      color: "bg-red-500/10 text-red-600 border-red-500/20",
      icon: <img src={ReactRouterSvg} alt="React" className="w-5 h-5" />,
    },
    {
      name: "Lucide Icons",
      color: "bg-green-500/10 text-green-600 border-green-500/20",
      icon: <Sparkles size={18} />,
    },
    {
      name: "Vite",
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      icon: <img src={ViteSvg} alt="Vite" className="w-5 h-5" />,
    },
  ];

  return (
    <section className="mb-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Zap className="text-primary" />
          Technologies Utilisées
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technos.map((tech, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 border-2 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform ${tech.color}`}
            >
              {tech.icon}
              <span className="font-semibold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListOfTechnos;
