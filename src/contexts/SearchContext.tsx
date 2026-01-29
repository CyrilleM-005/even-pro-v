import { createContext } from "react";

interface SearchContextType {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchValue: "",
  handleSearch: () => {},
});

export default SearchContext;
