import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface NavLinkItemProps {
  icon: React.ReactNode;
  content: string;
  to: string;
  badge?: string | null;
  isActive?: boolean;
  retract?: boolean;
}

const NavLinkItem = ({ 
  icon, 
  content, 
  to, 
  badge, 
  isActive = false, 
  retract = false 
}: NavLinkItemProps) => {
  return (
      <Link
        to={to}
        className={`
          flex items-center gap-3 p-3 rounded-r-md transition-all duration-200 relative overflow-hidden group
          ${isActive 
            ? 'bg-primary/20 text-primary border-l-3 border-primary' 
            : 'hover:bg-base-300'
          }
          ${retract ? 'lg:justify-center lg:px-2' : ''}
        `}
      >
        {/* Icône */}
        <div className={`relative ${retract ? 'lg:flex lg:justify-center' : ''}`}>
          <span className={isActive ? 'text-primary' : 'text-base-content/70 group-hover:text-primary'}>
            {icon}
          </span>
          
          {/* Badge */}
          {badge && !retract && (
            <span className={`
              absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full
              ${badge === 'Nouveau' || badge === 'Active' 
                ? 'bg-gradient-to-r from-primary to-secondary text-primary-content' 
                : 'bg-warning text-warning-content'
              }
            `}>
              {badge}
            </span>
          )}
        </div>

        {/* Texte (caché quand rétracté) */}
        {!retract && (
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className=" truncate">{content}</span>
            <ChevronRight 
              size={16} 
              className={`
                transition-transform text-base-content/40
                ${isActive ? 'translate-x-1 text-primary' : 'group-hover:translate-x-1'}
              `} 
            />
          </div>
        )}

        {/* Tooltip pour version rétractée */}
        {retract && (
          <div className="lg:absolute lg:left-full lg:top-1/2 lg:-translate-y-1/2 lg:ml-4 lg:px-3 lg:py-2 lg:bg-base-100 lg:rounded-lg lg:shadow-xl lg:whitespace-nowrap lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-all lg:z-50">
            <span className="font-medium">{content}</span>
            {badge && (
              <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                badge === 'Nouveau' || badge === 'Active' 
                  ? 'bg-primary text-primary-content' 
                  : 'bg-warning text-warning-content'
              }`}>
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Effet de fond animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-secondary/0 opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </Link>
  );
};

export default NavLinkItem;