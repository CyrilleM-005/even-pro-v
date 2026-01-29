const MembresGroupe9 = () => {
  const membres = [
    { id: 1, nom: "MALOUONA", prenom: "Cyrille" },
    { id: 2, nom: "BABINGUI", prenom: "Jared" },
    { id: 3, nom: "OTHINAULT", prenom: "Anthony" },
    { id: 4, nom: "NGOMA YOUNGA", prenom: "Raid" },
    { id: 5, nom: "NGOLO OYENDZE", prenom: "Dominique" },
    { id: 6, nom: "MITORI-MAX", prenom: "Adricia" },
    { id: 7, nom: "MOUKILOU NDOMBO", prenom: "Dhalvy" },
    { id: 8, nom: "FOUNDOU", prenom: "Fabien" },
    { id: 9, nom: "BATSIMBA BIKOUTA", prenom: "Efraime" },
    { id: 10, nom: "NDEKE", prenom: "Gédéon" },
  ];

  return (
    <section className="mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Liste des Membres</h2>
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
            Groupe 09
          </span>
        </div>

        <div className="bg-base-100 rounded-2xl overflow-hidden border border-base-300 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-left p-4 font-semibold w-12">#</th>
                  <th className="text-left p-4 font-semibold">Nom</th>
                  <th className="text-left p-4 font-semibold">Prénom</th>
                </tr>
              </thead>

              <tbody>
                {membres.map((membre) => (
                  <tr
                    key={membre.id}
                    className="border-t border-base-300 hover:bg-base-200/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-base-300 rounded-full font-semibold">
                        {membre.id}
                      </div>
                    </td>

                    <td className="p-4 font-medium">{membre.nom}</td>
                    <td className="p-4 font-medium">{membre.prenom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-base-content/70">
          <p>Projet de fin de semestre • Génie Informatique • ECES</p>
        </div>
      </div>
    </section>
  );
};

export default MembresGroupe9;
