const LogoutModal = ({ closeModal }: {closeModal: () => void}) => {

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/auth/login";
  };

  return (
    <>
      <div onClick={closeModal} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs"></div>
      <div className="max-md:w-64 fixed z-100 top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-300 justify-center items-center flex flex-col gap-6 border border-base-100 rounded shadow-lg p-4">
        <p className="text-center">Etes vous Sure de vouloir vous deconnecté</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              handleLogout();
              closeModal();
            }}
            className="btn btn-error opacity-80"
          >
            Oui
          </button>
          <button onClick={closeModal} className="btn btn-success opacity-80">
            Non
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
