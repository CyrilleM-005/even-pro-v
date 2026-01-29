import {
  Home,
  NotepadText,
  Book,
  Moon,
  Sun,
  CalendarPlus,
  LucideCalendar,
} from "lucide-react";
import { motion } from "motion/react";
import NavLinkItem from "../NavLinkItem";
import { useContext, useState, useEffect } from "react";
import RetractSidebarContext from "../../contexts/RetractSidebarContext";
import { useLocation } from "react-router-dom";
import ShowSidebarContext from "../../contexts/ShowSidebarContext";
import BurgerMenu from "../Buttons/BurgerMenu";
import toggleTheme from "../../utils/toggleTheme";
import Logo from "../Logo";
import LogoutButton from "../Buttons/LogoutButton";

const SideBar = () => {
  const location = useLocation();
  const retractContext = useContext(RetractSidebarContext);
  const showSidebarContext = useContext(ShowSidebarContext);
  const { retract } = retractContext;
  const { visible } = showSidebarContext;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const [links] = useState([
    {
      id: "l1",
      content: "Accueil",
      to: "/",
      icon: <Home size={22} />,
    },
    {
      id: "l6",
      content: "Événements",
      to: "/evenement",
      icon: <LucideCalendar size={22} />,
    },
    {
      id: "l2",
      content: "Créer",
      to: "/evenement/create",
      icon: <CalendarPlus size={22} />,
    },
    {
      id: "l3",
      content: "Mes inscriptions",
      to: "/mes-inscriptions",
      icon: <NotepadText size={22} />,
    },
    // {
    //   id: "l4",
    //   content: "Espace utilisateur",
    //   to: "/espace-utilisateur",
    //   icon: <User2 size={22} />,
    // },
    // {
    //   id: "l5",
    //   content: "Favoris",
    //   to: "/favoris",
    //   icon: <Heart size={22} />,
    // },
    {
      id: "l7",
      content: "À propos",
      to: "/apropos",
      icon: <Book size={22} />,
    },
  ]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative  h-screen bg-base-200 border-r border-base-300 flex flex-col justify-between
        transition-all duration-300 ease-in-out overflow-hidden
        ${retract ? "lg:w-16 lg:items-center" : "lg:w-64"}
        ${
          !visible
            ? "max-md:hidden"
            : "max-md:w-full max-md:fixed max-md:inset-0 max-md:z-50"
        }
      `}
    >
      {/* En-tête */}
      <div>
        <div
          className={`flex items-center justify-between py-3.5 px-6 ${
            retract ? "lg:justify-center" : ""
          }`}
        >
          <div className={`flex items-center `}>
            <Logo retract={retract} />
          </div>

          {/* Menu burger mobile */}
          <div className="lg:hidden">
            <BurgerMenu />
          </div>
        </div>

        {/* Navigation principale */}
        <nav className=" flex-1 overflow-y-auto lg:border-y-2 border-base-300">
          <ul className="space-y-1 px-4 lg:p-3 py-2">
            {links.map((link) => (
              <li key={link.id}>
                <NavLinkItem
                  icon={link.icon}
                  content={link.content}
                  to={link.to}
                  isActive={activeLink === link.to}
                  retract={retract}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Pied de sidebar */}
      <div className={`absolute bottom-0 w-full ${retract ? "px-0" : "px-2"}`}>
        {/* Mode sombre/clair */}
        <div className={`p-1 w-full ${retract ? "lg:px-2" : ""}`}>
          <button
            onClick={() => {
              toggleTheme();
              setIsDarkMode(!isDarkMode);
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-xl border border-base-300 hover:bg-base-300 transition-all ${
              retract ? "lg:justify-center" : ""
            }`}
            aria-label="Changer le thème"
          >
            <div className="relative">
              {isDarkMode ? (
                <Sun size={20} className="text-warning" />
              ) : (
                <Moon size={20} className="text-base-content/70" />
              )}
            </div>
            <span
              className={`${
                retract && "lg:hidden"
              } flex-1 text-left font-medium`}
            >
              {isDarkMode ? "Mode clair" : "Mode sombre"}
            </span>
          </button>
        </div>

        {/* Déconnexion */}
        <div className={`p-2 pt-0 w-full ${retract ? "lg:px-2" : ""}`}>
          <LogoutButton retract={retract} />
        </div>
      </div>

      {/* Overlay mobile */}
      {!retract && (
        <div className="max-md:absolute max-md:inset-0 max-md:bg-base-200 max-md:z-[-1]"></div>
      )}
    </motion.aside>
  );
};

export default SideBar;
