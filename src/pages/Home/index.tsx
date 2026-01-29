import { Code, Calendar, Users, Ticket, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    colorClass:
      i % 5 === 0
        ? "bg-primary/40"
        : i % 5 === 1
        ? "bg-secondary/40"
        : i % 5 === 2
        ? "bg-accent/40"
        : i % 5 === 3
        ? "bg-success/40"
        : "bg-info/40",
    animationClass: `animate-float-${(i % 5) + 1}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="relative bg-linear-to-br from-base-100 via-base-100 to-base-200 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbs */}
        <div className="absolute top-1/4 -left-32 w-125 h-125 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 -right-32 w-125 h-125 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow-slow" />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full ${p.colorClass} ${p.animationClass}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          />
        ))}

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-base-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-base-300 animate-slide-in"
              >
                <Code size={16} className="text-primary" />
                <span className="text-sm font-medium">
                  EvenPro • Génie Informatique
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl md:text-6xl font-bold leading-tight mt-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Gestionnaire d'Événements
                <span className="text-linear-primary block animate-shimmer text-5xl md:text-6xl mt-2">
                  Groupe 09
                </span>
              </motion.h1>

              <p className="text-xl text-base-content/80 mt-4">
                Projet de Fin de Semestre • Système complet de gestion
                d'événements
              </p>

              {/* CTA */}
              <motion.div
                className="flex flex-wrap gap-4 mt-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-primary px-8 shadow-lg shadow-primary/20"
                >
                  <Calendar size={20} />
                  Explorer les événements
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-outline btn-primary px-8"
                >
                  Créer un événement
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Users, label: "Participants", value: "1.2K+", color: "text-primary" },
              { icon: Calendar, label: "Événements", value: "48", color: "text-secondary" },
              { icon: Ticket, label: "Tickets", value: "850+", color: "text-accent" },
              { icon: BarChart, label: "Satisfaction", value: "98%", color: "text-success" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-base-100/70 backdrop-blur-md p-5 rounded-xl border border-base-300/40 hover:shadow-xl hover:shadow-primary/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className={stat.color} size={22} />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
