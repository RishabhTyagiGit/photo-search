import React from 'react'
import "./NoDataPlaceholder.css"
const NoDataPlaceholder = ({text}) => {
    return (
        <div className="noDataContainer"><h4>{text}</h4></div>
        
    )
}

export default NoDataPlaceholder
