import { User } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal";
import { createPortal } from "react-dom";
import { useState } from "react";

const ProfileItem = ({ user }: { user: string | null }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (token) {
      setShowModal(true);
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="flex  items-center gap-2 p-1 rounded-lg hover:bg-base-300 transition-all "
      >
        <motion.div
          initial={{ x: 20, opacity: 0, scale: 1, rotate: 45 }}
          animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.2, delay: 1 }}
          className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-secondary/60"
        >
          {user ? (
            <span className="font-bold text-secondary-content">
              {user[0].toUpperCase()}
              {user[1]}
            </span>
          ) : (
            <User size={20} />
          )}
        </motion.div>
        <motion.span
          initial={{}}
          className="max-md:hidden text-sm font-medium text-base-content/70"
        >
          {token ? user : "Login"}
        </motion.span>
      </motion.button>
      {showModal &&
        createPortal(
          <LogoutModal closeModal={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
};

export default ProfileItem;
