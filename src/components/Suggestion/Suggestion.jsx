import React from 'react'
import "./Suggestion.css"
const Suggestion = ({cachedQueries}) => {
    return (
        <>
            <h4>Recent Searches</h4>
            <ul className="suggestion-container">
                {cachedQueries.map(query => <li key={query} className="suggestion">
                    {query}
				</li>)}  
			</ul>
        </>
    )
}

export default Suggestion
