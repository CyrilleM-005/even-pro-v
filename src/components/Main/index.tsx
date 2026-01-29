import { Outlet } from "react-router-dom";
import { motion } from "motion/react";

const Main = () => {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="flex flex-col justify-between gap-8 overflow-y-auto"
    >
      <Outlet />
    </motion.main>
  );
};

export default Main;
