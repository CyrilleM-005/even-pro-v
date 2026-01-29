import {
  Search,
  Users,
  Home,
  NotepadText,
  CalendarPlus,
  Calendar,
} from "lucide-react";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import Logo from "../Logo";
import BurgerMenu from "../Buttons/BurgerMenu";
import RetractSidebarContext from "../../contexts/RetractSidebarContext";
import ProfileItem from "../profileItem";
import RetractSidebarButton from "../Buttons/RetractSidebarButton";

const Header = () => {
  const searchContext = useContext(SearchContext);
  const retractContext = useContext(RetractSidebarContext);
  const { retract, retractBar } = retractContext;
  const { searchValue, handleSearch } = searchContext;
  const location = useLocation();
  // recuper l' email de l"utilisatur actuel
  const user = localStorage.getItem("user");

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="sticky top-0 z-40  max-md:pt-1.5 px-2 backdrop-blur-lg shadow"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between gap-4">
          {/* Bouton rétracter */}
          <RetractSidebarButton retract={retract} action={retractBar} />

          {/* Logo */}
          <div className="lg:hidden">
            <Logo retract={false} />
          </div>

          <div className="flex items-center w-xl">
            {/* Recherche Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div
                className={`relative w-full transition-all duration-300 ${
                  isSearchFocused ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search
                    size={18}
                    className={`transition-colors ${
                      isSearchFocused ? "text-primary" : "text-base-content/50"
                    }`}
                  />
                </div>

                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Rechercher un événement, une catégorie..."
                  className="w-full pl-10 pr-4 py-1 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-row-reverse justify-between items-center gap-2">
            {/* Recherche Mobile (icône seulement) */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileSearch(true)}
                className="p-2 rounded-lg hover:bg-base-300 transition-colors"
                aria-label="Rechercher"
              >
                <Search size={22} className="text-base-content/70" />
              </button>
            </div>

            {/* Actions Droite */}
            <div className="flex items-center gap-3">
              {/* Badge Groupe */}
              <Link
                to="/apropos"
                className={`
                  hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all bg-primary/25 text-primary
                  ${
                    isActiveRoute("/apropos")
                      ? "text-primary bg-primary/10"
                      : "text-base-content/70 bg-base-300/30 hover:bg-base-300/50"
                  }
                `}
              >
                <Users size={16} />
                <span className="font-semibold">Groupe 9</span>
              </Link>

              {/* Avatar utilisateur */}
              <ProfileItem user={user} />
            </div>
          </div>
          <BurgerMenu />
        </div>

        {/* Overlay de recherche mobile */}
        {showMobileSearch && (
          <div className="lg:hidden absolute top-0 left-0 right-0 bg-base-100 border-b border-base-300 p-4 z-50 animate-slideDown">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search size={20} className="text-primary" />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Rechercher un événement..."
                  className="w-full pl-10 pr-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-all text-base"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="px-4 py-3 text-base-content/70 hover:text-base-content transition-colors"
                aria-label="Fermer la recherche"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Navigation Mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center lg:hidden flex items-center justify-around py-2 border-t border-base-300/50"
        >
          {[
            {
              path: "/",
              label: "Accueil",
              icon: <Home size={18} />,
            },
            {
              path: "/evenement",
              label: "Evenements",
              icon: <Calendar size={18} />,
            },
            {
              path: "/evenement/create",
              label: "Créer",
              icon: <CalendarPlus size={18} />,
            },
            {
              path: "/mes-inscriptions",
              label: "inscriptions",
              icon: <NotepadText size={18} />,
            },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-lg transition-all
                ${
                  isActiveRoute(item.path)
                    ? "text-primary"
                    : "text-base-content/70"
                }
              `}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
