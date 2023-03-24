import './SearchList.scss'
import React, { useEffect } from 'react'

export const SearchList = ({list, searchTerm, setResult, className}) => {

    useEffect(() => {
        
    }, [list])

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
        This one solution need to use dangerouslySetInnerHTML to implement string to html
    */
    const handleHightlight = (name, searchTerm) => {
        const regex = new RegExp(`${searchTerm}`, "gi")
        const el = name.replace(
            regex, 
            `<b class="highlight">$&</b>`
        )
        return el
    }

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
                    ? <div dangerouslySetInnerHTML={{ __html:  handleHightlight(user.name, searchTerm) }}></div>
                    : user.name 
                }
            </div>
        )}
    </div>)
}