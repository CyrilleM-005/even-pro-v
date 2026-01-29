import { useParams } from "react-router-dom"

const DetailsEventCard = () => {

    const { id: _id } = useParams()

  return (
    <div className="text-4xl flex justify-center items-center">
        {/* <span>bienvenue sur la page dediée a l'evenement n°{id}</span>   */}
        
    </div>
  )
}

export default DetailsEventCard