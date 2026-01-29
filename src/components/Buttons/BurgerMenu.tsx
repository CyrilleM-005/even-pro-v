import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import ShowSidebarContext from "../../contexts/ShowSidebarContext";
import { useContext } from "react";
import RetractSidebarContext from "../../contexts/RetractSidebarContext";

const BurgerMenu = () => {
  const showSidebarContext = useContext(ShowSidebarContext);
  const retractSidebarContext = useContext(RetractSidebarContext);
  const { visible, setVisible } = showSidebarContext;
  const { retractBar } = retractSidebarContext;

  const handleClick = () => {
    retractBar();
    setVisible((v) => !v);
  };

  return (
    <motion.button
      whileTap={{scale: .9}}
      onClick={handleClick}
      className="text-base-content hover:bg-amber-100 lg:hidden z-30"
    >
      {visible ? <X /> : <Menu />}
    </motion.button>
  );
};

export default BurgerMenu;
