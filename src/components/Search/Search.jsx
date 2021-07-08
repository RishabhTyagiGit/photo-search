import React from 'react'
import "./Search.css"
const Search = ({searchText, onPhotoSearch}) => {
    return (
        <input
			type="text"
			className="search-input"
			value={searchText}
			onChange={onPhotoSearch}
		/>
    )
}

export default Search
