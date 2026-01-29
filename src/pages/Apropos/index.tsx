import {
  Users,
  Target,
  Mail,
  Globe,
  GitBranch,
  Server,
  BarChart,
  QrCode,
  Ticket,
  Sparkles,
  Zap,
  Move,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import MembresGroupe9 from "../../components/Tableaux/MembresGroupe9";
import Home from "../Home";
import ListOfTechnos from "../../components/Tableaux/ListOfTechnos";




const AboutPage = () => {
  // const projectStats = [
  //   { label: "Membres du groupe", value: teamMembers.length, icon: Users },
  //   { label: "Projet ECES", value: "Groupe 09", icon: GitBranch },
  //   { label: "Endpoints API", value: "15+", icon: Server },
  //   {
  //     label: "État du système",
  //     value: "Opérationnel",
  //     icon: Shield,
  //     status: "success",
  //   },
  // ];

  const mainFeatures = [
    {
      icon: Ticket,
      title: "Gestion des Billets",
      description:
        "Système complet de billetterie en ligne avec génération automatique",
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description: "Génération et validation de QR codes pour le check-in",
    },
    {
      icon: Server,
      title: "REST API",
      description: "API robuste et documentée pour l'intégration",
    },
    {
      icon: BarChart,
      title: "Event Analytics",
      description: "Statistiques détaillées de participation et fréquentation",
    },
  ];


  const endpoints = [
    {
      method: "GET",
      path: "/api/groupe-9/events",
      description: "Liste tous les événements",
    },
    {
      method: "POST",
      path: "/api/groupe-9/events",
      description: "Crée un nouvel événement",
    },
    {
      method: "POST",
      path: "/api/groupe-9/registrations",
      description: "Inscription à un événement",
    },
    {
      method: "GET",
      path: "/api/groupe-9/tickets/{userId}",
      description: "Récupère les billets d'un utilisateur",
    },
    {
      method: "GET",
      path: "/api/groupe-9/events/{id}/stats",
      description: "Statistiques d'un événement",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Header avec branding ECES */}
      <Home />

      <main className="container mx-auto px-4 py-12">
        {/* Description du projet */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Target className="text-primary" />
                  Notre Projet
                </h2>
                <div className="bg-base-100 rounded-2xl p-8 border border-base-300">
                  <p className="text-lg mb-4">
                    Développé dans le cadre du programme{" "}
                    <strong>Génie Informatique</strong> de <strong>ECES</strong>
                    , ce projet représente notre travail de fin de semestre.
                  </p>
                  <p className="text-lg mb-4">
                    <strong>Gestionnaire d'Événements et Billetterie</strong>{" "}
                    est un système complet permettant la création d'événements,
                    gestion des inscriptions, billetterie en ligne, check-in via
                    QR code, et analyse statistique de participation.
                  </p>
                  <p className="text-lg">
                    Idéal pour{" "}
                    <strong>
                      conférences, concerts, et événements communautaires
                    </strong>
                    , notre solution couvre l'ensemble du cycle de vie d'un
                    événement.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Fonctionnalités Principales
                </h2>
                <div className="grid gap-4">
                  {mainFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-base-100 rounded-xl p-6 border border-base-300 hover:border-primary/30 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform">
                          <feature.icon className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-base-content/70">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistiques et GitHub */}
        <section className="mb-16">
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {projectStats.map((stat, index) => (
              <div
                key={index}
                className="bg-base-100 rounded-xl p-6 border border-base-300 hover:shadow-md transition-shadow"
              >
                <stat.icon
                  className={`w-8 h-8 mb-3 ${
                    stat.status === "success" ? "text-success" : "text-primary"
                  }`}
                />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-base-content/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div> */}

          {/* GitHub Repository */}
          {/* <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="text-primary" size={24} />
                  <h3 className="text-2xl font-bold">Repository GitHub</h3>
                </div>
                <p className="text-base-content/80 mb-2">
                  Code source et documentation complète
                </p>
                <a
                  href="https://github.com/Igoten1242/eces-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors hover:gap-3"
                >
                  <Globe size={16} />
                  github.com/Igoten1242/eces-api
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-base-100 rounded-lg border border-base-300">
                  <span className="text-sm font-mono">/dev</span>
                  <span className="text-xs text-base-content/70">
                    Branche principale
                  </span>
                </span>
                <span className="text-sm text-base-content/70 text-center">
                  API Rest V1.0 • Projet Fin de Semestre
                </span>
              </div>
            </div>
          </div> */}
        </section>

        {/* Stack technique mise à jour */}
        <ListOfTechnos/>

        {/* Endpoints API */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Endpoints API Principaux
            </h2>
            <div className="bg-base-100 rounded-2xl overflow-hidden border border-base-300">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-base-200">
                    <tr>
                      <th className="text-left p-4 font-semibold w-24">
                        Méthode
                      </th>
                      <th className="text-left p-4 font-semibold">Endpoint</th>
                      <th className="text-left p-4 font-semibold">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((endpoint, index) => (
                      <tr
                        key={index}
                        className="border-t border-base-300 hover:bg-base-200/50 transition-colors"
                      >
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center justify-center w-16 px-3 py-1 rounded-full text-sm font-medium ${
                              endpoint.method === "GET"
                                ? "bg-blue-500/10 text-blue-600"
                                : endpoint.method === "POST"
                                  ? "bg-green-500/10 text-green-600"
                                  : "bg-yellow-500/10 text-yellow-600"
                            }`}
                          >
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-sm">
                          {endpoint.path}
                        </td>
                        <td className="p-4 text-base-content/80">
                          {endpoint.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Tableau des participants */}
        <MembresGroupe9 />

        {/* Contact et navigation */}
        <section className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Accès Rapide</h2>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block p-3 bg-base-100 rounded-lg border border-base-300 hover:border-primary/30 transition-colors hover:translate-x-1"
                >
                  <div className="flex items-center justify-between">
                    <span>🏠 Vue d'ensemble</span>
                    <span className="text-primary">→</span>
                  </div>
                </Link>
                <Link
                  to="/evenement"
                  className="block p-3 bg-base-100 rounded-lg border border-base-300 hover:border-primary/30 transition-colors hover:translate-x-1"
                >
                  <div className="flex items-center justify-between">
                    <span>🎫 Gestionnaire d'Événements</span>
                    <span className="text-primary">→</span>
                  </div>
                </Link>
                <a
                  href="https://github.com/Igoten1242/eces-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-base-100 rounded-lg border border-base-300 hover:border-primary/30 transition-colors hover:translate-x-1"
                >
                  <div className="flex items-center justify-between">
                    <span>📚 Documentation API</span>
                    <span className="text-primary">→</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-base-100 rounded-2xl p-8 border border-base-300">
              <h2 className="text-2xl font-bold mb-4">Contact & Support</h2>
              <p className="text-base-content/80 mb-6">
                Pour toute question concernant le projet de fin de semestre :
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                  <Mail className="text-base-content/70" size={20} />
                  <div>
                    <div className="font-medium">Support Projet</div>
                    <a
                      href="mailto:groupe9@eces-api.com"
                      className="text-primary hover:text-primary/80"
                    >
                      groupe9@eces-api.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                  <Globe className="text-base-content/70" size={20} />
                  <div>
                    <div className="font-medium">Repository GitHub</div>
                    <a
                      href="https://github.com/cyrillem-005/even-pro-v"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      https://github.com/cyrillem-005/even-pro-v
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                  <Users className="text-base-content/70" size={20} />
                  <div>
                    <div className="font-medium">Encadrement</div>
                    <span className="text-base-content">
                      GOTENI AMBOULOU LEVI CHRIST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
