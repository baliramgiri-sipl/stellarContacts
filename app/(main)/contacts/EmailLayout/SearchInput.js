import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchInput = () => {
    const dispatch = useDispatch()
    const { inboxData, content, isAll, contactSelectedWebsite, contactMenuSelected } = useSelector(state => state?.contactReducer)
    // useEffect()
    function searchHandler() {

    }
    return (
        <div className="border mt-3 mx-2 px-2 py-1 rounded-md border-green-200 flex gap-2 items-center">
            <Search size={16} className="text-green-500" />
            <input
                value={""}
                onChange={searchHandler}
                type="text"
                placeholder="Search"
                className="placeholder:font-normal border-none outline-none flex-1 py-1 text-[13px]"
            />
        </div>
    )
}

export default SearchInput