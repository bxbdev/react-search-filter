import './SearchList.scss'
import React from 'react'

export const SearchList = ({list, searchTerm, setResult, className}) => {

    const handleClick = (user) => {
        setResult(user)
    }

    /* 
        Best solution to solve html element to avoid use dangerouslySetInnerHTML,
        return the result as expected via searchTerm
    */ 
    const highlightText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
        return parts.map((part, i) => (
            <React.Fragment key={i}>
                {part.toLowerCase() === highlight.toLowerCase() ? 
                    (<b className="highlight">{part}</b>)
                    : part
                }
            </React.Fragment>
        ))
    }

    /* 
        This one has to use dangerouslySetInnerHTML to implement
       and there is a bug for unable to select match texts
    */
    // const handleHightlight = (name) => {
    //     const regex = new RegExp(`${searchTerm}`, "gi")
    //     const result = name.split('').map( str => {
    //         return str.replace(regex, (match) => `<mark>${match}</mark>`)
    //     })
    //     return result.join('')
    // }

    return (
    <div className={className}>
        { list.map( 
            (user, id) => 
            <div 
                className={searchTerm === user.name ? "item active" : "item"} 
                key={id} 
                onClick={(e) => handleClick(user)}
            >
                {searchTerm !== ''
                    ? highlightText(user.name, searchTerm)
                    : user.name 
                }
            </div>
        )}
    </div>)
}