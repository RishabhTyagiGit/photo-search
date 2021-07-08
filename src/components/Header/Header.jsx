import React from 'react'
import Search from '../Search'
import Suggestion from '../Suggestion'
import "./Header.css"
const Header = ({searchText, cachedQueries, onPhotoSearch}) => {
    return (
        <header>
            <h2> Search Photos</h2>
            <Search searchText={searchText} onPhotoSearch={onPhotoSearch}/>
            <Suggestion cachedQueries={cachedQueries} />
        </header>
    )
}

export default Header
