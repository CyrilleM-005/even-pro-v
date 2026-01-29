import { ArrowDownWideNarrow } from 'lucide-react';

const FilterSecction = () => {

    return (
        <div className="xl:w-full top-1 flex flex-col justify-between bg-base-100 rounded-md gap-12">
            <div className="flex flex-row-reverse items-center justify-between w-full">
                <div className="flex flex-row-reverse items-center gap-1">
                    <button className="btn bg-base-content text-base-100">Reset</button>
                    <button className="flex items-center justify-between gap-6 btn">
                        <span> <ArrowDownWideNarrow size={20}/> </span>
                    </button>
                    {/* <div className="btn">
                        <input type="checkbox" id="lastDays" className="size-4"/>
                        <label htmlFor="lastDays">Afficher les evenements passés</label>
                    </div> */}
                </div>
                <div className="flex gap-0.5 carousel-horizontal carousel-center overflow-auto">
                    <span className="btn text-base-content bg-base-300 hover:bg-base-100 carousel-item">Ajourd'hui</span>
                    <span className="btn text-base-content bg-base-300 hover:bg-base-100 carousel-item">Demain</span>
                    <span className="btn text-base-content bg-base-300 hover:bg-base-100 carousel-item">A venir</span>
                    <span className="btn text-base-content bg-base-300 hover:bg-base-100 carousel-item">Passé</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSecction