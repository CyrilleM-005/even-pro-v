import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = ({retract}: {retract: boolean}) => {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 transition-all`}
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg backdrop-blur-xl">
        <CalendarDays size={22} className="text-primary-content" />
      </div>
      <div className={`flex flex-col ${retract && 'lg:hidden'}`}>
        <span className="font-bold text-md bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          EvenPro
        </span>
        <span className="text-xs text-base-content/60">Groupe 9</span>
      </div>
    </Link> 
  );
};

export default Logo;
