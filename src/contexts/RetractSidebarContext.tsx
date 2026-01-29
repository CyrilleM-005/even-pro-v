import { createContext } from "react";

// export type RetractSidebarContextType = {
//     retract: boolean,
// }

const RetractSidebarContext = createContext({
    retract: false ,
    retractBar: ()=> {},
})

export default RetractSidebarContext