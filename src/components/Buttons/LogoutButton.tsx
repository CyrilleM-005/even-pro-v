import { LogOut } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import LogoutModal from "../Modals/LogoutModal";


type LogoutButtonType = {
  retract: boolean
}

const LogoutButton = ({ retract }: LogoutButtonType) => {

  const [ showModal, setShowModal ] = useState(false)

  return (
    <>
      <button
        onClick={()=> setShowModal(true)}
        className={`flex items-center gap-3 w-full p-3 rounded-xl hover:bg-error/10 text-error transition-all ${
          retract ? "lg:justify-center" : ""
        }`}
      >
        <LogOut size={20} />
        <span
          className={`${retract && "lg:hidden"} flex-1 text-left font-medium`}
        >
          Déconnexion
        </span>
      </button>
      { showModal && createPortal(<LogoutModal closeModal={()=>setShowModal(false)} /> , document.body)}
    </>
  );
};

export default LogoutButton;
