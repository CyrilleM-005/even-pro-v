import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import RetractSidebarContext from "../contexts/RetractSidebarContext";
import SearchContext from "../contexts/SearchContext";
import ShowSidebarContext from "../contexts/ShowSidebarContext";

const LayoutApp = () => {
  //------- INITIALISARION DES ETATS ------------
  const [retract, setRetract] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(false);

  //---------- FONCTIONS UTILES ------------
  const retractBar = () => {
    setRetract((r) => !r);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  //------ VALEURS DES CONTEXTS -------
  const RetractSidebarValue = {
    retract,
    retractBar,
  };
  const searchContextValue = {
    searchValue,
    handleSearch,
  };
  const showSidebarValue = {
    visible,
    setVisible, // ← AJOUT
  };  

  return (
    <RetractSidebarContext.Provider value={RetractSidebarValue}>
      <ShowSidebarContext.Provider value={showSidebarValue}>
        <div className="w-full h-screen flex flex-row relative">
          <SideBar />
          <SearchContext.Provider value={searchContextValue}>
            <div className={"flex flex-col w-full"}>
              <Header />
              <Main />
            </div>
          </SearchContext.Provider>
        </div>
      </ShowSidebarContext.Provider>
    </RetractSidebarContext.Provider>
  );
};

export default LayoutApp;
