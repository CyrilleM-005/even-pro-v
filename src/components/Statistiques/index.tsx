const Statistiques = () => {
  return (
    <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-base-300">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Statistiques du projet
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">6</div>
          <div className="text-base-content/70">Membres</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">12</div>
          <div className="text-base-content/70">Semaines de travail</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">6+</div>
          <div className="text-base-content/70">Fonctionnalités</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">100%</div>
          <div className="text-base-content/70">Développé en React</div>
        </div>
      </div>
    </div> 
  );
};

export default Statistiques;
