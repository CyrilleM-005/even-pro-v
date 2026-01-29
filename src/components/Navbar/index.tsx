import { CalendarDays, Home, User } from "lucide-react"
import { NavLink, Link } from "react-router-dom"
import { ToggleTheme } from "../Buttons"

const Navbar = () => {
  return (
    <header className="md:w-11/12 flex items-center justify-between bg-base-200 text-base-content fixed top-3 py-2 px-4 z-100 shadow rounded-md">

      <figure className="flex items-start justify-center gap-1">
        <CalendarDays/>
        <figcaption className="font-bold textarea-lg">event</figcaption>
      </figure>

      <nav className="bg-base-content py-1 pl-4 pr-1 shadow-md rounded-md">
        <ul className="flex items-center justify-between gap-4">
          <NavLink 
            to={'/'}
            className={'text-base-100 text-md font-semibold hover:scale-105 transition-all'}
          >
            Acceuil </NavLink>
          <NavLink 
            to={'/'}
            className={'text-base-100 text-md font-semibold hover:scale-105 transition-all'}
          >
            A propos  
          </NavLink>
          <NavLink 
            to={'/'}
            className={'text-base-100 text-md font-semibold hover:scale-105 transition-all'}
          >
            Espace utilisateur
          </NavLink>
          <span className="bg-base-200 border py-1 px-2 rounded-lg">
            <Home/>
          </span>
        </ul>
      </nav>

      <div className="flex items-center gap-6">
        <ToggleTheme/>
        <Link to={'/login'} className=" w-8 h-8 flex items-center justify-center border bg-base-content text-base-200 px-2 py-1 rounded-full">
          <User/>
        </Link>
      </div>

    </header>
  )
}

export default Navbar