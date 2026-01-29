const Spiner = ({loadContent}: {loadContent?: string}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <div className="loading loading-spinner loading-lg text-primary"></div>
      <p className="mt-4 text-base-content/70 animate-pulse">
        {loadContent}
      </p>
    </div>
  );
};

export default Spiner;
