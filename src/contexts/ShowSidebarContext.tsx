import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

const ShowSidebarContext = createContext<{
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}>({
    visible: true, 
    setVisible: () => {}

})

export default ShowSidebarContext;