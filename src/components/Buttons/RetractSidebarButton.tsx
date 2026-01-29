import { PanelRightClose, PanelRightOpen } from "lucide-react"

type RetractSidebarButtonType = {
    retract: boolean
    action: () => void
}

const RetractSidebarButton = ({ retract, action }: RetractSidebarButtonType) => {
  return (
    <button
            onClick={action}
            className={`p-2 rounded-lg hover:bg-base-300 transition-colors max-md:hidden`}
            aria-label="Étendre la sidebar"
          >
            { retract
                ? <PanelRightClose size={20} className="text-base-content/70" />
                : <PanelRightOpen size={20} className="text-base-content/70" />
            }
          </button>
  )
}

export default RetractSidebarButton