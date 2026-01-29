import { useState } from "react";

type filterItemType = {filterItem : string}

const FilterItem = ({filterItem}: filterItemType) => {

    const [filterValue, setFilterValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value)
    }

    return (
        <div className="flex flex-col flex-wrap gap-0.5 md:w-full">
            <label htmlFor="categorie" className="ml-2 text-base-content font-semibold ">{filterItem}</label>
            <input
                className="bg-base-100 px-3 py-2 rounded-md "
                type="text"
                id="categorie"
                value={filterValue}
                placeholder={`Trier par ${filterItem}`}
                onChange={handleChange}
            />
        </div>
    );
};

export default FilterItem;
